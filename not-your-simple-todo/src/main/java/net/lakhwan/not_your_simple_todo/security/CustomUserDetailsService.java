package net.lakhwan.not_your_simple_todo.security;


import lombok.AllArgsConstructor;
import net.lakhwan.not_your_simple_todo.entity.User;
import net.lakhwan.not_your_simple_todo.repository.UserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = userRepository.findByUsername(username).orElseThrow(
                () -> {
                    return new UsernameNotFoundException("User not found with given username or email");
                }
        );

        Set<GrantedAuthority> authorities = user.getRoles().stream().map(
                (role -> new SimpleGrantedAuthority(role.getName()))
        ).collect(Collectors.toSet());

        return new org.springframework.security.core.userdetails.User(
                username,
                user.getPassword(),
                authorities
        );
    }
}
