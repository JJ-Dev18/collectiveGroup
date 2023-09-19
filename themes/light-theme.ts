import { Height } from '@mui/icons-material';
import { createTheme } from '@mui/material';
import { grey,red } from '@mui/material/colors'
import zIndex from '@mui/material/styles/zIndex';

export let lightTheme = createTheme({
    palette :{
      mode : 'light',
      background: {
        default :'#fff'
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
      MuiTableCell : {

        variants: [
        {
          props: { itemType: 'product' },
          style: {
            boxShadow: '0px 5px 5px rgba(0,0,0,0.05)',
            borderRadius: '10px',
            border :'0px solid #f6f5f3',
            ":hover": {
              backgroundColor: '#1F4452',
              color : 'white'
           },
            // padding: '10px',
            fontSize : '16px',
            fontFamily: 'Heebo'
          },
          
        },
        {
          props: { itemType: 'default' },
          style: {
            boxShadow: '0px 5px 5px rgba(0,0,0,0.05)',
             
            ":hover": {
               backgroundColor: '#1F4452',
               color : '#fff'
            },
            padding: '10px',
            fontSize : '16px',
            fontFamily: 'Heebo'
          },
          
        },
        
      ]
      },
 
      MuiTypography: {
        defaultProps: {
          fontFamily:'Heebo'
        },
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
  
  

      MuiButton:{
       
        styleOverrides :{
          textPrimary : {
            // color : 'white'
          },
          root: {
            // color: 'white'
            fontWeight: '700',
            // height: '60px',
            // width:'190px',
            // borderRadius:'40px',
            fontFamily : "Heebo"

          }
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
               height:'400px',
               padding : '0',
                  
            },
         
          },
          {
            props : {content :'dashboard'},
            style :{
              width: '200px',
              position: 'relative',
              zIndex: 0, // Fix Safari overflow: hidden with border radius
            }
          }
        ],
        defaultProps: {
          elevation: 4
        },
        styleOverrides: {

          root: {
            // boxShadow: '0px 5px 5px rgba(0,0,0,0.05)',
            borderRadius: '10px',
            border :'0px solid #f6f5f3',
            width: '340px',
            padding : "10px",
            fontSize : '16px',
            fontFamily: 'Heebo'
     
            
          }
        }
      }
      
    }

  });


  