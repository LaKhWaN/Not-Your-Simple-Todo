package net.lakhwan.not_your_simple_todo.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import net.lakhwan.not_your_simple_todo.dto.Todo.TodoDto;
import net.lakhwan.not_your_simple_todo.dto.Todo.TodoIdDto;
import net.lakhwan.not_your_simple_todo.dto.Todo.TodoWorkspaceIdDto;
import net.lakhwan.not_your_simple_todo.dto.UserDtos.UserDto;
import net.lakhwan.not_your_simple_todo.entity.User;
import net.lakhwan.not_your_simple_todo.repository.UserRepository;
import net.lakhwan.not_your_simple_todo.service.TodoService;
import net.lakhwan.not_your_simple_todo.utils.JwtTokenUtil;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@CrossOrigin("*")
@RestController
@RequestMapping("/api/todo")
public class TodoController {

    private final TodoService todoService;
    private final UserRepository userRepository;
    private final JwtTokenUtil jwtTokenUtil;
    private ModelMapper modelMapper;

    @PostMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<TodoDto> createTodo(@RequestBody TodoDto todoDto,
                                              @PathVariable("id") Long workspaceId,
                                              HttpServletRequest request) {
        String username = jwtTokenUtil.getUsernameFromRequest(request);
        Optional<User> userOptional = userRepository.findByUsername(username);

        if (userOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        User user = userOptional.get();
        TodoDto createdTodo = todoService.createTodo(user.getId(), todoDto);

        return new ResponseEntity<>(createdTodo, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<TodoDto> getTodoById(@PathVariable("id") Long todoId) {
        TodoDto todoDto = todoService.getTodoById(todoId);
        return ResponseEntity.ok(todoDto);
    }

    @GetMapping("/user")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<TodoWorkspaceIdDto>> getListOfTodosOfUserById(HttpServletRequest request){
        UserDto userDto = jwtTokenUtil.getUserDtoFromRequest(request);

        List<TodoDto> allTodosOfUser = todoService.getTodosOfUserById(userDto.getId());

        List <TodoWorkspaceIdDto> todos= allTodosOfUser.stream().map(
                todoDto -> modelMapper.map(todoDto, TodoWorkspaceIdDto.class)
        ).toList();
        return ResponseEntity.ok(todos);
    }

    @GetMapping("/")
    @PreAuthorize("hasRole('USER')") // change it to admin later
    public ResponseEntity<List<TodoIdDto>> getAllTodos(){
        return ResponseEntity.ok(todoService.getAllTodos());
    }

    @PutMapping("/")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<TodoDto> updateTodo(@RequestBody TodoWorkspaceIdDto todoDto){
        TodoDto updatedTodoDto = todoService.updateTodo(todoDto);

        return ResponseEntity.ok(updatedTodoDto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<String> deleteTodo(@PathVariable("id") Long todoId){
        todoService.deleteTodo(todoId);

        return ResponseEntity.ok("Todo successfully deleted with given id: " + todoId);
    }

}
