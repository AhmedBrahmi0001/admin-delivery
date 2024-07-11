import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import AddOrderDialog from './AddOrderDialog';
import EditOrderDialog from './EditOrderDialog';

const initialRows = [
  {
    id: 1,
    name: 'Alcides Antonio',
    email: 'alcides.antonio@devias.io',
    location: 'Madrid, Comunidad de Madrid, Spain',
    phone: '908-691-3242',
    signedUp: 'Jun 28, 2024'
  },
  {
    id: 2,
    name: 'Marcus Finn',
    email: 'marcus.finn@devias.io',
    location: 'Carson City, Nevada, USA',
    phone: '415-907-2647',
    signedUp: 'Jun 28, 2024'
  },
  {
    id: 3,
    name: 'Jie Yan',
    email: 'jie.yan.song@devias.io',
    location: 'North Canton, Ohio, USA',
    phone: '770-635-2682',
    signedUp: 'Jun 28, 2024'
  },
  {
    id: 4,
    name: 'Nasimiyu Danai',
    email: 'nasimiyu.danai@devias.io',
    location: 'Salt Lake City, Utah, USA',
    phone: '801-301-7894',
    signedUp: 'Jun 28, 2024'
  },
  {
    id: 5,
    name: 'Iulia Albu',
    email: 'iulia.albu@devias.io',
    location: 'Murray, Utah, USA',
    phone: '313-812-8947',
    signedUp: 'Jun 28, 2024'
  }
];

function OrderList({ searchText }) {
  const [rows, setRows] = useState(initialRows);
  const [selectionModel, setSelectionModel] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentEditOrder, setCurrentEditOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchText === '') {
      setRows(initialRows);
    } else {
      const filteredRows = initialRows.filter(
        (row) =>
          (row.name && row.name.toLowerCase().includes(searchText.toLowerCase())) ||
          (row.email && row.email.toLowerCase().includes(searchText.toLowerCase())) ||
          (row.location && row.location.toLowerCase().includes(searchText.toLowerCase())) ||
          (row.phone && row.phone.toLowerCase().includes(searchText.toLowerCase()))
      );
      setRows(filteredRows);
    }
  }, [searchText]);

  const handleRowClick = (param, event) => {
    // Check if the checkbox was clicked
    if (event.target.closest('.MuiDataGrid-checkboxInput')) {
      return;
    }
    navigate(`/customer/details/${param.id}`);
  };

  const handleSelectionModelChange = (newSelectionModel) => {
    setSelectionModel(newSelectionModel);
  };

  const handleClickOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  const handleAddOrder = (newOrder) => {
    const newOrderWithId = { ...newOrder, id: rows.length + 1, signedUp: new Date().toLocaleDateString() };
    setRows([...rows, newOrderWithId]);
  };

  const handleEditClick = (order) => {
    setCurrentEditOrder(order);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleEditOrder = (updatedOrder) => {
    setRows(rows.map((row) => (row.id === updatedOrder.id ? updatedOrder : row)));
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 200, editable: false },
    { field: 'email', headerName: 'Email', width: 250, editable: false },
    { field: 'location', headerName: 'Location', width: 200, editable: false },
    { field: 'phone', headerName: 'Phone', width: 150, editable: false },
    { field: 'signedUp', headerName: 'Signed Up', width: 150, editable: false },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Box>
          <IconButton
            color="primary"
            aria-label="edit"
            onClick={(event) => {
              event.stopPropagation();
              handleEditClick(params.row);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="secondary"
            aria-label="delete"
            onClick={(event) => {
              event.stopPropagation();
              // Your delete logic here
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )
    }
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ height: 400, width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2
          }}
        >
          <Typography variant="h4" component="div">
            Customers
          </Typography>
          <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleClickOpenAddDialog}>
            Add
          </Button>
        </Box>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          onRowClick={handleRowClick}
          onSelectionModelChange={handleSelectionModelChange}
          selectionModel={selectionModel}
        />
      </Box>
      <AddOrderDialog open={openAddDialog} handleClose={handleCloseAddDialog} handleAddOrder={handleAddOrder} />
      {currentEditOrder && (
        <EditOrderDialog
          open={openEditDialog}
          handleClose={handleCloseEditDialog}
          order={currentEditOrder}
          handleEditOrder={handleEditOrder}
        />
      )}
    </Box>
  );
}

OrderList.propTypes = {
  searchText: PropTypes.string.isRequired
};

export default OrderList;
