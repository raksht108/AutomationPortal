package com.testautomation.service;

import com.testautomation.model.ORPage;
import com.testautomation.repository.ORPageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ORPageService {

    @Autowired
    private ORPageRepository orPageRepository;

    public List<ORPage> getORPagesByProjectId(Long projectId) {
        return orPageRepository.findORPagesByProjectId(projectId);
    }
    
    public List<String> getDistinctPageNamesByProjectId(Long projectId) {
        return orPageRepository.findDistinctPageNamesByProjectId(projectId);
    }
}
