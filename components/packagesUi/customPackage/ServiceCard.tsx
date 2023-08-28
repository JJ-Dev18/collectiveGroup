import React, { FC } from 'react'
import { CSS } from "@dnd-kit/utilities";
import { useDraggable } from "@dnd-kit/core";
import { IService } from 'fleed/interfaces';
import { Paper, Typography, Box } from '@mui/material';
import { ServiceItemCreator } from './CreateBoard';


export const ServiceCard:FC<ServiceItemCreator> = ({id,name,description,price,parent}) => {
    const { attributes, listeners, setNodeRef, transform , isDragging} = useDraggable({
        id: `service-${id}`,
        data: {
            id,
            name,
            description,
            price,
            parent
        },
      
    });
    const style = {
        // padding: "5vmin",
        // background: "orange",
        // border: "2px solid",
       
        // transform: CSS.Transform.toString(transform),
    };


    if (isDragging) {
      return (
        <div   
        className="
       
        "
        // ref={setNodeRef}
        // {...attributes}
        // {...listeners}
        >
          {/* <Typography variant="caption" color="inherit">{name}</Typography> */}
        </div>
        
      );
    }
  
  return (
    <Box   
    component="div"
    className="
    w-80
    bg-primary
    p-2.5 flex-col items-center flex text-left rounded-xl border-2 border-rose-500  cursor-grab relative
    "
    ref={setNodeRef}
    style={style}
    {...attributes}
    {...listeners}> 
       <Typography variant="caption" color="white">{name}</Typography>


    </Box>
  )
}
