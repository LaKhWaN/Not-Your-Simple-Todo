package net.lakhwan.not_your_simple_todo.repository;

import net.lakhwan.not_your_simple_todo.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo, Long> {
}
