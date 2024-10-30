package com.testautomation.controller;

import com.testautomation.model.Project;
import com.testautomation.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    // Endpoint to return the active projects
    @GetMapping("/active")
    public List<String> getActiveProjects() {
        return projectService.getActiveProjects();
    }
    
 // Endpoint to fetch project by ID
    @GetMapping("/id")
    public List<String> getProjectById(@RequestParam String projectName) {
        return projectService.getActiveProjectsByID(projectName);
    }
}
