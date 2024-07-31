package net.lakhwan.not_your_simple_todo.service.impl;

import lombok.AllArgsConstructor;
import net.lakhwan.not_your_simple_todo.dto.UserDtos.LoginDto;
import net.lakhwan.not_your_simple_todo.dto.UserDtos.RegisterDto;
import net.lakhwan.not_your_simple_todo.dto.UserDtos.RegisterSimpleDto;
import net.lakhwan.not_your_simple_todo.entity.User;
import net.lakhwan.not_your_simple_todo.entity.Role;
import net.lakhwan.not_your_simple_todo.exceptions.AuthAPIException;
import net.lakhwan.not_your_simple_todo.repository.RoleRepository;
import net.lakhwan.not_your_simple_todo.repository.UserRepository;
import net.lakhwan.not_your_simple_todo.security.JwtTokenProvider;
import net.lakhwan.not_your_simple_todo.service.AuthService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {

    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;
    private AuthenticationManager authenticationManager;
    private JwtTokenProvider jwtTokenProvider;
    private ModelMapper modelMapper;

    @Override
    public RegisterSimpleDto register(RegisterDto registerDto) {

        if(userRepository.existsByUsername(registerDto.getUsername())){
            throw new AuthAPIException(HttpStatus.BAD_REQUEST, "Username already exists");
        }

        User user = new User();
        user.setUsername(registerDto.getUsername());
        user.setFirst_name(registerDto.getFirst_name());
        user.setLast_name(registerDto.getLast_name());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        user.setEmail(registerDto.getEmail());
        user.setGender(registerDto.getGender());

        Set<Role> roles = new HashSet<>();
        Role userRole = roleRepository.findByName("USER");
        roles.add(userRole);

        user.setRoles(roles);

        User savedUser = userRepository.save(user);

        return modelMapper.map(savedUser, RegisterSimpleDto.class);
    }

    @Override
    public String login(LoginDto loginDto) {

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginDto.getUsername(),
                            loginDto.getPassword()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            return jwtTokenProvider.generateToken(authentication);
    }
}
