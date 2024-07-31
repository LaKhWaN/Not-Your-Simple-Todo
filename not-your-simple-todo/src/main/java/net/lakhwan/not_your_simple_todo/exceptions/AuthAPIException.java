package net.lakhwan.not_your_simple_todo.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public class AuthAPIException extends RuntimeException {
    private HttpStatus status;
    private String message;
}
