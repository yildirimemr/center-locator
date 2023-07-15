"use client";

import React, { FC, ReactElement } from "react";
import { AppBar, Container, Grid, Typography } from "@mui/material";

export const Footer: FC = (): ReactElement => {
  return (
      <AppBar component={"footer"} position="relative" sx={{alignItems:"center", justifyContent:"center"}}>
        <Container maxWidth="lg">
          <Grid container direction="column" alignItems="center" justifyContent={"center"} display={"flex"}>
            <Grid item xs={12}>
              <Typography>
                {`${new Date().getFullYear()} | Emre Yıldırım`}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </AppBar>
  );
};

export default Footer;
