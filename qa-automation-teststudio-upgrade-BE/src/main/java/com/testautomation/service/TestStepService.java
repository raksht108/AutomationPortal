package com.testautomation.service;

import com.testautomation.model.TestStep;
import com.testautomation.repository.TestStepRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class TestStepService {

    @Autowired
    private TestStepRepository testStepRepository;

    public TestStep saveTestStep(TestStep testStep) {
        return testStepRepository.save(testStep);
    }

    public List<TestStep> getAllTestSteps() {
        return testStepRepository.findAll();
    }
    
    public List<String> getDistinctKeywords() {
        return testStepRepository.findDistinctKeywords();
    }     
        public Page<String> getPaginatedTcids(Pageable pageable) {
            return testStepRepository.findDistinctTcids(pageable);
        }
}


