import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Box, Button, IconButton, Paper, Stack } from "@mui/material";
import {
  GridRenderCellParams,
  GridColDef,
  GridValueGetterParams,
} from "@mui/x-data-grid";

import { Link as RouterLink } from "react-router-dom";

import DataTable from "../../components/DataTable";
import PageTitle from "../../components/PageTitle";
import Breadcrumbs from "../../components/Breadcrumbs";

export default function List() {
  const onCall = (params: GridRenderCellParams) => {};
  const onEdit = (params: GridRenderCellParams) => {};
  const onDelete = (params: GridRenderCellParams) => {};

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "firstName",
      headerName: "Nome",
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.fullName.split(" ")?.shift() || ""}`,
    },
    {
      field: "lastName",
      headerName: "Sobrenome",
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.fullName.split(" ")?.pop() || ""}`,
    },
    {
      field: "document",
      headerName: "CPF",
      width: 150,
    },
    {
      field: "age",
      headerName: "Idade",
      type: "number",
      valueGetter: (params: GridValueGetterParams) =>
        params.row.birthDate &&
        `${
          new Date().getFullYear() -
          new Date(params.row.birthDate).getFullYear()
        }`,
    },
    {
      field: "email",
      headerName: "E-mail",
      minWidth: 200,
    },
    {
      field: "mobile",
      headerName: "Celular",
      minWidth: 180,
    },
    {
      field: "actions",
      headerName: "Ações",
      minWidth: 150,
      renderCell: () => (
        <Stack direction="row" spacing={2}>
          <IconButton
            color="success"
            size="small"
            onClick={() => onCall(params)}
          >
            <WhatsAppIcon fontSize="inherit" />
          </IconButton>
          <IconButton color="info" size="small" onClick={() => onEdit(params)}>
            <EditIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            color="error"
            size="small"
            onClick={() => onDelete(params)}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  const users = [
    {
      id: "1",
      fullName: "John Doe",
      document: "123.456.789-10",
      birthDate: new Date(2000, 1, 1),
      email: "johndoe@email.com",
      emailVerified: "true",
      mobile: "(21) 98765-4321",
      zipCode: "12345-678",
      addressName: "Rua Frubbles",
      number: "987",
      complement: "",
      neighborhood: "Bairro Trubbles",
      city: "São Paulo",
      state: "SP",
    },
  ];

  return (
    <>
      <Stack direction={{ xs: "column", sm: "row" }} gap={1} mb={2}>
        <Box sx={{ flexGrow: 1 }}>
          <PageTitle title="Lista" />
          <Breadcrumbs
            path={[{ label: "Usuários", to: "/users" }, { label: "Lista" }]}
          />
        </Box>
        <Box sx={{ alignSelf: "center" }}>
          <Button
            component={RouterLink}
            to="/users/new"
            variant="contained"
            startIcon={<PersonAddAltIcon />}
          >
            Novo Usuário
          </Button>
        </Box>
      </Stack>
      <Paper>
        <DataTable rows={users} columns={columns} />
      </Paper>
    </>
  );
}
