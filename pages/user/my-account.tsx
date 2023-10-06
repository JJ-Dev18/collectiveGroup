import UserLayout from 'fleed/components/layouts/UserLayout'
import React, { useContext,useState } from 'react'
import { Divider, CardContent, CardHeader, Avatar, Grid, Stack, FormControl, InputLabel, Input, FormHelperText, TextField, Button } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useForm } from 'react-hook-form';
import { AuthContext } from 'fleed/context/auth';
import { IUser } from 'fleed/interfaces';
import fleedShopApi from 'fleed/api/fleedShopApi';
import { UiContext } from 'fleed/context/ui';
import { useTranslation } from 'next-i18next'

const drawerWidth = 240;

type FormData = {
  name : string | undefined,
  email : string | undefined, 
  password? : string  | undefined,
  
}

const MyAccount = () => {
 
  const { user } = useContext(AuthContext)
  const {  t  } = useTranslation("common")
  const { showSuccessAlert,showErrorAlert } =useContext(UiContext)
   const methods = useForm({
    defaultValues :{ name : user?.name, email : user?.email , password : ''},values  : user
   }) 
   const [disabledEmail, setdisabledEmail] = useState(true) 
   const [disabledPassword, setdisabledPassword] = useState(true)
   const [loading, setLoading] = useState(false)

   const onChangeUser = async  (data:FormData) => {
   setLoading(true)
   try {
    const resp = await fleedShopApi.put('/user',{
      name : data.name,
      id : user?.id,
      email : !disabledEmail ?  data.email : undefined,
      password : !disabledPassword ? data.password : undefined

    })
    showSuccessAlert("Update succesfull")
    setLoading(false)
   } catch (error) {
     console.log(error)
   }
  }

  return (
    <UserLayout title='User Account'>
        <CardHeader
          sx={{textAlign:'left'}}
          action={
            <IconButton aria-label="">
              
            </IconButton>
          }
          title={t('account.user.title')}
          subheader={t('account.user.subtitle')}
          
        />
        <Divider/>
        <CardContent sx={{}}>
        
            <Grid container spacing={2}>
               <Grid  item xs={12}>
               <form onSubmit={methods.handleSubmit(onChangeUser)} noValidate style={{width: '100%'}}>
                <Grid container spacing={2} >
                    <Grid item xs={12} alignItems="center" display="flex">
               <FormControl fullWidth>
                {/* <InputLabel htmlFor="my-input">Name</InputLabel> */}
                <TextField id="my-input" aria-describedby="my-helper-text" defaultValue={user?.name} fullWidth  {...methods.register("name")} label={t('account.user.name')}/>
                {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
                </FormControl>
                    </Grid>
                    <Grid item xs={12}  display="flex">
                <FormControl fullWidth >
                {/* <InputLabel htmlFor="my-input">Email address</InputLabel> */}
                <TextField id="my-input" aria-describedby="my-helper-text"  
                 disabled={disabledEmail}
                 {...methods.register("email")} label={t('account.user.email')}/>
                </FormControl>
                  <Button variant="text" color="inherit" onClick={()=> setdisabledEmail(!disabledEmail)}>
                  {disabledEmail ? t('account.user.bttn-change') : t('account.user.bttn-cancel')}
                  </Button>
                    </Grid>
                    <Grid item xs={12} display="flex">
                <FormControl fullWidth>
                <TextField  type='password' id="my-input" aria-describedby="my-helper-text" label={t('account.user.password')}
                 disabled={disabledPassword}
                {...methods.register("password")}/>
                </FormControl>
                 <Button variant="text" color="inherit" onClick={()=> setdisabledPassword(!disabledPassword)}>
                     {disabledPassword ? t('account.user.bttn-change') : t('account.user.bttn-cancel')}
                  </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Button variant="outlined" color="primary" type='submit' disabled={loading}>
                      {   t('account.user.bttn-save')}
                      </Button> 
                    </Grid>
                   
                </Grid>
                
               </form>
               </Grid>
               <Grid  item xs={12}>
                 
               </Grid>
            </Grid>

        </CardContent>
    </UserLayout>
  )
}

export default MyAccount

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticProps,InferGetStaticPropsType ,InferGetServerSidePropsType } from 'next'

export const getStaticProps:GetStaticProps = async ({ locale }) => {

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'common',
       
      ])),
      // Will be passed to the page component as props
    },
  }
}