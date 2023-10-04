import { Box, Fab } from "@mui/material";
import Head from "next/head";
import React, { FC, useEffect } from "react";
import ResponsiveAppBar from "../ui/Appbar";
import Footer from "../ui/Footer";
import { CarouselComponent } from "../ui/Carousel";
import LanguagePopover from "../admin/ui/adminHeader/LanguagePopover";

interface Props {
  title?: string;
  children?: React.ReactNode;
  
}

const Layout: FC<Props> = ({ title = "Shop", children }) => {
  return (
    <Box
      sx={{
        backgroundImage: (t) =>
          t.palette.mode === "light" ? `url(/background.svg)` : "none",
        backgroundRepeat: "repeat",

        backgroundSize: "cover",
      }}
    >
      <Head>
        <title>{`Collective Intelligence | ${title} `}</title>
      </Head>
      <ResponsiveAppBar />
      <Fab
        color="secondary"
        aria-label="edit"
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
        }}
      >
        <LanguagePopover />
      </Fab>
      <div
        className="flex flex-col min-h-screen mx-auto max-w-7xl"
        //  style={{backgroundImage: `url(/background2.svg)`,backgroundRepeat:'no-repeat',backgroundPosition:'top',backgroundSize:'contain'}}
      >
        <div className="flex-grow">
          <main className="flex items-center flex-col">{children}</main>
        </div>
      </div>
      <Footer />
    </Box>
  );
};

export default Layout;
