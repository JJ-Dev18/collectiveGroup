import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Benefit, Benefits, IProduct, ItemInterface } from "fleed/interfaces";
import React, { FC ,useEffect} from "react";
import styled from "styled-components";
// import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Button, Card, Stack, Typography } from '@mui/material';
import { inherits } from 'util';
import DoneAllSharpIcon from '@mui/icons-material/DoneAllSharp';
import DoDisturbOnSharpIcon from '@mui/icons-material/DoDisturbOnSharp';
import { CardProduct } from './CardProduct';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useShoppingCart } from 'use-shopping-cart';
const StyledTableCell = styled(TableCell)`


`

const StyledTableRow = styled(TableRow)`
  /* height: 10px; */

`
type Column = {
  benefit : string

}

type Props = {
  products : ItemInterface[]
  columns : Column[],
  handleCheckout : (productToAdd:ItemInterface) => void 
}


export const TableProducts: FC<Props> = ({columns,products,handleCheckout}) => {
  
  const { addItem } = useShoppingCart()
  
  return (
    <TableContainer className='mb-36'>
    <Table  aria-label="customized table">
      <TableHead sx={{border: 'none'}}>
        <TableRow >
        <StyledTableCell align="left" sx={{fontSize:'18px',fontWeight:'700'}}>
           Benefits
        </StyledTableCell>
          {
            products.map( product => (
            <StyledTableCell align="center" > 
                <div className='hidden lg:flex align-center justify-center'>
                <CardProduct product={product} handleCheckout={handleCheckout} />
                </div>
                <div className="lg:hidden">
                   <Paper
                  
                   onClick={()=> addItem(product)}
                   sx={{display:'flex',flexDirection:'column',justifyContent:"center",alignItems:'center'}}>
                    <Typography variant="caption" color="secondary" >
                    {product.name}
                    </Typography>            
                     <ShoppingCartIcon fontSize={'small'} color='secondary' />
                   </Paper>
                </div>
            </StyledTableCell>
            ))
          }
         
        </TableRow>
        <TableRow >

        </TableRow>
      </TableHead>
      <TableBody>
        
        {columns?.map((benefit,index) => (
          <StyledTableRow key={index}  >
            { Object.values(benefit).map( value => (
            <StyledTableCell component="th" scope="row" align={ typeof value === 'string' ? 'left' : 'center'} itemType={ typeof value === 'string' ? 'default' : 'product'}>
                { typeof value === 'string' ? value : (value) ? <DoneAllSharpIcon color='success'/> : <DoDisturbOnSharpIcon color='error'/>}
            </StyledTableCell>
             )) }
        
            
          </StyledTableRow>
        ))}
    
      </TableBody>
    </Table>
  </TableContainer>

  );
};
