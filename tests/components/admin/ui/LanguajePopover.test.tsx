import { useRouter } from 'next/router';
import { fireEvent, render, screen } from "@testing-library/react"
import LanguagePopover from "fleed/components/admin/ui/adminHeader/LanguagePopover"
import {  UiContext } from "fleed/context/ui"
import { initialSatetUiContext } from "./utils/getInitialStateUiContext"
import { useContext } from 'react';

jest.mock('next/router', () => jest.requireActual('next-router-mock'))


describe('Pruebas en el languagePopover', () => { 

    test('Debe mostrar la imagen de estados unidos por defecto ', () => { 
        render(

            <UiContext.Provider value={initialSatetUiContext }>
               <LanguagePopover/>
            </UiContext.Provider>
        )
        expect(screen.getByRole<HTMLImageElement>('img').src).toContain('/flags/US.svg')

     })

     test('Al dar click a la imagen debe mostrarse el popup', () => { 
        render(

            <UiContext.Provider value={initialSatetUiContext }>
               <LanguagePopover/>
            </UiContext.Provider>
        )
        let img = screen.getByRole<HTMLImageElement>('img') 
        fireEvent.click(img)
        let popup = screen.getByRole('presentation')
        expect(popup).toBeTruthy()
      })

      test('Al dar click en la imagen espanol debe cambiar el languaje', () => { 
        render(

            <UiContext.Provider value={initialSatetUiContext }>
               <LanguagePopover/>
            </UiContext.Provider>
        ) 
        let img = screen.getByRole<HTMLImageElement>('img') 
        fireEvent.click(img)
        let imgSpanish = screen.getByRole('img',{name :"Spanish"})
        fireEvent.click(imgSpanish)
        expect(initialSatetUiContext.setLanguage).toHaveBeenCalled()
       })
 })