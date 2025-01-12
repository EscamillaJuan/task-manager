package com.escamilla.taskmanager.controller;

import com.escamilla.taskmanager.entity.Task;
import com.escamilla.taskmanager.service.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(originPatterns = "http://localhost:**", allowedHeaders = "*")
@RestController
@RequestMapping("/api/v1/tasks")
public class TaskController {
    private final TaskService taskService;

    public TaskController (TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        Optional<Task> Task = taskService.getTaskById(id);
        if (!Task.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(Task.get());
    }

    @PostMapping
    public Task createTask(@RequestBody Task Task) {
        return taskService.saveTask(Task);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task taskDetails) {
        Optional<Task> task = taskService.getTaskById(id);
        if (!task.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        Task updatedTask = task.get();
        updatedTask.setName(taskDetails.getName());
        updatedTask.setDescription(taskDetails.getDescription());
        updatedTask.setCompleted(taskDetails.getCompleted());
        updatedTask.setDueDate(taskDetails.getDueDate());
        updatedTask.setProject(taskDetails.getProject());
        return ResponseEntity.ok(taskService.saveTask(updatedTask));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Task> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }
}
