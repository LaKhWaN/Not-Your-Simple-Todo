package net.lakhwan.not_your_simple_todo.service.impl;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import net.lakhwan.not_your_simple_todo.dto.Todo.TodoDto;
import net.lakhwan.not_your_simple_todo.dto.WorkspaceDto;
import net.lakhwan.not_your_simple_todo.entity.Todo;
import net.lakhwan.not_your_simple_todo.entity.User;
import net.lakhwan.not_your_simple_todo.entity.Workspace;
import net.lakhwan.not_your_simple_todo.exceptions.ResourceNotFoundException;
import net.lakhwan.not_your_simple_todo.repository.TodoRepository;
import net.lakhwan.not_your_simple_todo.repository.UserRepository;
import net.lakhwan.not_your_simple_todo.repository.WorkspaceRepository;
import net.lakhwan.not_your_simple_todo.service.WorkspaceService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class WorkspaceServiceImpl implements WorkspaceService{

    private ModelMapper modelMapper;
    private WorkspaceRepository workspaceRepository;
    private UserRepository userRepository;
    private TodoRepository todoRepository;

    @Override
    @Transactional
    public WorkspaceDto createWorkspace(WorkspaceDto workspaceDto, String username) {
        Workspace workspace = modelMapper.map(workspaceDto, Workspace.class);

        User user = userRepository.findByUsername(username).orElseThrow(() ->
                new ResourceNotFoundException("User not found with username: " + username));

        if (workspace.getOwners() == null) {
            workspace.setOwners(new HashSet<>());
        }

        workspace.getOwners().add(user);

        Workspace savedWorkspace = workspaceRepository.save(workspace);

        if (user.getWorkspaces() == null) {
            user.setWorkspaces(new HashSet<>());
        }
        user.getWorkspaces().add(savedWorkspace);

        return modelMapper.map(savedWorkspace, WorkspaceDto.class);
    }

    @Override
    public List<WorkspaceDto> getAllWorkspaces() {

        List<Workspace> workspaces = workspaceRepository.findAll();

        return workspaces.stream().map(workspace -> modelMapper.map(
                workspace, WorkspaceDto.class
        )).toList();
    }


    @Override
    public Set<WorkspaceDto> getWorkspacesOfUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException("No user exists with given id: " + userId)
        );

        return user.getWorkspaces().stream().map(
                workspace -> modelMapper.map(workspace, WorkspaceDto.class)
        ).collect(Collectors.toSet());
    }

    @Override
    public Set<TodoDto> getTodosOfWorkspace(Long workspaceId) {
        Workspace workspace = workspaceRepository.findById(workspaceId)
                .orElseThrow(
                        () -> new ResourceNotFoundException("No workspace found with given id: " + workspaceId)
                );

        return workspace.getTodos().stream().map(
                todo -> modelMapper.map(todo, TodoDto.class)
        ).collect(Collectors.toSet());
    }

    @Override
    public WorkspaceDto updateAssignUsersToWorkspace(Long workspaceId, Set<Long> userIds) {
        Workspace workspace = workspaceRepository.findById(workspaceId)
                .orElseThrow(
                        () -> new ResourceNotFoundException("No workspace found with given id: " + workspaceId)
                );

        List<User> userList = userRepository.findAllById(userIds);

        workspace.getOwners().clear();

        workspace.getOwners().addAll(userList);

        Workspace savedWorkspace = workspaceRepository.save(workspace);

        for(User user: userList){
            user.getWorkspaces().add(workspace);
        }

        userRepository.saveAll(userList);

        return modelMapper.map(savedWorkspace, WorkspaceDto.class);
    }

    @Override
    public WorkspaceDto updateWorkspaceName(WorkspaceDto updatedWorkspaceDto) {
        Workspace workspace = workspaceRepository.findById(updatedWorkspaceDto.getId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("No workspace found with given id: " + updatedWorkspaceDto.getId())
                );

        if(updatedWorkspaceDto.getName() != null) {
            workspace.setName(updatedWorkspaceDto.getName());
        }

        if(updatedWorkspaceDto.getType() != null){
            workspace.setType(updatedWorkspaceDto.getType());
        }

        Workspace savedWorkspace = workspaceRepository.save(workspace);

        return modelMapper.map(savedWorkspace, WorkspaceDto.class);
    }

    @Override
    public void deleteWorkspace(Long workspaceId) {
        Workspace workspace = workspaceRepository.findById(workspaceId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("No workspace found with given id: " + workspaceId)
                );

        workspaceRepository.delete(workspace);
    }

    @Override
    public WorkspaceDto addTodo(Long workspaceId, Long todoId) {
        Todo todo = todoRepository.findById(todoId).orElseThrow(
                () -> new ResourceNotFoundException("No todo found with given id: " + todoId)
        );

        Workspace workspace = workspaceRepository.findById(workspaceId).orElseThrow(
                () -> new ResourceNotFoundException("No workspace found with given id: " + workspaceId)
        );

        workspace.getTodos().add(todo);

        workspaceRepository.save(workspace);

        todo.setWorkspace(workspace);

        todoRepository.save(todo);

        return modelMapper.map(workspace, WorkspaceDto.class);
    }
}
