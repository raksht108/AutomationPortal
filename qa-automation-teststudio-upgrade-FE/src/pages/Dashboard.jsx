import React from 'react';
import { Container, Typography, Paper } from '@material-ui/core';

const Dashboard = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      <Typography variant="h6" gutterBottom>Welcome to the Test Automation Portal Dashboard!</Typography>
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h6">Test Case Overview</Typography>
        {/* You can add more content or charts here */}
      </Paper>
    </Container>
  );
};

export default Dashboard;
