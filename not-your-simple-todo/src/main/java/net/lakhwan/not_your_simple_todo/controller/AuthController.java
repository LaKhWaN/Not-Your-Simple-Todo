package net.lakhwan.not_your_simple_todo.controller;

import lombok.AllArgsConstructor;
import net.lakhwan.not_your_simple_todo.dto.JwtAuthResponse;
import net.lakhwan.not_your_simple_todo.dto.UserDtos.LoginDto;
import net.lakhwan.not_your_simple_todo.dto.UserDtos.RegisterDto;
import net.lakhwan.not_your_simple_todo.dto.UserDtos.RegisterSimpleDto;
import net.lakhwan.not_your_simple_todo.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@CrossOrigin("*")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<RegisterSimpleDto> registerUser(@RequestBody RegisterDto registerDto){
        RegisterSimpleDto userDto = authService.register(registerDto);

        return new ResponseEntity<>(userDto, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponse> loginUser(@RequestBody LoginDto loginDto){
        String token = authService.login(loginDto);

        JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
        jwtAuthResponse.setAccessToken(token);


        return ResponseEntity.ok(jwtAuthResponse);
    }
}
