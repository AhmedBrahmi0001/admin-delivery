import { useMutation, useQuery } from '@tanstack/react-query';
import axiosClient from '../axiosClient';

const fetchOrderModels = async () => {
  const parsed = await axiosClient.get('orders');
  return parsed.data;
};

const useOrderModels = () =>
  useQuery({
    queryKey: ['orders'],
    queryFn: () => fetchOrderModels()
  });

const fetchOrderModel = async (orderId) => {
  const parsed = await axiosClient.get(`orders/${orderId}`);
  return parsed.data;
};

const useGetOrderModel = (orderId) =>
  useQuery({
    queryKey: ['orders', orderId],
    queryFn: () => fetchOrderModel(orderId)
  });

const createOrderModel = async (values) => {
  const response = await axiosClient.post('orders', values);
  return response.data;
};

const useCreateOrderModel = () => {
  const mutationConfig = {
    mutationFn: (values) => createOrderModel(values)
  };

  return useMutation(mutationConfig);
};

const updateOrderModel = async ({ orderId, values }) => {
  const response = await axiosClient;
  axiosClient.post(`orders/${orderId}?_method=PUT`, values);
  return response;
};

const useUpdateOrderModel = () => {
  const mutationConfig = {
    mutationFn: ({ orderId, values }) => updateOrderModel({ orderId, values })
  };

  return useMutation(mutationConfig);
};

const deleteOrderModel = async (orderId) => {
  const response = await axiosClient.delete(`orders/${orderId}`);
  return response;
};

const useDeleteOrderModel = () => {
  const mutationConfig = {
    mutationFn: (orderId) => deleteOrderModel(orderId)
  };

  return useMutation(mutationConfig);
};

export { useDeleteOrderModel, useUpdateOrderModel, useOrderModels, useCreateOrderModel, useGetOrderModel };
