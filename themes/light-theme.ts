import { createTheme } from '@mui/material';
import { grey,red } from '@mui/material/colors'

export const lightTheme = createTheme({
    palette :{
      mode : 'light',
      background: {
        default : grey[300]
      },
      primary:{
        main : '#1EAEA8'
      },
      secondary: {
        main : '#1F4452'
      },
      error : {
        main : red.A400
      }
    },
    components: {
      // MuiLink: {
      //   defaultProps: {
      //     underline: 'none',
      //   },
      // },
      // MuiAppBar: {
      //   defaultProps: {
      //     elevation: 0,
      //     position: 'fixed',
      //   },
      //   styleOverrides: {
      //     root: {
      //       backgroundColor: 'info',
      //       height: 60
      //     },
      //   }
      // },
  
      MuiTypography: {
        
        styleOverrides: {
          
          h1: {
            fontSize: 26,
            fontWeight: 600
          },
          h2: {
            fontSize: 20,
            fontWeight: 400
          },
          h3:{
            fontSize: 16,
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
      //     color: 'primary'
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

      MuiButton:{
       
        styleOverrides :{
          textPrimary : {
            // color : 'white'
          },
          root: {
            // color: 'white'
            fontWeight: '700'
          }
        }
      },
  
     
      MuiCard: {
        defaultProps: {
          // elevation: 1
        },
        styleOverrides: {
          root: {
            boxShadow: '0px 5px 5px rgba(0,0,0,0.05)',
            borderRadius: '10px',
            border :'0px solid #f6f5f3',
            width: '340px',
            padding: '10px',
            fontSize : '16px',
            fontFamily: 'Heebo'
     
            
          }
        }
      }
      
    }

  });