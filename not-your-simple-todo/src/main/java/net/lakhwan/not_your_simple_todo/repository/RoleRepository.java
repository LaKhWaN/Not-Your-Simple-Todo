package net.lakhwan.not_your_simple_todo.repository;

import net.lakhwan.not_your_simple_todo.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Role findByName(String name);
}
