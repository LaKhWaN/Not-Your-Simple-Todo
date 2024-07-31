// src/components/MyComponent.jsx
import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const MyComponent = () => {
  return (
    <Container>
      <Typography variant="h1" gutterBottom>
        Welcome to My MUI Dark Theme App
      </Typography>
      <Button variant="contained" color="primary">
        Click Me
      </Button>
    </Container>
  );
};

export default MyComponent;
