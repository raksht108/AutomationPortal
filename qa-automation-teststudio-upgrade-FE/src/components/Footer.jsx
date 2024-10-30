import React from 'react';
import { Typography, Container } from '@material-ui/core';

const Footer = () => {
  return (
    <Container style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0', textAlign: 'center' }}>
      <Typography variant="body1">© 2024 TalentNeuron. All rights reserved. V1.0</Typography>
    </Container>
  );
};

export default Footer;
