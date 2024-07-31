package net.lakhwan.not_your_simple_todo.dto.UserDtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.lakhwan.not_your_simple_todo.entity.Role;

import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserRoleDto {
    private Long id;
    private String username;
    private Set<Role> roles;
}
