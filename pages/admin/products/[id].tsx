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
} from "@mui/material";
import {
  DriveFileRenameOutline,
  SaveOutlined,
  UploadOutlined,
} from "@mui/icons-material";

import { Benefit, Benefits, IProduct } from "fleed/interfaces";
import { dbProducts } from "fleed/db";
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
  product: IProduct;
}

const ProductAdminPage: FC<Props> = ({ product }) => {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
 
  const methods  = useForm<IProduct>({
    defaultValues: product ,
  });
  const { showSuccessAlert , showErrorAlert} = useContext(UiContext)
  const { data: benefits, error: errorBenefits } = useSWR<Benefit[]>(
    `/api/benefits`,
    fetchGetJSON
  );

  // useEffect(() => {
  //   const subscription = methods.watch((value, { name, type }) => {
  //     if (name === "name") {
  //       const newId =
  //         value.name
  //           ?.trim()
  //           .replaceAll(" ", "_")
  //           .replaceAll("'", "")
  //           .toLocaleLowerCase() || "";

  //       methods.setValue("id", Number(newId));
  //     }
  //   });
  //   return () => subscription.unsubscribe();
  // }, [methods.watch, methods.setValue]);

  // useEffect(() => {
  //   const subscription = methods.watch((value, { name, type }) =>
  //     console.log(value, name, type)
  //   )
  //   return () => subscription.unsubscribe()
  // }, [methods.watch])
  
  const onSubmit = async (form: IProduct) => {
    setIsSaving(true);


    console.log(form.id ? "PUT" : "POST")

    try {
      const { data } = await fleedShopApi({
        url: "/admin/products",
        method: form.id ? "PUT" : "POST", // si tenemos un _id, entonces actualizar, si no crear
        data: {
          id : form.id ?  form.id : 1,
          name : form.name,
          brochure : form.brochure,
          price : Number(form.price)  ,
          benefits : form.benefits
        },
      });
      console.log({ data });
      if (!form.id) {
        showSuccessAlert("Product Created Succesfull")
        router.replace(`/admin/products/${form.id}`);
      } else {
 
        showSuccessAlert(data.message)
        setIsSaving(false);
        router.replace(`/admin/products`);

      }
    } catch (error) {
      console.log(error);
      setIsSaving(false);
      showErrorAlert("Error")
    }
  };

  return (
    <AdminLayout title={"Producto"}>
        <FormProvider {...methods}>

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
              label="Precio"
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
              label="Brochure"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...methods.register("brochure", {
                required: "This field is required",
             
              })}
              error={!!methods.formState.errors.brochure}
              helperText={methods.formState.errors.brochure?.message}
            />

          </Grid>

          <Grid item xs={12} sm={12}>
            <MultipleSelect benefits={benefits} productBenefits={product.benefits as Benefit[]}/>
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

  let product;
  if (id === "new") {
    const tempProduct = {
      name: "",
      price: 0,
    };

    product = tempProduct;
  } else {
    product = (await dbProducts.getProductById(Number(id))) ;
  }

  if (!product) {
    return {
      redirect: {
        destination: "/admin/products",
        permanent: false,
      },
    };
  }

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
};

export default ProductAdminPage;
