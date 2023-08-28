import { useDroppable, DragOverlay } from "@dnd-kit/core";
import { Box, List, ListItem, Paper, Typography, Card } from "@mui/material";
import { IService } from "fleed/interfaces";
import React, { FC } from "react";
import { ServiceCard } from "./ServiceCard";

type Props = {
  services: IService[];
  title: string;
  
};
export const ColumnContainer: FC<Props> = ({ services, title}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: title,
  });

  const countItems = services?.length || 0;
  
  return (
    <Card
      ref={setNodeRef}
      sx={{ border: `${isOver ? '3px dotted red' : 'none'}`}}
      className="  
        bg-orange-400
        rounded-md
        flex
        flex-col
        m-10
        p-10
        min-h-full
        "
    >
      <Typography variant="h1" color="inherit" textAlign="center">
        {title}
      </Typography>
      <List>
        {services.map((service) => (
          <ListItem key={service.id}>
            <ServiceCard {...service} />
          </ListItem>
        ))}
      </List>
     
    </Card>
  );
};
