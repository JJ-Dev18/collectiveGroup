import React, { useState, useEffect, useContext } from "react";
import { Grid, Container, Typography, Select, MenuItem,Link, Avatar } from "@mui/material";
import fleedShopApi from "fleed/api/fleedShopApi";
import useSWR from "swr";
import { IUser } from "fleed/interfaces";
import { GridActionsCellItem, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import AdminLayout from "fleed/components/layouts/AdminLayout";
import { fetchGetJSON } from "fleed/utils/api-helpers";
import { UiContext } from "fleed/context/ui";
import DeleteIcon from '@mui/icons-material/Delete';
import NextLink from 'next/link';
import { stringAvatar } from "fleed/utils/avatar";
import { DataGridCustom } from "fleed/components/admin/ui/datagrid/DataGridCustom";

const Users = () => {


  const { data, error, isLoading } = useSWR<IUser[]>("/api/admin/users", fetchGetJSON);

  const [users, setUsers] = useState<IUser[]>([]);

  const {  showErrorAlert, showSuccessAlert} = useContext(UiContext)

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

 
  const deleteUser = async ( userId: number) => {
    const previosUsers = users.map((user) => ({ ...user }));
    const newUsers = users.filter(user => user.id != userId)
    
    
    try {
        const data = await fleedShopApi.delete("/admin/users", {data:{
            id: userId
        } })
        if(data.data.error){
          showErrorAlert(data.data.error)
        }else{
          showSuccessAlert(data.data.message)
          setUsers(newUsers)
        }
    } catch (error) {
        setUsers(previosUsers);
        console.log(error)
        showErrorAlert("Internal server Error")
    } 

   
  }

  const onRoleUpdated = async (userId: number, newRole: string) => {
    const previosUsers = users.map((user) => ({ ...user }));
    const updatedUsers = users.map((user) => ({
      ...user,
      role: userId === user.id ? newRole : user.role,
    }));
    const user = users.find( user => user.id === userId)

    setUsers(updatedUsers);
    //success
    try {
      if(user){
        const resp =   await fleedShopApi.put("/admin/users", { id : userId, role: newRole, name : user.name, email : user.email });
        showSuccessAlert(resp.data.message)
      }
    } catch (error) {
      setUsers(previosUsers);
      // console.log(error)
      showErrorAlert("error")
    }
  };

  const columns: GridColDef[] = [
    { field: "image", headerName: "Avatar",
    renderCell: ({row}: GridRenderCellParams<any, number>) => {
     
      return (
          <>
              {!row?.image ? <Avatar alt="Remy Sharp"  {...stringAvatar(row?.name || 'New Client')} /> : <Avatar alt="Remy Sharp"  src={row.image}/>}
          </>
      )
  } },
    { field: "email", headerName: "Email", width: 250 },
    { field: "name", headerName: "FullName",
    renderCell: ({row}: GridRenderCellParams<any, number>) => {
      return (
          <NextLink href={`/admin/users/${ row.id }`} passHref>
              <Link underline='always'>
                  { row.name}
              </Link>
          </NextLink>
      )
  } },
   
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
                color="error"
              />
            )
        }
      },
  ];

  const rows = users.map((user) => ({
    id: user.id,
    image : user.image,
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
          <DataGridCustom
            isLoading={isLoading}
            rows={rows}
            columns={columns}
            // paginationModel={{ page: 1 , pageSize: 10 }}
            // pageSizeOptions={[10]}
          />
        </Grid>
      </Grid>
    </Container>
    </AdminLayout>
  );
};

export default Users;
