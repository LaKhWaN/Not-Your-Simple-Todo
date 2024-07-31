package net.lakhwan.not_your_simple_todo.repository;

import net.lakhwan.not_your_simple_todo.entity.Workspace;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkspaceRepository extends JpaRepository<Workspace, Long> {
}
