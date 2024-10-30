package com.testautomation.repository;

import com.testautomation.model.TestStep;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TestStepRepository extends JpaRepository<TestStep, Long> {
	
	@Query("SELECT DISTINCT t.keyword FROM TestStep t WHERE t.keyword IS NOT NULL")
	List<String> findDistinctKeywords();
	
	@Query("SELECT DISTINCT t.tcid FROM TestStep t")
    Page<String> findDistinctTcids(Pageable pageable);
	
}


