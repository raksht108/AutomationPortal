package com.testautomation.repository;

import com.testautomation.model.TestCase;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TestCaseRepository extends JpaRepository<TestCase, Long> {
    // Custom query to fetch test cases by projectId
    @Query("SELECT t FROM TestCase t WHERE t.projectId = :projectId")
    List<TestCase> findByProjectId(Long projectId);
	
}
