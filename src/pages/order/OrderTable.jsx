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
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useDeleteOrderModel, useOrderModels } from '../../hooks/order.api'; // Adjust the import path as needed
import EditOrderDialog from 'pages/order/EditOrderDialog';
import AddOrderDialog from 'pages/order/AddOrderDialog';
import { useQueryClient } from '@tanstack/react-query';

function OrderList({ searchText }) {
  const { data: orders, error, isLoading } = useOrderModels();
  const queryClient = useQueryClient();

  const [rows, setRows] = useState([]);
  const deleteOrderMutation = useDeleteOrderModel();

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentEditOrderId, setCurrentEditOrderId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (orders) {
      setRows(orders.data);
    }
  }, [orders]);

  useEffect(() => {
    if (orders) {
      if (searchText === '') {
        setRows(orders.data);
      } else {
        const filteredRows = orders.data.filter(
          (row) =>
            (row.code && row.code.toLowerCase().includes(searchText.toLowerCase())) ||
            (row.description && row.description.toLowerCase().includes(searchText.toLowerCase())) ||
            (row.pickup_address && row.pickup_address.toLowerCase().includes(searchText.toLowerCase())) ||
            (row.deliver_address && row.deliver_address.toLowerCase().includes(searchText.toLowerCase())) ||
            (row.quantity && row.quantity.toLowerCase().includes(searchText.toLowerCase())) ||
            (row.description && row.description.toLowerCase().includes(searchText.toLowerCase()))
        );
        setRows(filteredRows);
      }
    }
  }, [searchText, orders]);
  if (isLoading) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="body1">Loading...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" color="error">
          Error: {error.message}
        </Typography>
      </Box>
    );
  }

  const handleRowClick = (param, event) => {
    if (event.target.closest('.MuiDataGrid-checkboxInput')) {
      return;
    }
    navigate(`/order/details/${param.id}`);
  };

  const handleSelectionModelChange = (newSelectionModel) => {
    console.log('Selected rows:', newSelectionModel);
  };

  const handleClickOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  const handleAddOrder = (newOrder) => {
    const newOrderWithId = { ...newOrder, id: rows.length + 1 };
    setRows([...rows, newOrderWithId]);
  };

  const handleEditClick = (orderId) => {
    setCurrentEditOrderId(orderId);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };
  const handleDeleteClick = async (orderId) => {
    try {
      await deleteOrderMutation.mutateAsync(orderId);
      queryClient.invalidateQueries();
    } catch (error) {
      console.error('Failed to delete order:', error);
    }
  };
  // Function to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'orange';
      case 'accepted':
        return 'blue';
      case 'ongoing':
        return 'green';
      case 'delivered':
        return 'purple';
      case 'rejected':
        return 'red';
      case 'cancelled':
        return 'gray';
      default:
        return 'gray';
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'code', headerName: 'Order Code', width: 200, editable: false },
    { field: 'delivered_date', headerName: 'Delivered Date', width: 150, editable: false },
    { field: 'pickup_address', headerName: 'Pickup Address', width: 250, editable: false },
    { field: 'deliver_address', headerName: 'Deliver Address', width: 250, editable: false },
    { field: 'quantity', headerName: 'Quantity', width: 150, editable: false },
    { field: 'description', headerName: 'Description', width: 300, editable: false },
    { field: 'price', headerName: 'Price', width: 150, editable: false },
    {
      field: 'etat',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <FiberManualRecordIcon sx={{ color: getStatusColor(params.value), marginRight: 1 }} />
          {params.value}
        </Box>
      )
    },
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
              handleEditClick(params.row?.id);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="secondary"
            aria-label="delete"
            onClick={(event) => {
              event.stopPropagation();
              handleDeleteClick(params.row?.id);
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
            Orders
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
        />
      </Box>
      <AddOrderDialog open={openAddDialog} handleClose={handleCloseAddDialog} handleAddOrder={handleAddOrder} />
      {currentEditOrderId && <EditOrderDialog open={openEditDialog} handleClose={handleCloseEditDialog} orderId={currentEditOrderId} />}
    </Box>
  );
}

OrderList.propTypes = {
  searchText: PropTypes.string.isRequired
};

export default OrderList;
