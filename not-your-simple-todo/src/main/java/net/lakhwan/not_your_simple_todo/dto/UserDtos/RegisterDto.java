package net.lakhwan.not_your_simple_todo.dto.UserDtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.lakhwan.not_your_simple_todo.entity.Role;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RegisterDto {
    private String username;
    private String first_name;
    private String last_name;
    private String password;
    private String email;
    private Boolean gender;
    private List<Role> roles;
}
