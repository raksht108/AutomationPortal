package com.testautomation.dto;

public class NLPResponse {
    private String structuredTestCase;

    public NLPResponse() {
    }

    public NLPResponse(String structuredTestCase) {
        this.structuredTestCase = structuredTestCase;
    }

    // Getters and Setters
    public String getStructuredTestCase() {
        return structuredTestCase;
    }

    public void setStructuredTestCase(String structuredTestCase) {
        this.structuredTestCase = structuredTestCase;
    }
}
