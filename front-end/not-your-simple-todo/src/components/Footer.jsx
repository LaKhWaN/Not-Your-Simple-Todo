// src/components/Footer.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <footer>
      <Box
        sx={{
          py: 2,
          mt: 'auto',
          textAlign: 'center',
          position: 'fixed',
          width: '100%',
          bottom: 0,
        }}
      >
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} Not Your Simple Todo. All rights reserved.
        </Typography>
      </Box>
    </footer>
  );
};

export default Footer;
