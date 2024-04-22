import { useRouter } from 'next/router';
import { render, screen, fireEvent } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import AccountPopover from 'fleed/components/admin/ui/adminHeader/AccountPopover';

jest.mock('next/router', () => jest.requireActual('next-router-mock'))



describe('Pruebas con el accountpopover', () => {
  const logout = jest.fn()
  
  test('Debe ser igual al snapshot', () => {
   const { container  } =  render(<AccountPopover logout={logout} />);
   expect(container).toMatchSnapshot()
   
  });

  test('debe abrir el menu al dar click', () => { 
    render(<AccountPopover logout={logout} />);
    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByText('Home'))
    expect(screen.getByText('Logout'))

    screen.debug()
   })

   test('se debe llamar la funcion logout al dar click', () => { 
    render(<AccountPopover logout={logout} />);
    fireEvent.click(screen.getByRole('button'))
    fireEvent.click(screen.getByRole('menuitem',{ name : 'Logout'}))
    expect(logout).toHaveBeenCalled()
    })


});