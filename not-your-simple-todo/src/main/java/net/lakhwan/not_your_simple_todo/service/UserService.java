package net.lakhwan.not_your_simple_todo.service;

import net.lakhwan.not_your_simple_todo.dto.RoleDto;
import net.lakhwan.not_your_simple_todo.dto.UserDtos.RegisterSimpleDto;
import net.lakhwan.not_your_simple_todo.dto.UserDtos.UserDto;

import java.util.List;
import java.util.Set;

public interface UserService {

    RegisterSimpleDto getUserById(Long userId);

    UserDto updateUser(UserDto updatedUserDto);

    UserDto updateRoles(Long userId, Set<RoleDto> roles);

    List<UserDto> getAllUsers();

    void deleteUser(Long userId);
}
