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
import { Button, Card, Stack } from '@mui/material';
import { inherits } from 'util';
import DoneAllSharpIcon from '@mui/icons-material/DoneAllSharp';
import DoDisturbOnSharpIcon from '@mui/icons-material/DoDisturbOnSharp';

const StyledTableCell = styled(TableCell)`

`

const StyledTableRow = styled(TableRow)`
  /* height: 10px; */

`
type Column = {
  benefit : string

}

type Props = {
  products : IProduct[]
  columns : Column[]
}


export const TableProducts: FC<Props> = ({columns,products}) => {
  
  const buyNow:React.MouseEventHandler<HTMLButtonElement> = async (event) => {
  //   clearCart()
  //  //  addItem(packageToAdd)
  //   handleCheckout(packageToAdd)
 }
  
  return (
    <TableContainer className='mb-10'>
    <Table  aria-label="customized table">
      <TableHead sx={{border: 'none'}}>
        <TableRow >
        <StyledTableCell align="left" sx={{fontSize:'18px',fontWeight:'700'}}>
           Benefits
        </StyledTableCell>
          {
            products.map( product => (
              <StyledTableCell align="center"> 
               <Paper>
              {product.name}

               </Paper>
            </StyledTableCell>
            ))
          }
         
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
