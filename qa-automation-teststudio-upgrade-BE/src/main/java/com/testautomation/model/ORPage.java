package com.testautomation.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;
import java.util.Date;

@Entity
@Table(name = "_tblor")
public class ORPage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private int id;

    @Column(name = "ElementName", length = 500)
    private String elementName;

    @Column(name = "LocatorType", length = 50)
    private String locatorType;

    @Column(name = "LocatorValue", length = 3000)
    private String locatorValue;

    @Column(name = "UserId")
    private Integer userId;

    @Column(name = "sessionID", length = 50)
    private String sessionId;

    @JsonBackReference  // Prevents infinite recursion
    @ManyToOne
    @JoinColumn(name = "ProjectId", referencedColumnName = "projectId", insertable = false, updatable = false)
    private Project project;

    @Column(name = "ScreenName", length = 200)
    private String screenName;

    @Column(name = "ElementVisibilityFlag")
    private String elementVisibilityFlag;

    @Column(name = "InsertedBy")
    private Integer insertedBy;

    @Column(name = "UpdatedBy")
    private Integer updatedBy;

    @Column(name = "InsertedDateTime")
    @Temporal(TemporalType.TIMESTAMP)
    private Date insertedDateTime;

    @Column(name = "LastUpdatedDateTime")
    @Temporal(TemporalType.TIMESTAMP)
    private Date lastUpdatedDateTime;

    @Column(name = "version", length = 10)
    private String version;

    // Getters and setters...

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getElementName() {
        return elementName;
    }

    public void setElementName(String elementName) {
        this.elementName = elementName;
    }

    public String getLocatorType() {
        return locatorType;
    }

    public void setLocatorType(String locatorType) {
        this.locatorType = locatorType;
    }

    public String getLocatorValue() {
        return locatorValue;
    }

    public void setLocatorValue(String locatorValue) {
        this.locatorValue = locatorValue;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public String getScreenName() {
        return screenName;
    }

    public void setScreenName(String screenName) {
        this.screenName = screenName;
    }

    public String getElementVisibilityFlag() {
        return elementVisibilityFlag;
    }

    public void setElementVisibilityFlag(String elementVisibilityFlag) {
        this.elementVisibilityFlag = elementVisibilityFlag;
    }

    public Integer getInsertedBy() {
        return insertedBy;
    }

    public void setInsertedBy(Integer insertedBy) {
        this.insertedBy = insertedBy;
    }

    public Integer getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(Integer updatedBy) {
        this.updatedBy = updatedBy;
    }

    public Date getInsertedDateTime() {
        return insertedDateTime;
    }

    public void setInsertedDateTime(Date insertedDateTime) {
        this.insertedDateTime = insertedDateTime;
    }

    public Date getLastUpdatedDateTime() {
        return lastUpdatedDateTime;
    }

    public void setLastUpdatedDateTime(Date lastUpdatedDateTime) {
        this.lastUpdatedDateTime = lastUpdatedDateTime;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }
}
