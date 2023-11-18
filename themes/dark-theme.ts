import { createTheme } from '@mui/material';
import { grey,red ,blueGrey,purple} from '@mui/material/colors'



export const darkTheme = createTheme({
    palette :{
        mode : 'dark',
        background: {
          default : "#1B1B1B"
        },
        secondary:{
          main : '#1EAEA8'
        },
        primary: {
          main : '#f6f5f6'
        },
        error : {
          main : red.A400
        },
        text:{
          primary : '#d1d5db'
        }
        // #d1d5db
       
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
        MuiTableCell : {

          variants: [
          {
            props: { itemType: 'product' },
            style: {
              boxShadow: '0px 5px 5px rgba(0,0,0,0.05)',
              borderRadius: '10px',
              border :'0px solid #f6f5f3',
             
              padding: '10px',
              fontSize : '16px',
              fontFamily: 'Heebo'
            },
            
          },
          {
            props: { itemType: 'default' },
            style: {
              boxShadow: '0px 5px 5px "#1B1B1B"',
             
              backgroundColor : "#1B1B1B",
              padding: '10px',
              fontSize : '16px',
              fontFamily: 'Heebo'
            },
            
          },
          
        ]
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
              // height: 60
            },
          }
        },
    
        MuiTypography: {
          variants: [
            {
              props: { about: "title" },
              style: {
                borderBottom : `4px solid #1EAEA8`,
               fontSize: '30px',
               fontWeight:'400'
              },
              
            },
          ],
          styleOverrides: {
            
            h1: {
              fontSize: 26,
              fontWeight: 600,
              fontFamily: 'Heebo'
            },
            h2: {
              fontSize: 20,
              fontWeight: 400,
              fontFamily: 'Heebo'
            },
            h3:{
              fontSize: 16,
              fontWeight: 400,
              fontFamily: 'Heebo'
            },
            subtitle1: {
              fontSize: 18,
              fontWeight: 600,
              fontFamily: 'Heebo'
            }
          }
        },
    
    
        MuiButton: {
          // defaultProps: {
          //   variant: 'contained',
          //   size: 'small',
          //   disableElevation: true,
          //   color: 'info'
          // },
          styleOverrides: {
            root: {
              // textTransform: 'none',
              // boxShadow: 'none',
              // borderRadius: 10,
              // ":hover": {
              //   backgroundColor: 'rgba(0,0,0,0.05)',
              //   transition: 'all 0.3s ease-in-out'
              // }
            fontWeight: '700',
            fontFamily : "Heebo"

            },

          }
        },
        MuiCardHeader :{
          styleOverrides:{
            root:{
  
            },
            title:{
              fontFamily :'Heebo'
            },
            subheader : {
              fontFamily :'Heebo'
              
            }
          }
        },
    
        MuiCard: {
          variants: [
            {
              props: { content : "product" },
              style: {
                width:'100%',
                height:'420px'
              },
              
            },
            {
              props : {content :'dashboard'},
              style :{
                width: '200px',
                position: 'relative',
                zIndex: 0, // Fix Safari overflow: hidden with border radius
              }
            },
            {
              props : {content :'user'},
              style :{
                width: '100%',
                
              }
            }
           
            
          ],
          defaultProps: {
            // elevation: 1
          },
          styleOverrides: {
            root: {
              boxShadow: '0px 5px 5px rgba(0,0,0,0.05)',
              borderRadius: '10px',
              border :' 0px solid  #f6f5f3',
              width: '340px',
              padding: '10px',
              fontSize : '16px',
              fontFamily: 'Heebo'
  
              
            }
          }
        }
        
      }
  });