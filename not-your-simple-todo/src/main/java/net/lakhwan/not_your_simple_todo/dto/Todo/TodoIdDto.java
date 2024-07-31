package net.lakhwan.not_your_simple_todo.dto.Todo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TodoIdDto {
    private Long id;
    private String title;
}
