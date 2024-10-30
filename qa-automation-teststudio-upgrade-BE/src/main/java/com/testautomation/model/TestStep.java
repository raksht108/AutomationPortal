package com.testautomation.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "_tblteststeps")
public class TestStep {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "TCID", length = 510)
    private String tcid;

    @Column(name = "TSID", length = 255)
    private String tsid;

    @Column(name = "Description", length = 1000)
    private String description;

    @Column(name = "Keyword", length = 50)
    private String keyword;

    @Column(name = "data", length = 255)
    private String data;

    @Column(name = "TestStepSequenceId")
    private int testStepSequenceId;

    @Column(name = "GotoFail", length = 100)
    private String gotoFail;

    @Column(name = "AjaxSkip", length = 2)
    private String ajaxSkip;

    @Column(name = "InsertedDateTime")
    private LocalDateTime insertedDateTime;

    @Column(name = "LastUpdatedDateTime")
    private LocalDateTime lastUpdatedDateTime;

    // Getters and Setters
}
