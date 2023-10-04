import { ChangeEvent, FC, useContext, useEffect, useRef, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";

import {
  Box,
  Button,
  capitalize,
  Card,
  CardActions,
  CardMedia,
  Checkbox,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  ListItem,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import {
  DriveFileRenameOutline,
  SaveOutlined,
  UploadOutlined,
} from "@mui/icons-material";

import { Benefit, Benefits, IPackage, IProduct, IService, Services } from "fleed/interfaces";
import { dbPackages, dbProducts } from "fleed/db";
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
  description? : string;
  services: Services[];
}

interface Props {
  packaged: IPackage;
}

const ProductAdminPage: FC<Props> = ({ packaged }) => {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
 
  const methods  = useForm<IPackage>({
    defaultValues: packaged ,
  });
  const { showSuccessAlert , showErrorAlert} = useContext(UiContext)
  const { data: services, error: errorBenefits } = useSWR<Benefit[]>(
    `/api/services`,
    fetchGetJSON
  );

  
  
  const onSubmit = async (form: IPackage) => {
    setIsSaving(true);


    console.log(form.id ? "PUT" : "POST")

    try {
      const { data } = await fleedShopApi({
        url: "/admin/packages",
        method: form.id ? "PUT" : "POST", // si tenemos un _id, entonces actualizar, si no crear
        data: {
          id : form.id ?  form.id : 1,
          name : form.name,
          description : form.description,
          price : Number(form.price)  ,
          services : form.services
        },
      });
      console.log({ data });
      if (!form.id) {
        showSuccessAlert("Package Created Succesfull")
        router.replace(`/admin/packages/${form.id}`);
      } else {
 
        showSuccessAlert(data.message)
        setIsSaving(false);
        router.replace(`/admin/packages`);

      }
    } catch (error) {
      console.log(error);
      setIsSaving(false);
      showErrorAlert("Error")
    }
  };

  return (
    <AdminLayout title={"Packages"}>
        <FormProvider {...methods}>
        <Typography variant="h1"  textAlign="center">
           {packaged.id ? 'Edit Package' : 'Create Package'}
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
              label="Price"
              type="number"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...methods.register("price", {
                required: "This field is required",
                min: { value: 0, message: "Min value 0" },
              })}
              error={!!methods.formState.errors.price}
              helperText={methods.formState.errors.price?.message}
            />

          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Description"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...methods.register("description", {
                required: "This field is required",
             
              })}
              error={!!methods.formState.errors.description}
              helperText={methods.formState.errors.description?.message}
            />

          </Grid>

          <Grid item xs={12} sm={12}>
            <MultipleSelect list={services} itemList={packaged.services as IService[]} name="Services"/>
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

  let packaged;
  if (id === "new") {
    const temPackaged = {
      name: "",
      price: 0,
    };

    packaged = temPackaged;
  } else {
    packaged = (await dbPackages.getPackageById(Number(id))) ;
  }

  if (!packaged) {
    return {
      redirect: {
        destination: "/admin/packages",
        permanent: false,
      },
    };
  }

  return {
    props: {
      packaged: JSON.parse(JSON.stringify(packaged)),
    },
  };
};

export default ProductAdminPage;
