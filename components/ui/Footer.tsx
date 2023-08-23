import React, { FC, ReactElement } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";

export const Footer: FC = (): ReactElement => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        backgroundColor: "secondary.main",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        marginTop: 'auto'
      }}
    >
      <Container maxWidth="lg">
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
      </Container>
    </Box>
  );
};

export default Footer;