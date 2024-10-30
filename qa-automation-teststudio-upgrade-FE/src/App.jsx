import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Dashboard from './pages/Dashboard';
import CreateTestCaseForm from './components/CreateTestCaseForm';
import Footer from './components/Footer';
import AllTestCases from './components/AllTestCases';
import ObjectRepository from './components/ObjectRepository';

// Placeholder components for new routes
const CreateSuites = () => <div>Create Suites Page</div>;
const CreateCollections = () => <div>Create Collections Page</div>;
const CommonMultisetData = () => <div>Common Multiset Data Page</div>;
const Suites = () => <div>Suites Page</div>;
const Collections = () => <div>Collections Page</div>;
const ManageUsers = () => <div>Manage Users Page</div>;
const ManageEnvironments = () => <div>Manage Environments Page</div>;
const ManageServiceLogs = () => <div>Manage Service Logs Page</div>;
const InProgressRuns = () => <div>In-progress Runs Page</div>;
const CompletedRuns = () => <div>Completed Runs Page</div>;
const InProcessPausedRuns = () => <div>In-process/Paused Runs Page</div>;

const App = () => {
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  // Function to update selected project ID
  const handleProjectSelect = (projectId) => {
    setSelectedProjectId(projectId);
  };

  return (
    <Router>
      {/* Pass handleProjectSelect and selectedProjectId to NavigationBar */}
      <NavigationBar
        onProjectSelect={handleProjectSelect}
        selectedProjectId={selectedProjectId}
      />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create/test-case" element={<CreateTestCaseForm />} />
        <Route path="/create/suites" element={<CreateSuites />} />
        <Route path="/create/collections" element={<CreateCollections />} />

        {/* Pass selectedProjectId to AllTestCases */}
        <Route path="/test-case/all" element={<AllTestCases selectedProjectId={selectedProjectId} />} />

        <Route path="/test-case/common-data" element={<CommonMultisetData />} />
        <Route path="/test-case/suites" element={<Suites />} />
        <Route path="/test-case/collections" element={<Collections />} />

        {/* Pass selectedProjectId to ObjectRepository */}
        <Route path="/test-case/ObjectRepository" element={<ObjectRepository selectedProjectId={selectedProjectId} />} />

        <Route path="/manage/manage-users" element={<ManageUsers />} />
        <Route path="/manage/manage-environments" element={<ManageEnvironments />} />
        <Route path="/manage/manage-logs" element={<ManageServiceLogs />} />
        <Route path="/executions/in-progress" element={<InProgressRuns />} />
        <Route path="/executions/completed" element={<CompletedRuns />} />
        <Route path="/executions/in-process" element={<InProcessPausedRuns />} />

        {/* Redirect any unknown routes to the dashboard */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;
