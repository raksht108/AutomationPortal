package com.testautomation.controller;

import com.testautomation.model.ORPage;
import com.testautomation.model.TestStep;
import com.testautomation.service.ORPageService;
import com.testautomation.service.TestStepService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teststeps")
public class TestStepController {

    @Autowired
    private TestStepService testStepService;
    
    @Autowired
    private ORPageService orPageService;  // Autowire the ORPageService
    

    @PostMapping("/create")
    public ResponseEntity<TestStep> createTestStep(@RequestBody TestStep testStep) {
        TestStep savedTestStep = testStepService.saveTestStep(testStep);
        return ResponseEntity.ok(savedTestStep);
    }

    @GetMapping("/all")
    public List<TestStep> getAllTestSteps() {
        return testStepService.getAllTestSteps();
    }
    
    @GetMapping("/keywords")
    public List<String> getKeywords() {
        return testStepService.getDistinctKeywords();
    }
    @GetMapping("/tcids")
    public Page<String> getTcids(@RequestParam int page, @RequestParam int size) {
       return testStepService.getPaginatedTcids(PageRequest.of(page, size));
    }
    
  //  @GetMapping("/orpages")
   // public Page<ORPage> getPagedORPages(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "500") int size) {
   //     return orPageService.getPagedORPages(page, size);
  // }  
 /*   @GetMapping("/orpages")
    public List<String> getPagedORPages() {
        return orPageService.getPagedORPages();
    }
    

    
    @GetMapping("/ornames")
    public List<String> getOrNames() {
    	return orPageService.getOrNames(); // Use the instance of the service
    } */
}

