// themes.ts

import { createTheme } from '@mui/material/styles';

// Light theme
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2', // Example primary color
    },
    // Other colors for light mode
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff', // Background color for TextField in light mode
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          backgroundColor: '#fff', // Background color for Select in dark mode
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        // Apply styles for app bar in dark mode
        root: {
          backgroundColor: '#ffffff', // Red background for app bar
          color:'#000000'
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#000', 

        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          '& .MuiButton-root': {
            color: '#000', // Use the inherit color (white) for button text
          },
        },
      },
    },
    

  },
});

// Dark theme
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9', // Example primary color for dark mode
    },
    // Other colors for dark mode
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: '#2b3945', 
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          backgroundColor: '#2b3945', 
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        // Apply styles for app bar in dark mode
        root: {
          backgroundColor: '#2b3945', // Red background for app bar
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#2b3945',
          color: '#ffffff', 

        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          '& .MuiButton-root': {
            color: 'inherit', // Use the inherit color (white) for button text
          },
        },
      },
    },
    

  },
});
