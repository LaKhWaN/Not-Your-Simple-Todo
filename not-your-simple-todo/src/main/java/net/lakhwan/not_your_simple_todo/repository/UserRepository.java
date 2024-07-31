package net.lakhwan.not_your_simple_todo.repository;

import net.lakhwan.not_your_simple_todo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

    List<User> findAllById(Iterable<Long> ids);

}
