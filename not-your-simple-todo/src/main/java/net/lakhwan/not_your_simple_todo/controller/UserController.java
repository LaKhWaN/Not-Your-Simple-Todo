package net.lakhwan.not_your_simple_todo.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import net.lakhwan.not_your_simple_todo.dto.RoleDto;
import net.lakhwan.not_your_simple_todo.dto.UserDtos.RegisterSimpleDto;
import net.lakhwan.not_your_simple_todo.dto.UserDtos.UserDto;
import net.lakhwan.not_your_simple_todo.dto.UserDtos.UserRoleDto;
import net.lakhwan.not_your_simple_todo.entity.User;
import net.lakhwan.not_your_simple_todo.service.UserService;
import net.lakhwan.not_your_simple_todo.utils.JwtTokenUtil;
import org.apache.coyote.Response;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@AllArgsConstructor
@CrossOrigin("*")
public class UserController {

    private UserService userService;
    private ModelMapper modelMapper;
    private JwtTokenUtil jwtTokenUtil;

    @GetMapping("/")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<UserRoleDto>> getAllUsers(){

        List<UserRoleDto> users = userService.getAllUsers().stream().map(
                userDto -> modelMapper.map(userDto, UserRoleDto.class)
        ).toList();

        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<RegisterSimpleDto> getUserById(@PathVariable("id") Long userId){
        RegisterSimpleDto userDto = userService.getUserById(userId);

        return ResponseEntity.ok(userDto);
    }

    @PutMapping("/{id}/update-roles")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<UserDto> updateUserRoles(@PathVariable("id") Long userId,
                                                   @RequestBody Set<RoleDto> roles){
        UserDto userDto = userService.updateRoles(userId, roles);

        return ResponseEntity.ok(userDto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<String> deleteUser(@PathVariable("id") Long userId){
        userService.deleteUser(userId);

        return ResponseEntity.ok("User deleted with given id: " + userId);
    }

    @PutMapping("/")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<UserDto> updateUser(@RequestBody UserDto updatedUserDto){
        UserDto userDto = userService.updateUser(updatedUserDto);

        return ResponseEntity.ok(userDto);
    }

    @GetMapping("/me")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<RegisterSimpleDto> getCurrentUser(HttpServletRequest request){
        UserDto userDto = jwtTokenUtil.getUserDtoFromRequest(request);

        RegisterSimpleDto registerSimpleDto = userService.getUserById(userDto.getId());

        return ResponseEntity.ok(registerSimpleDto);
    }
}
