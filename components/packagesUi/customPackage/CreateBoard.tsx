import { DndContext,DragEndEvent,DragStartEvent,rectIntersection ,  DragOverlay, } from "@dnd-kit/core";
import { Box, Button, Card, CardContent, Container, Divider, Paper, Typography } from "@mui/material";
import { IService, ItemInterface } from "fleed/interfaces";
import React, { FC, useState, useEffect, useMemo } from "react";
import { ColumnContainer } from "./ColumnContainer";
import { ServiceCard } from "./ServiceCard";
import { formatAmountForDisplay, formatAmountForStripe, formatAmountFromStripe } from "fleed/utils/stripe-helpers";
import { useTranslation } from 'next-i18next'

type Props = {
    services  : IService[] | ServiceItemCreator[],
    handleCheckout : (packageToAdd: ItemInterface) => void
    loading : boolean
}

export interface ServiceItemCreator extends IService {
 parent? : string
}

export const CreateBoard:FC <Props>= ({services,loading,handleCheckout}) => {
  const [serviceCustom, setServiceCustom] = useState<ServiceItemCreator[]>([]);
  const { t  } = useTranslation("common")
  const [servicesData, setServices] = useState<ServiceItemCreator[] | IService[]>(services)
  const [activeService, setActiveService] = useState<IService>();
  const [price, setprice] = useState(0)

   const servicesWithParents = useMemo(() => {
    const servicesWithParent = services.map((service: ServiceItemCreator) => {
        
        service.parent = t('custom-package.title-services')
        return service
    })
  
    return servicesWithParent
   }, [services])
  
   const buy = ( )=> {
    let packageToAdd : ItemInterface = { id: 'package0004',  name : 'Custom Package', price : price , createdAt : Date.now().toString(), updatedAt :null , currency : 'usd'}
    
    handleCheckout(packageToAdd)
   }

  useEffect(() => {
    const calculatePrice = () =>{
      let priceAcumulated = 0
      serviceCustom.forEach( service => {
         priceAcumulated += service.price
      });
      setprice(priceAcumulated)
    }
    calculatePrice()
  }, [serviceCustom])
  
 

  useEffect(() => {
    setServices(servicesWithParents)
  }, [services])
  

  const onDragEnd = (e: DragEndEvent) => {
    const container = e.over?.id;
    
    const name: string = e.active.data.current?.name || "";
    const id = e.active.data.current?.id || 0;
    const description = e.active.data.current?.description || 0;
    const price = e.active.data.current?.price || 0;
    const parent = e.active.data.current?.parent || ''
    
    if(parent !== container){
      if(container == t('custom-package.title-package')){
          const newServiceData = servicesData.filter(service => service.id !== id)
          const newServiceCustom:ServiceItemCreator = { id, name, description, price ,parent : t('custom-package.title-package')}
          setServiceCustom([...serviceCustom, newServiceCustom]);
        
          setServices(newServiceData)
      }else if(container == t('custom-package.title-services')){
          const newServiceCustom = serviceCustom.filter(service => service.id !== id)
          const newServiceData:ServiceItemCreator = { id, name, description, price, parent: t('custom-package.title-services') }

          
          setServices([...servicesData, newServiceData] );
          setServiceCustom(newServiceCustom)
      }
    }

    
  };

  const onDragStart = (e:DragStartEvent)=>{
    
    // if(e.active.data.current.type)
    setActiveService(e.active.data?.current as IService);
  }
  

  return (
    <DndContext
      //   sensors={sensors}
      onDragStart={onDragStart}
      // collisionDetection={rectIntersection}

      onDragEnd={onDragEnd}
    >
    <div
      className="
      flex
      flex-wrap
      items-center"
    >
        {/* <Box sx={{display :'flex',justifyContent: 'space-around', width: '500px',height:'auto',overflowY:'scroll'}}> */}
        {/* <DragOverlay> */}
          <ColumnContainer title={t('custom-package.title-services')}services={servicesData} />
          <ColumnContainer title={t('custom-package.title-package')} services={serviceCustom} />
          <DragOverlay>
        {activeService ? (
          <ServiceCard  {...activeService}/> 
        ): null}
      </DragOverlay>
     
        {/* </DragOverlay> */}
        {/* </Box> */}
    </div>
    <Paper sx={{ marginTop: {xs : '20px', md: '0'},marginLeft : { xs : '0', md : '20px'}, height:'180px',width : '80%'}}  >
            <CardContent>
              <Typography variant="h1">{t('custom-package.purchase.title')}</Typography>
              <Divider sx={{ my: 1 }} />
             
              <Box>
                 <Typography variant="h2" color="inherit">{t('custom-package.title-package')}</Typography>
                <Typography variant="subtitle1" color="primary">{formatAmountForDisplay(price/100,'usd')} USD  </Typography>
              </Box>
              <Box >
                <Button
                  color="secondary"
                  className="circular-btn"
                  fullWidth
                  disabled={loading || serviceCustom.length === 0}
                  onClick={buy}
                >
                  {t('custom-package.purchase.bttn')}
                </Button>
              </Box>
            </CardContent>
          </Paper>

      </DndContext>
  );
};
