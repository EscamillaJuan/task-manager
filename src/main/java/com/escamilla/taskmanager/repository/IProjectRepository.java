package com.escamilla.taskmanager.repository;

import com.escamilla.taskmanager.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IProjectRepository extends JpaRepository<Project, Long> {
}
