package net.lakhwan.not_your_simple_todo.service;

import net.lakhwan.not_your_simple_todo.dto.Todo.TodoDto;
import net.lakhwan.not_your_simple_todo.dto.WorkspaceDto;

import java.util.List;
import java.util.Set;

public interface WorkspaceService {

    WorkspaceDto createWorkspace(WorkspaceDto workspaceDto, String username);

    List<WorkspaceDto> getAllWorkspaces ();

    Set<WorkspaceDto> getWorkspacesOfUser(Long userId);

    Set<TodoDto> getTodosOfWorkspace(Long workspaceId);

    WorkspaceDto updateAssignUsersToWorkspace(Long workspaceId, Set<Long> userIds);

    WorkspaceDto updateWorkspaceName(WorkspaceDto updatedWorkspaceDto);

    void deleteWorkspace(Long workspaceId);

    WorkspaceDto addTodo(Long workspaceId, Long todoId);
}
