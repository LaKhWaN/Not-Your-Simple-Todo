package net.lakhwan.not_your_simple_todo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.lakhwan.not_your_simple_todo.dto.Todo.TodoWorkspaceIdDto;
import net.lakhwan.not_your_simple_todo.dto.UserDtos.UserIdDto;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class WorkspaceDto {
    private Long id;
    private String name;
    private String type;
    private List<TodoWorkspaceIdDto> todos;
    private List<UserIdDto> owners;
}
