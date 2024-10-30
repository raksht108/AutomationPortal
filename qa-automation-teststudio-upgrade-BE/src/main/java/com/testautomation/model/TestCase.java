package com.testautomation.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "testcase")
public class TestCase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ProjectId")
    private int projectId;

    @Column(name = "TCID", length = 1000)
    private String tcid;

    @Column(name = "Module", length = 255)
    private String module;

    @Column(name = "Description", length = 4000)
    private String description;

    @Column(name = "Runmode", length = 2)
    private String runmode;

    @Column(name = "Known_Defect", length = 10)
    private String knownDefect;

    @Column(name = "Defect_Status", length = 10)
    private String defectStatus;

    @Column(name = "Remarks", length = 510)
    private String remarks;

    @Column(name = "InsertedDateTime")
    private LocalDateTime insertedDateTime;

    @Column(name = "LastUpdatedDateTime")
    private LocalDateTime lastUpdatedDateTime;
    private String insertedBy;
    private String updatedBy;
    private LocalDateTime insertedDatetime;
    private LocalDateTime lastUpdatedDatetime;
    private String testcaseType;
    private String testcasePriority;

    // Getters and Setters
    public String getTCID() { return tcid; }
    public void setTCID(String TCID) { this.tcid = TCID; }

    public String getModule() { return module; }
    public void setModule(String module) { this.module = module; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getInsertedBy() { return insertedBy; }
    public void setInsertedBy(String insertedBy) { this.insertedBy = insertedBy; }

    public String getUpdatedBy() { return updatedBy; }
    public void setUpdatedBy(String updatedBy) { this.updatedBy = updatedBy; }

    public LocalDateTime getInsertedDatetime() { return insertedDatetime; }
    public void setInsertedDatetime(LocalDateTime insertedDatetime) { this.insertedDatetime = insertedDatetime; }

    public LocalDateTime getLastUpdatedDatetime() { return lastUpdatedDatetime; }
    public void setLastUpdatedDatetime(LocalDateTime lastUpdatedDatetime) { this.lastUpdatedDatetime = lastUpdatedDatetime; }

    public String getTestcaseType() { return testcaseType; }
    public void setTestcaseType(String testcaseType) { this.testcaseType = testcaseType; }

    public String getTestcasePriority() { return testcasePriority; }
    public void setTestcasePriority(String testcasePriority) { this.testcasePriority = testcasePriority; }
}
