import { ChangeEvent, FC, useContext, useEffect, useRef, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";

import {
  Box,
  Button,

  Divider,
  MenuItem,
  Select,
  Grid,

  TextField,
  Typography,
} from "@mui/material";
import {
  DriveFileRenameOutline,
  SaveOutlined,
  UploadOutlined,
} from "@mui/icons-material";

import { Benefit, Benefits, IProduct, IUser } from "fleed/interfaces";
import { dbProducts, dbUsers } from "fleed/db";
import AdminLayout from "fleed/components/layouts/AdminLayout";
import fleedShopApi from "fleed/api/fleedShopApi";
import MultipleSelect from "fleed/components/admin/ui/multipleSelect/MultipleSelect";
import useSWR from "swr";
import { fetchGetJSON } from "fleed/utils/api-helpers";
import { UiContext } from "fleed/context/ui";

const validTypes = ["shirts", "pants", "hoodies", "hats"];
const validGender = ["men", "women", "kid", "unisex"];
const validSizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

interface FormData {
  id?: number;
  name: string;
  price: number;
  brochure? : string;
  benefits: Benefit[];
}

interface Props {
  user: IUser;
}

const ProductAdminPage: FC<Props> = ({ user }) => {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [role, setrole] = useState(user.role)
  const methods  = useForm<IUser>({
    defaultValues: user ,
  });
  const { showSuccessAlert , showErrorAlert} = useContext(UiContext)
 

  const onRoleUpdated = async (userId: number, newRole: string) => {
    

      setrole(newRole)
    //success
    // try {
    //   const resp =   await fleedShopApi.put("/admin/users", { userId, role: newRole });
    //   console.log(resp)
    //   showSuccessAlert(resp.data.message)
    // } catch (error) {
    //   console.log(error,"error");
    //   showErrorAlert("error")
    // }
  };
  
  const onSubmit = async (form: IUser) => {
    setIsSaving(true);


    console.log(form.id ? "PUT" : "POST")

    try {
      const { data } = await fleedShopApi({
        url: "/admin/users",
        method: form.id ? "PUT" : "POST", // si tenemos un _id, entonces actualizar, si no crear
        data: {
          id : form.id ?  form.id : 1,
          name : form.name,
          role : form.role,
          email : form.email
         
        },
      });
      console.log({ data });
      if (!form.id) {
        showSuccessAlert("User Created Succesfull")
        router.replace(`/admin/users/${form.id}`);
      } else {
 
        showSuccessAlert(data.message)
        setIsSaving(false);
        router.replace(`/admin/users`);

      }
    } catch (error) {
      console.log(error);
      setIsSaving(false);
      showErrorAlert("Error")
    }
  };

  return (
    <AdminLayout title={`User ${user.email}`}>
        <FormProvider {...methods}>
        <Typography    variant="h1"  textAlign="center">
           {user.id ? 'Edit User' : 'Create User'}
        </Typography>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Box display="flex" justifyContent="end" sx={{ mb: 1 }}>

          <Button
            color="primary"
            startIcon={<SaveOutlined />}
            sx={{ width: "150px" }}
            type="submit"
            disabled={isSaving}
          >

            Guardar

          </Button>
        </Box>

        <Grid container spacing={2}>
          {/* Data */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...methods.register("name", {
                required: "This field is required",
                minLength: { value: 2, message: "Min" },
              })}
              error={!!methods.formState.errors.name}
              helperText={methods.formState.errors.name?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...methods.register("email", {
                required: "This field is required",
               
              })}
              error={!!methods.formState.errors.email}
              helperText={methods.formState.errors.email?.message}
            />

          </Grid>
          <Grid item xs={12}>
          <Select
            {...methods.register("role", {
                required: "This field is required",
            
            })}
            value={role}
            label="Rol"
            onChange={({ target }) =>  onRoleUpdated( user.id, target.value )}
            sx={{ width: "300px" }}
          >
            <MenuItem value="ADMIN"> Admin </MenuItem>
            <MenuItem value="USER"> Client </MenuItem>
          
          </Select>

          </Grid>

          <Divider sx={{ my: 2 }} />
        </Grid>
      </form>
        </FormProvider>
    </AdminLayout>
  );
};


export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id = "" } = query;

 
  let user = (await dbUsers.getUserById(Number(id))) ;
  

  

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    },
  };
};

export default ProductAdminPage;
