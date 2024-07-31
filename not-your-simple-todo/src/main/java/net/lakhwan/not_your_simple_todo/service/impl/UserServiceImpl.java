package net.lakhwan.not_your_simple_todo.service.impl;

import lombok.AllArgsConstructor;
import net.lakhwan.not_your_simple_todo.dto.RoleDto;
import net.lakhwan.not_your_simple_todo.dto.UserDtos.RegisterSimpleDto;
import net.lakhwan.not_your_simple_todo.dto.UserDtos.UserDto;
import net.lakhwan.not_your_simple_todo.entity.Role;
import net.lakhwan.not_your_simple_todo.entity.User;
import net.lakhwan.not_your_simple_todo.exceptions.ResourceNotFoundException;
import net.lakhwan.not_your_simple_todo.repository.RoleRepository;
import net.lakhwan.not_your_simple_todo.repository.UserRepository;
import net.lakhwan.not_your_simple_todo.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@AllArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private ModelMapper modelMapper;

    @Override
    public RegisterSimpleDto getUserById(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException("No user found with given id: " + userId)
        );

        return modelMapper.map(user, RegisterSimpleDto.class);
    }

    @Override
    public UserDto updateUser(UserDto updatedUserDto) {
        // Retrieve the existing user
        User user = userRepository.findById(updatedUserDto.getId()).orElseThrow(
                () -> new ResourceNotFoundException("No user found with given id: " + updatedUserDto.getId())
        );

        // Update fields only if they are provided (non-null)
        if (updatedUserDto.getFirst_name() != null) {
            user.setFirst_name(updatedUserDto.getFirst_name());
        }
        if (updatedUserDto.getLast_name() != null) {
            user.setLast_name(updatedUserDto.getLast_name());
        }
        if (updatedUserDto.getEmail() != null) {
            user.setEmail(updatedUserDto.getEmail());
        }
        if (updatedUserDto.getUsername() != null) {
            user.setUsername(updatedUserDto.getUsername());
        }
        if (updatedUserDto.getGender() != null) {
            user.setGender(updatedUserDto.getGender());
        }
        // Add checks for other fields as needed

        // Save the updated user
        User updatedUser = userRepository.save(user);

        // Return the updated user as DTO
        return modelMapper.map(updatedUser, UserDto.class);
    }


    @Override
    public UserDto updateRoles(Long userId, Set<RoleDto> roles) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException("No user found with given id: " + userId)
        );

        HashSet<Role> rolesSet = new HashSet<>();

        for(RoleDto roleDto: roles){
            rolesSet.add(roleRepository.findByName(roleDto.getName()));
        }

        user.getRoles().clear();

        user.getRoles().addAll(rolesSet);

        User savedUser = userRepository.save(user);

        return modelMapper.map(savedUser, UserDto.class);
    }

    @Override
    public List<UserDto> getAllUsers() {
        List<User> users = userRepository.findAll();

        return users.stream().map(user -> modelMapper.map(user, UserDto.class)).toList();
    }

    @Override
    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException("No user found with given id: " + userId)
        );

        userRepository.delete(user);
    }
}
