package net.lakhwan.not_your_simple_todo.dto.Todo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.lakhwan.not_your_simple_todo.dto.UserDtos.UserIdDto;
import net.lakhwan.not_your_simple_todo.entity.Workspace;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class TodoDto {
    private Long id;
    private String title;
    private String description;
    private Boolean completed;
    private List<UserIdDto> assignedUsers;
    private Workspace workspace;
}
