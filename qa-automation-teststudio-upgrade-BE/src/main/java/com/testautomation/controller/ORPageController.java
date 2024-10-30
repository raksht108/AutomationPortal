package com.testautomation.controller;

import com.testautomation.model.ORPage;
import com.testautomation.service.ORPageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/orpages")
public class ORPageController {

    @Autowired
    private ORPageService orPageService;

    @GetMapping
    public List<ORPage> getORPagesByProjectId(@RequestParam Long projectId) {
        System.out.println("Received projectId: " + projectId); // Debugging log
        return orPageService.getORPagesByProjectId(projectId);
    }
    
    @GetMapping("/pages")
    public List<String> getDistinctPageNames(@RequestParam Long projectId) {
        return orPageService.getDistinctPageNamesByProjectId(projectId);
    }
    
}
