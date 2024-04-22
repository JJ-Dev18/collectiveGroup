import { useRouter } from 'next/router';
import {  fireEvent, render, screen } from "@testing-library/react"
import FuseSearch, { Suggestion } from "fleed/components/admin/ui/adminHeader/FuseSearch"
import { Icon } from '@mui/material';


jest.mock('next/router', () => jest.requireActual('next-router-mock'))


describe('Test fuseSearch', () => { 
    
    let navigation : Suggestion[] = [{
        title : "dashboard" ,
        path : '/admin/dashboard' ,
        icon : <Icon/>,
      }] 

    test('Debe ser igual al snapshot', () => {     
         const { container } = render(<FuseSearch navigation={navigation}/>)
         expect(container).toMatchSnapshot()
     })
     test('debe mostrar el input despues de dar click en el boton', () => { 
        render(<FuseSearch navigation={navigation}/>)
        const buttonSearch = screen.getByRole('button',{ name:"Click to search"})
        fireEvent.click(buttonSearch)
       
        const inputSearch =  screen.getByPlaceholderText('Search ...')
        expect(inputSearch).toBeTruthy()
       
     })

     test('debe aparecer no results al escribir una palabra que no encuentre un path', () => { 
      render(<FuseSearch navigation={navigation}/>)
        const buttonSearch = screen.getByRole('button',{ name:"Click to search"})
        fireEvent.click(buttonSearch)

        const inputSearch =  screen.getByPlaceholderText('Search ...')
        fireEvent.input(inputSearch,{ target : { value : 'h' }})
        expect(screen.getByText('No results..'))
         
      })
 })