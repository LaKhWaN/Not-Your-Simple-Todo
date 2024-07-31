package net.lakhwan.not_your_simple_todo.service;

import net.lakhwan.not_your_simple_todo.dto.UserDtos.LoginDto;
import net.lakhwan.not_your_simple_todo.dto.UserDtos.RegisterDto;
import net.lakhwan.not_your_simple_todo.dto.UserDtos.RegisterSimpleDto;

public interface AuthService {
    RegisterSimpleDto register(RegisterDto registerDto);

    String login(LoginDto loginDto);
}
