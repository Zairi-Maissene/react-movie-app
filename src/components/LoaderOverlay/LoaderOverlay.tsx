import React from 'react';
import { useLoading } from '../../context/LoadingContext';
import { Backdrop, CircularProgress, Box } from '@mui/material';
import { keyframes } from '@mui/system';

const pulse = keyframes`
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(0, 188, 212, 0.7);
  }
  
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(0, 188, 212, 0);
  }
  
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(0, 188, 212, 0);
  }
`;

const LoaderOverlay: React.FC = ({ children }) => {
  const { isLoading } = useLoading();

  return (
    <>
      {children}
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
        }}
        open={isLoading}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            animation: `${pulse} 2s infinite`,
          }}
        >
          <CircularProgress
            color="secondary"
            size={60}
            thickness={4}
            sx={{ mb: 2 }}
          />
        </Box>
      </Backdrop>
    </>
  );
};

export default LoaderOverlay;