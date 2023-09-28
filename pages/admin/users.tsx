import React, { useState, useEffect, useContext } from "react";
import { Grid, Container, Typography, Select, MenuItem } from "@mui/material";
import fleedShopApi from "fleed/api/fleedShopApi";
import useSWR from "swr";
import { PeopleOutline } from "@mui/icons-material";
import { IUser } from "fleed/interfaces";
import { DataGrid, GridActionsCellItem, GridColDef, GridRenderCellParams, GridValueGetterParams } from "@mui/x-data-grid";
import AdminLayout from "fleed/components/layouts/AdminLayout";
import { fetchGetJSON } from "fleed/utils/api-helpers";
import { UiContext } from "fleed/context/ui";
import DeleteIcon from '@mui/icons-material/Delete';

const users = () => {


  const { data, error } = useSWR<IUser[]>("/api/admin/users", fetchGetJSON);

  const [users, setUsers] = useState<IUser[]>([]);

  const {  showErrorAlert, showSuccessAlert} = useContext(UiContext)

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);
  console.log(users,"Data")
//   if (!data && !error) return <></>;
 
  const deleteUser = async ( userId: number) => {
    const previosUsers = users.map((user) => ({ ...user }));
    const newUsers = users.filter(user => user.id != userId)
    setUsers(newUsers)
    console.log(userId, " id del user ")
    try {
        const data = await fleedShopApi.delete("/admin/users", {data:{
            id: userId
        } })
        showSuccessAlert(data.data.message)
    } catch (error) {
        setUsers(previosUsers);
        console.log(error,"error");
        showErrorAlert("error")
    } 

   
  }

  const onRoleUpdated = async (userId: number, newRole: string) => {
    const previosUsers = users.map((user) => ({ ...user }));
    const updatedUsers = users.map((user) => ({
      ...user,
      role: userId === user.id ? newRole : user.role,
    }));

    setUsers(updatedUsers);
    //success
    try {
      const resp =   await fleedShopApi.put("/admin/users", { userId, role: newRole });
      console.log(resp)
      showSuccessAlert(resp.data.message)
    } catch (error) {
      setUsers(previosUsers);
      console.log(error,"error");
      showErrorAlert("error")
    }
  };

  const columns: GridColDef[] = [
    { field: "email", headerName: "Email", width: 250 },
    { field: "name", headerName: "FullName", width: 200 },
    {
      field: "role",
      headerName: "Role",
      width: 300,
      renderCell: ({ row }: GridRenderCellParams<any, number>) => {
        return (
          <Select
            value={row.role}
            label="Rol"
            onChange={({ target }) =>  onRoleUpdated( row.id, target.value )}
            sx={{ width: "300px" }}
          >
            <MenuItem value="ADMIN"> Admin </MenuItem>
            <MenuItem value="USER"> Client </MenuItem>
          
          </Select>
        );
      },
    },
    {
        field: 'actions',
        // type: 'actions',
        headerName: 'Actions',
        width: 100,
        cellClassName: 'actions',
        renderCell: ({ row }: GridRenderCellParams<any, number>) => {
            return(
                <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                onClick={()=> deleteUser(Number(row.id))}
                color="inherit"
              />
            )
        }
      },
  ];

  const rows = users.map((user) => ({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  }));

  return (
    <AdminLayout title="users">
        <Typography variant="h4" sx={{mb:3}}  textAlign="center">
          Users
        </Typography>
    <Container maxWidth="xl" sx={{ overflowX: "hidden" }}>
      <Grid container >
        <Grid item xs={12} sx={{ height: 'auto', width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            // paginationModel={{ page: 1 , pageSize: 10 }}
            pageSizeOptions={[10]}
          />
        </Grid>
      </Grid>
    </Container>
    </AdminLayout>
  );
};

export default users;
