import { Container , Grid} from '@mui/material'
import { EmailTemplate } from 'fleed/components/email-template'
import Layout from 'fleed/components/layouts/Layout'
import React from 'react'

 const Probando = () => {
  return (
    <Layout>
        <Grid container height="100vh">
          <EmailTemplate firstName='juan'/>
        </Grid>
    </Layout>
  )
}


export default Probando