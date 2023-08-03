import { FC } from 'react';
import Head from 'next/head';
import { Box } from '@mui/material';
import DarkModeToggle from '../DarkModeToggle';


interface Props {
    title: string;
    children : React.ReactNode
}

export const AuthLayout: FC<Props> = ({ children, title  }) => {
  return (
    <>
        <Head>
            <title>{ title }</title>
        </Head>

        <main>
            <DarkModeToggle/>
            <Box display='flex' justifyContent='center' alignItems='center' height="calc(100vh - 200px)">   
                { children }
            </Box>
        </main>
    
    </>
  )
}