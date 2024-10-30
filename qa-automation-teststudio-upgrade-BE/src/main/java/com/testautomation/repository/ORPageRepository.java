package com.testautomation.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.testautomation.model.ORPage;

public interface ORPageRepository extends JpaRepository<ORPage, Integer> {

    // Retrieve all required fields
    @Query("select o from ORPage o where o.project.projectId = :projectId")
    List<ORPage> findORPagesByProjectId(@Param("projectId")Long projectId);
    
    @Query("SELECT DISTINCT p.screenName FROM ORPage p WHERE p.project.projectId = :projectId AND p.screenName is NOT NULL")
    List<String> findDistinctPageNamesByProjectId(Long projectId);
}
