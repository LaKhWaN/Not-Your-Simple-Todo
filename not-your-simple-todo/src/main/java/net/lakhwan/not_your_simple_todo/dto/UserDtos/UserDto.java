package net.lakhwan.not_your_simple_todo.dto.UserDtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.lakhwan.not_your_simple_todo.dto.RoleDto;
import net.lakhwan.not_your_simple_todo.dto.Todo.TodoDto;
import net.lakhwan.not_your_simple_todo.dto.WorkspaceDto;

import java.util.List;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserDto {
    private Long id;
    private String first_name;
    private String last_name;
    private String username;
    private String email;
    private Boolean gender;
    private Set<RoleDto> roles;
    private List<TodoDto> todos;
    private Set<WorkspaceDto> workspaces;
}
