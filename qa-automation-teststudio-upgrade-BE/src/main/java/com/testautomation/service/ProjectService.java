package com.testautomation.service;
import com.testautomation.model.Project;
import com.testautomation.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    // Method to fetch active projects
    public List<String> getActiveProjects() {
        return projectRepository.findActiveProjects();
    }
    
 // Method to fetch active projects
    public List<String> getActiveProjectsByID(String projectName) {
        return projectRepository.findActiveProjectsById(projectName);
    }
}
