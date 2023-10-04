import React, { FC, ReactElement } from "react";
import { Box, Container, Grid, Typography, ListItem,List } from '@mui/material';
import Image from "next/image";
import { useTranslation } from 'next-i18next'

export const Footer: FC = (): ReactElement => {

  const { t } = useTranslation('common')

  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        backgroundColor: "secondary.main",
        position : 'relative',
        // paddingTop: "1rem",
        // paddingBottom: "1rem",
        marginTop: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container direction="row" alignItems="center" >
          <Grid item xs={12} md={6} lg={6} padding={5}>
            <Typography color="white" variant="h2">
             "{t('mission')}"
            </Typography>
            <List>
              <ListItem>
               <Typography variant="h2" color="primary"> Colombia</Typography>
              </ListItem>
              <ListItem>
               <Typography variant="h2" color="white"> {t('phone')} : (8) 269 2798</Typography>
              </ListItem>
              <ListItem>
               <Typography variant="h2" color="white"> {t('cellphone')}: (+57) 316 454 2799</Typography>
              </ListItem>
              <ListItem>
               <Typography variant="h2" color="white"> {t('e-mail')} : contacto@tolintelligence.com</Typography>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6} lg={6} sx={{ marginBottom :{ xs : 3}}}>
            <Image src="/logo3.svg" alt="logo" width={400} height={350} layout="responsive"/>
          </Grid>
        </Grid>
      </Container>
      <Box sx={{width:'100%',height:'20px',position : 'absolute', bottom :0,backgroundImage: `url(/footer.svg)`,backgroundRepeat:'no-repeat',backgroundPosition:'top',backgroundSize:'cover'}}>
      
      </Box>
      {/* <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography color="white" variant="h3">
            Copyright © 2023 Collective Intelligence Group. All Rights Reserved.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="textSecondary" variant="caption">
                 Terms and Conditions | Privacy Policy
            </Typography>
          </Grid>
        </Grid>
      </Container> */}
    </Box>
  );
};

export default Footer;