package net.lakhwan.not_your_simple_todo.service.impl;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import net.lakhwan.not_your_simple_todo.dto.Todo.TodoDto;
import net.lakhwan.not_your_simple_todo.dto.Todo.TodoIdDto;
import net.lakhwan.not_your_simple_todo.dto.Todo.TodoWorkspaceIdDto;
import net.lakhwan.not_your_simple_todo.dto.UserDtos.UserDto;
import net.lakhwan.not_your_simple_todo.dto.UserDtos.UserIdDto;
import net.lakhwan.not_your_simple_todo.dto.WorkspaceDto;
import net.lakhwan.not_your_simple_todo.entity.Todo;
import net.lakhwan.not_your_simple_todo.entity.User;
import net.lakhwan.not_your_simple_todo.entity.Workspace;
import net.lakhwan.not_your_simple_todo.exceptions.ResourceNotFoundException;
import net.lakhwan.not_your_simple_todo.repository.TodoRepository;
import net.lakhwan.not_your_simple_todo.repository.UserRepository;
import net.lakhwan.not_your_simple_todo.repository.WorkspaceRepository;
import net.lakhwan.not_your_simple_todo.service.TodoService;
import net.lakhwan.not_your_simple_todo.service.WorkspaceService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@AllArgsConstructor
public class TodoServiceImpl implements TodoService {

    private TodoRepository todoRepository;
    private UserRepository userRepository;
    private WorkspaceRepository workspaceRepository;
    private WorkspaceService workspaceService;
    private ModelMapper modelMapper;

    @Override
    public TodoDto createTodo(Long userId, TodoDto todoDto) {

        Todo todo = modelMapper.map(todoDto, Todo.class);
        todo.setCompleted(false);

        User user = userRepository.findById(userId).orElseThrow(() ->
                new ResourceNotFoundException("No user exists with thi user id: " + userId));

        todo.setAssignedUsers(Collections.singletonList(user));

        Todo savedTodo = todoRepository.save(todo);

        return modelMapper.map(savedTodo, TodoDto.class);
    }

    @Override
    public TodoDto getTodoById(Long todoId) {
        Todo todo = todoRepository.findById(todoId).orElseThrow(() -> new ResourceNotFoundException(
                "Todo not found with given id: " + todoId
        ));

        return modelMapper.map(todo, TodoDto.class);
    }

    @Override
    public List<TodoDto> getTodosOfUserById(Long userId) {
        User user = userRepository.findById(userId).get();


        return user.getTodos().stream().map(
                todo -> modelMapper.map(todo, TodoDto.class)
        ).toList();
    }

    @Override
    public List<TodoIdDto> getAllTodos() {

        return todoRepository.findAll().stream().map(todo1 ->
                modelMapper.map(todo1, TodoIdDto.class)).toList();
    }

    @Override
    public TodoDto updateTodo(TodoWorkspaceIdDto updatedTodoDto) {
        Long todoId = updatedTodoDto.getId();

        Todo todo = todoRepository.findById(todoId).orElseThrow(() -> new ResourceNotFoundException(
                "No todo exists with given id: " + todoId
        ));

        // Update only if fields are not null to keep existing values
        if (updatedTodoDto.getTitle() != null) {
            todo.setTitle(updatedTodoDto.getTitle());
        }
        if (updatedTodoDto.getDescription() != null) {
            todo.setDescription(updatedTodoDto.getDescription());
        }
        if (updatedTodoDto.getCompleted() != null) {
            todo.setCompleted(updatedTodoDto.getCompleted());
        }
        if(updatedTodoDto.getWorkspaceId() != null) {
            Workspace workspace = workspaceRepository.findById(updatedTodoDto.getWorkspaceId())
                    .orElseThrow(
                            () -> new ResourceNotFoundException("No workspace found with given id: " + updatedTodoDto.getWorkspaceId())
                    );
            todo.setWorkspace(workspace);
        }
        // Get assigned users if provided
        List<Long> assignedUserIds = new ArrayList<>();
        if (updatedTodoDto.getAssignedUsers() != null && !updatedTodoDto.getAssignedUsers().isEmpty()) {
            assignedUserIds = updatedTodoDto.getAssignedUsers().stream().map(UserIdDto::getId).toList();
        }
        List<User> assignedUsers = userRepository.findAllById(assignedUserIds);

        if (assignedUsers.size() != assignedUserIds.size()) {
            throw new ResourceNotFoundException("One or more users not found with given ids");
        }

        todo.setAssignedUsers(assignedUsers);
        Todo savedTodo = todoRepository.save(todo);

        // Ensure assigned users have access to the workspace
        Long workspaceId = updatedTodoDto.getWorkspaceId();
        if (workspaceId != null) {
            Workspace workspace = workspaceRepository.findById(workspaceId).orElseThrow(() ->
                    new ResourceNotFoundException("No workspace found with given id: " + workspaceId));

            // Add assigned users to workspace if not already present
            for (User user : assignedUsers) {
                if (!workspace.getOwners().contains(user)) {
                    workspace.getOwners().add(user);
                    user.getWorkspaces().add(workspace); // Ensure user's workspaces are also updated
                }
            }

            workspaceRepository.save(workspace);
            userRepository.saveAll(assignedUsers);
        }

        return modelMapper.map(savedTodo, TodoDto.class);
    }



    @Override
    @Transactional
    public void deleteTodo(Long todoId) {
        Todo todo = todoRepository.findById(todoId).orElseThrow(
                () -> new ResourceNotFoundException("No todo exists with given id: " + todoId)
        );

        System.out.println("Deleting todo: " + todo);

        todoRepository.deleteById(todoId);

        // Verify deletion
        if (todoRepository.findById(todoId).isPresent()) {
            System.out.println("Todo still exists after deletion!");
        } else {
            System.out.println("Todo successfully deleted.");
        }
    }

}
