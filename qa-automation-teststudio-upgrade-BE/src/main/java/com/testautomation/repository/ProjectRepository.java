package com.testautomation.repository;
import com.testautomation.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    // Custom query to fetch projects based on the conditions
	@Query("SELECT p.projectName FROM Project p WHERE p.isActive = 1 AND p.projectId NOT IN (18, 29, 59, 78, 67)")
    List<String> findActiveProjects();
	
	// Custom query to fetch active project ID by a dynamic project name
	@Query("SELECT p.projectId FROM Project p WHERE p.projectName = :projectName")
	List<String> findActiveProjectsById(@Param("projectName") String projectName);

}
