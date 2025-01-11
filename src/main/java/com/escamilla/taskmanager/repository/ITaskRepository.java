package com.escamilla.taskmanager.repository;

import com.escamilla.taskmanager.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ITaskRepository extends JpaRepository<Task, Long> {
}
