package net.lakhwan.not_your_simple_todo.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import net.lakhwan.not_your_simple_todo.dto.Todo.TodoDto;
import net.lakhwan.not_your_simple_todo.dto.UserDtos.UserDto;
import net.lakhwan.not_your_simple_todo.dto.WorkspaceDto;
import net.lakhwan.not_your_simple_todo.service.WorkspaceService;
import net.lakhwan.not_your_simple_todo.utils.JwtTokenUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/workspace")
@AllArgsConstructor
@CrossOrigin("*")
public class WorkspaceController {

    private WorkspaceService workspaceService;
    private JwtTokenUtil jwtTokenUtil;

    @PostMapping("/")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<WorkspaceDto> createWorkspace(@RequestBody WorkspaceDto workspaceDto,
                                                        HttpServletRequest request){

        String username = jwtTokenUtil.getUsernameFromRequest(request);

        WorkspaceDto createdWorkspace = workspaceService.createWorkspace(workspaceDto, username);

        return new ResponseEntity<>(createdWorkspace, HttpStatus.CREATED);
    }

    @GetMapping("/user/")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Set<WorkspaceDto>> getWorkspacesOfUser(HttpServletRequest request){
        UserDto userDto = jwtTokenUtil.getUserDtoFromRequest(request);

        Set<WorkspaceDto> workspaceDtos = workspaceService.getWorkspacesOfUser(userDto.getId());

        return ResponseEntity.ok(workspaceDtos);
    }

    @GetMapping("/todos/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Set<TodoDto>> getTodosOfWorkspace(@PathVariable("id") Long workspaceId){
        Set<TodoDto> todos = workspaceService.getTodosOfWorkspace(workspaceId);

        return ResponseEntity.ok(todos);
    }

    @GetMapping("/")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<WorkspaceDto>> getAllWorkspaces(){
        return ResponseEntity.ok(workspaceService.getAllWorkspaces());
    }

    @PutMapping("/user/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<WorkspaceDto> assignUsersToWorkspace(@PathVariable("id") Long workspaceId,
                                                               @RequestBody Set<Long> userIds){
        WorkspaceDto workspaceDto = workspaceService.updateAssignUsersToWorkspace(workspaceId, userIds);

        return ResponseEntity.ok(workspaceDto);
    }

    @PutMapping("/")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<WorkspaceDto> updateWorkspaceName(@RequestBody WorkspaceDto updatedWorkspaceDto){
        WorkspaceDto workspaceDto = workspaceService.updateWorkspaceName(updatedWorkspaceDto);

        return ResponseEntity.ok(workspaceDto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<String> deleteWorkspace(@PathVariable("id") Long workspaceId){
        workspaceService.deleteWorkspace(workspaceId);

        return ResponseEntity.ok("Workspace deleted with given id: " + workspaceId);
    }

    @PutMapping("/{workspace-id}/add-todo/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<WorkspaceDto> addTodoToWorkspace(@PathVariable("workspace-id") Long workspaceId,
                                                           @PathVariable("id") Long todoId){
        WorkspaceDto workspaceDto = workspaceService.addTodo(workspaceId, todoId);

        return ResponseEntity.ok(workspaceDto);
    }
}
