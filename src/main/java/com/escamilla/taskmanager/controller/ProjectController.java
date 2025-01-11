package com.escamilla.taskmanager.controller;

import com.escamilla.taskmanager.entity.Project;
import com.escamilla.taskmanager.entity.Task;
import com.escamilla.taskmanager.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.function.EntityResponse;

import javax.swing.text.html.parser.Entity;
import java.util.List;
import java.util.Optional;

@CrossOrigin(originPatterns = "http://localhost:*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/v1/projects")
public class ProjectController {
    private final ProjectService projectService;

    public ProjectController (ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public List<Project> getAllProjects() {
        return projectService.getAllProjects();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable Long id) {
        Optional<Project> project = projectService.getProjectById(id);
        if (!project.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(project.get());
    }

    @PostMapping
    public Project createProject(@RequestBody Project project) {
        return projectService.saveProject(project);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable Long id, @RequestBody Project projectDetails) {
        Optional<Project> project = projectService.getProjectById(id);
        if (!project.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        Project updatedProject = project.get();
        updatedProject.setName(projectDetails.getName());
        updatedProject.setDescription(projectDetails.getDescription());
        updatedProject.getTasks().clear();
        for (Task task : projectDetails.getTasks()) {
            updatedProject.addTask(task);
        }
        return ResponseEntity.ok(projectService.saveProject(updatedProject));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Project> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.noContent().build();
    }
}
