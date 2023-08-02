import { createTheme } from '@mui/material';
import { grey,red ,blueGrey,purple} from '@mui/material/colors'



export const darkTheme = createTheme({
    palette :{
        mode : 'dark',
        background: {
          default : "#000000"
        },
        secondary: {
          main : '#19857c'
        },
        error : {
          main : red.A400
        },
       
      },
      components: {
        MuiLink: {
          defaultProps: {
            underline: 'none',
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              // backgroundColor: 'rgba(0,0,0,0.05)',
              outline: '1px solid #6e6e73'
            },
          }
        },
        // MuiChip:{
        //     styleOverrides : {
        //       root: {
        //         color : 'white',
        //         backgroundColor : 'red'
        //       }
        //     }
        // },
        MuiAppBar: {
          defaultProps: {
            elevation: 3,
            position: 'fixed',
          },
          styleOverrides: {
            root: {
              // backgroundColor: 'rgba(0,0,0,0.05)',
              height: 60
            },
          }
        },
    
        MuiTypography: {
          styleOverrides: {
            h1: {
              fontSize: 30,
              fontWeight: 600
            },
            h2: {
              fontSize: 20,
              fontWeight: 400
            },
            subtitle1: {
              fontSize: 18,
              fontWeight: 600
            }
          }
        },
    
    
        // MuiButton: {
        //   defaultProps: {
        //     variant: 'contained',
        //     size: 'small',
        //     disableElevation: true,
        //     color: 'info'
        //   },
        //   styleOverrides: {
        //     root: {
        //       textTransform: 'none',
        //       boxShadow: 'none',
        //       borderRadius: 10,
        //       ":hover": {
        //         backgroundColor: 'rgba(0,0,0,0.05)',
        //         transition: 'all 0.3s ease-in-out'
        //       }
        //     }
        //   }
        // },
    
    
        MuiCard: {
          defaultProps: {
            elevation: 0
          },
          styleOverrides: {
            root: {
              boxShadow: '0px 5px 5px rgba(0,0,0,0.05)',
              borderRadius: '10px',
            }
          }
        }
        
      }
  });