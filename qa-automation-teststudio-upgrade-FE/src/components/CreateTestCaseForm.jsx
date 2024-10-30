import React, { useState, useEffect, useCallback } from 'react';
import { Container, TextField, Button, Typography, Select, MenuItem, FormControl, InputLabel, IconButton } from '@material-ui/core';
import { Add, Delete, Save, ArrowUpward, ArrowDownward, FileCopy as FileCopyIcon } from '@material-ui/icons';
import axios from 'axios';

const TestStepDesign = ({ testSteps, setTestSteps, manualTestCase, saveTestSteps }) => {
  const [keywords, setKeywords] = useState([]);
  const [orPages, setOrPages] = useState([]);
  const [tcids, setTcids] = useState([]);

  // Fetch OR Pages, keywords, and TCIDs in a single useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [orPagesResponse, keywordsResponse, tcidsResponse] = await Promise.all([
          axios.get('/api/teststeps/orpages'),
          axios.get('/api/teststeps/keywords'),
          axios.get('/api/teststeps/tcids?page=0&size=500'),
        ]);

        setOrPages(orPagesResponse.data);
        setKeywords(keywordsResponse.data);
        setTcids(tcidsResponse.data.content);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Ensure at least one default test step exists
  useEffect(() => {
    if (testSteps.length === 0) {
      addTestStep();
    }
  }, [testSteps]);

  // Add, delete, copy, and move test steps handlers
  const handleStepChange = useCallback((index, field, value) => {
    const updatedSteps = [...testSteps];
    updatedSteps[index][field] = value;
    setTestSteps(updatedSteps);
  }, [testSteps, setTestSteps]);

  const addTestStep = useCallback(() => {
    setTestSteps([...testSteps, {
      orPage: '', orName: '', description: '', keyword: '', data: '',
      gotoFail: '', skipTime: 0, ajaxSkip: false
    }]);
  }, [testSteps, setTestSteps]);

  const deleteTestStep = useCallback((index) => {
    setTestSteps(testSteps.filter((_, i) => i !== index));
  }, [testSteps, setTestSteps]);

  const copyTestStep = useCallback((index) => {
    setTestSteps([...testSteps, { ...testSteps[index] }]);
  }, [testSteps, setTestSteps]);

  const moveStep = useCallback((index, direction) => {
    const updatedSteps = [...testSteps];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    [updatedSteps[index], updatedSteps[swapIndex]] = [updatedSteps[swapIndex], updatedSteps[index]];
    setTestSteps(updatedSteps);
  }, [testSteps, setTestSteps]);

  return (
    <>
      <Typography variant="h6">Test Steps Design</Typography>
      {testSteps.map((step, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <FormControl style={{ minWidth: 150, marginRight: 10, flex: 1 }}>
            <InputLabel>OR Page</InputLabel>
            <Select
              value={step.orPage}
              onChange={(e) => handleStepChange(index, 'orPage', e.target.value)}
            >
              {orPages.map((orPage, id) => (
                <MenuItem key={id} value={orPage}>
                  {orPage}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="OR Name"
            value={step.orName}
            onChange={(e) => handleStepChange(index, 'orName', e.target.value)}
            style={{ marginRight: 10, flex: 1 }}
          />

          <TextField
            label="Description"
            value={step.description}
            onChange={(e) => handleStepChange(index, 'description', e.target.value)}
            style={{ marginRight: 10, flex: 2 }}
          />

          <FormControl style={{ minWidth: 150, marginRight: 10, flex: 1 }}>
            <InputLabel>Keyword</InputLabel>
            <Select
              value={step.keyword}
              onChange={(e) => handleStepChange(index, 'keyword', e.target.value)}
            >
              {keywords.map((keyword, idx) => (
                <MenuItem key={idx} value={keyword}>
                  {keyword}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl style={{ minWidth: 150, marginRight: 10, flex: 1 }}>
            <InputLabel>Goto Fail</InputLabel>
            <Select
              value={step.gotoFail}
              onChange={(e) => handleStepChange(index, 'gotoFail', e.target.value)}
            >
              {tcids.map((tcid, idx) => (
                <MenuItem key={idx} value={tcid}>{tcid}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <IconButton onClick={() => moveStep(index, 'up')} disabled={index === 0}>
            <ArrowUpward />
          </IconButton>

          <IconButton onClick={() => moveStep(index, 'down')} disabled={index === testSteps.length - 1}>
            <ArrowDownward />
          </IconButton>

          <IconButton onClick={() => copyTestStep(index)}>
            <FileCopyIcon />
          </IconButton>

          <IconButton onClick={() => deleteTestStep(index)}>
            <Delete />
          </IconButton>
        </div>
      ))}

      <Button onClick={addTestStep} variant="contained" color="primary" startIcon={<Add />}>
        Add Step
      </Button>

      <Button onClick={saveTestSteps} variant="contained" color="primary" startIcon={<Save />} style={{ marginLeft: 10 }}>
        Save Steps
      </Button>

      <Button onClick={() => setTestSteps([])} variant="contained" color="secondary" style={{ marginLeft: 10 }}>
        Clear Steps
      </Button>
    </>
  );
};

const CreateTestCaseForm = () => {
  const [mode, setMode] = useState('manual');
  const [manualTestCase, setManualTestCase] = useState({
    tcid: '', module: '', description: '', knownDefect: '', defectStatus: '',
    testSuite: '', runMode: '', testCaseType: '', dependency: '', priority: '', remarks: ''
  });
  const [testSteps, setTestSteps] = useState([]);

  const handleManualChange = (e) => {
    setManualTestCase({
      ...manualTestCase,
      [e.target.name]: e.target.value,
    });
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    console.log('Manual Test Case Data:', manualTestCase);
  };

  const saveTestSteps = () => {
    if (!manualTestCase.tcid || !manualTestCase.module || !manualTestCase.description) {
      alert("Please fill out the mandatory fields: TCID, Module, and Description.");
      return;
    }
    console.log(testSteps);
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>Create New Test Case</Typography>

      <Button
        variant={mode === 'manual' ? 'contained' : 'outlined'}
        color="primary"
        onClick={() => setMode('manual')}
        style={{ marginRight: '10px' }}
      >
        Manual Test Case
      </Button>
      <Button
        variant={mode === 'TestStepDesign' ? 'contained' : 'outlined'}
        color="primary"
        onClick={() => setMode('TestStepDesign')}
      >
        Test Step Design
      </Button>

      {mode === 'manual' && (
        <form onSubmit={handleManualSubmit} style={{ marginTop: '20px' }}>
          <TextField
            label="TCID"
            variant="outlined"
            fullWidth
            name="tcid"
            value={manualTestCase.tcid}
            onChange={handleManualChange}
            required
            style={{ marginBottom: '10px' }}
          />
          <FormControl fullWidth variant="outlined" style={{ marginBottom: '10px' }}>
            <InputLabel>Module</InputLabel>
            <Select
              label="Module"
              name="module"
              value={manualTestCase.module}
              onChange={handleManualChange}
              required
            >
              {/* Module options */}
              <MenuItem value="test">test</MenuItem>
              <MenuItem value="Test Module">Test Module</MenuItem>
              <MenuItem value="Salary">Salary</MenuItem>
              <MenuItem value="Competitive Concentration">Competitive Concentration</MenuItem>
              <MenuItem value="Employers lookup">Employers lookup</MenuItem>
              <MenuItem value="Skills Taxonomy">Skills Taxonomy</MenuItem>
              <MenuItem value="Titles Ranking">Titles Ranking</MenuItem>
              <MenuItem value="Improvement">Improvement</MenuItem>
              <MenuItem value="Posting Duration">Posting Duration</MenuItem>
              <MenuItem value="Taxonomy-Occupations">Taxonomy-Occupations</MenuItem>
              <MenuItem value="Monthly Demand Trend - Titles">Monthly Demand Trend - Titles</MenuItem>
              <MenuItem value="MonthlyDemandTrend-Locations">MonthlyDemandTrend-Locations</MenuItem>
              <MenuItem value="EthnicDiversity">EthnicDiversity</MenuItem>
              <MenuItem value="SkillTaxonomyDeepPagination">SkillTaxonomyDeepPagination</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            name="description"
            value={manualTestCase.description}
            onChange={handleManualChange}
            required
            style={{ marginBottom: '10px' }}
          />
                    {/* Form controls for other fields like Known Defect, Defect Status, etc. */}
                    <FormControl fullWidth variant="outlined" style={{ marginBottom: '10px' }}>
                        <InputLabel>Known Defect</InputLabel>
                        <Select
                            label="Known Defect"
                            name="knownDefect"
                            value={manualTestCase.knownDefect} // Bind value to manualTestCase's knownDefect field.
                            onChange={handleManualChange} // Handle changes in Known Defect field.
                        >
                            <MenuItem value="Yes">Yes</MenuItem>
                            <MenuItem value="No">No</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth variant="outlined" style={{ marginBottom: '10px' }}>
                        <InputLabel>Defect Status</InputLabel>
                        <Select
                            label="Defect Status"
                            name="defectStatus"
                            value={manualTestCase.defectStatus} // Bind value to manualTestCase's defectStatus field.
                            onChange={handleManualChange} // Handle changes in Defect Status field.
                        >
                            <MenuItem value="Pass">Pass</MenuItem>
                            <MenuItem value="Fail">Fail</MenuItem>
                        </Select>
                    </FormControl>
<TextField
                            label="Test Suite"
                            variant="outlined"
                            fullWidth
                            name="testSuite"
                            value={manualTestCase.testSuite}
                            onChange={handleManualChange}
                            style={{ marginBottom: '10px' }}
                          />
                          <FormControl fullWidth variant="outlined" style={{ marginBottom: '10px' }}>
                            <InputLabel>Run Mode</InputLabel>
                            <Select
                              label="Run Mode"
                              name="runMode"
                              value={manualTestCase.runMode}
                              onChange={handleManualChange}
                            >
                              <MenuItem value="Y">Y</MenuItem>
                              <MenuItem value="N">N</MenuItem>
                            </Select>
                          </FormControl>
                           <FormControl fullWidth variant="outlined" style={{ marginBottom: '10px' }}>
                                      <InputLabel>Test Case Type</InputLabel>
                                      <Select
                                        label="Test Case Type"
                                        name="testCaseType"
                                        value={manualTestCase.testCaseType}
                                        onChange={handleManualChange}
                                      >
                                        <MenuItem value="Smoke">Smoke</MenuItem>
                                        <MenuItem value="Regression">Regression</MenuItem>
                                      </Select>
                                    </FormControl>

                          <TextField
                            label="Test Case Dependency"
                            variant="outlined"
                            fullWidth
                            name="dependency"
                            value={manualTestCase.dependency}
                            onChange={handleManualChange}
                            style={{ marginBottom: '10px' }}
                          />

                                     <FormControl fullWidth variant="outlined" style={{ marginBottom: '10px' }}>
                                                <InputLabel>Test Case Priority</InputLabel>
                                                <Select
                                                  label="Test Case Priority"
                                                  name="priority"
                                                  value={manualTestCase.priority}
                                                  onChange={handleManualChange}
                                                >
                                                  <MenuItem value="High">High</MenuItem>
                                                  <MenuItem value="Medium">Medium</MenuItem>
                                                  <MenuItem value="Low">Low</MenuItem>
                                                </Select>
                                              </FormControl>

                          <TextField
                            label="Remarks"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={2}
                            name="remarks"
                            value={manualTestCase.remarks}
                            onChange={handleManualChange}
                            style={{ marginBottom: '10px' }}
                          />

                    {/* Navigation for Test Step Design form */}
                    <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}onClick={() => setMode('TestStepDesign')}>
                        Test Step Design
                    </Button>
                </form>
            )}

            {/* Render TestStepDesign component if the mode is 'TestStepDesign' */}
            {mode === 'TestStepDesign' && (
                <TestStepDesign
                    testSteps={testSteps} // Pass test steps to the TestStepDesign component.
                    setTestSteps={setTestSteps} // Function to update test steps in the TestStepDesign component.
                    manualTestCase={manualTestCase} // Pass manualTestCase to validate required fields.
                    saveTestSteps={saveTestSteps}   // Pass saveTestSteps function to handle the save logic.
                />
            )}
        </Container>
    );
};

export default CreateTestCaseForm; // Export the CreateTestCaseForm component for use in other parts of the application.
