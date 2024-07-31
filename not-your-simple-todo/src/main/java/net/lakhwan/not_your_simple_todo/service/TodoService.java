package net.lakhwan.not_your_simple_todo.service;

import net.lakhwan.not_your_simple_todo.dto.Todo.TodoDto;
import net.lakhwan.not_your_simple_todo.dto.Todo.TodoIdDto;
import net.lakhwan.not_your_simple_todo.dto.Todo.TodoWorkspaceIdDto;
import net.lakhwan.not_your_simple_todo.dto.UserDtos.UserDto;

import java.util.List;

public interface TodoService {
    TodoDto createTodo(Long userId, TodoDto todoDto);

    TodoDto getTodoById(Long todoId);

    List<TodoDto> getTodosOfUserById(Long userId);

    List<TodoIdDto> getAllTodos();

    TodoDto updateTodo(TodoWorkspaceIdDto updatedTodoDto);

    void deleteTodo(Long todoId);

}
