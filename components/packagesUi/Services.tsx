import { Box } from "@mui/material";
import { IService } from "fleed/interfaces";
import React, { FC } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export const Services: FC<IService> = (props) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" component="li">
      <CheckCircleOutlineIcon color="success" className="md:w-8 md:h-8"/>
      <div className="ml-4 mb-2 ">
         <span className="md:text-base leading-7"  >{props.name}</span> 
         <span> - {props.description}.</span>
      </div>
    </Box>
  );
};
