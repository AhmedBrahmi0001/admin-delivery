import { useMutation, useQuery } from '@tanstack/react-query';
import axiosClient from '../axiosClient';

const fetchClientModels = async () => {
  const parsed = await axiosClient.get('clients');
  return parsed.data;
};

const useClientModels = () =>
  useQuery({
    queryKey: ['clients'],
    queryFn: () => fetchClientModels()
  });

const fetchClientModel = async (clientId) => {
  const parsed = await axiosClient.get(`clients/${clientId}`);
  return parsed.data;
};

const useGetClientModel = (clientId) =>
  useQuery({
    queryKey: ['clients', clientId],
    queryFn: () => fetchClientModel(clientId)
  });

const createClientModel = async (values) => {
  const response = await axiosClient.post('clients', values);
  return response;
};

const useCreateClientModel = () => {
  const mutationConfig = {
    mutationFn: (values) => createClientModel(values)
  };

  return useMutation(mutationConfig);
};

const updateClientModel = async ({ clientId, values }) => {
  const response = await axiosClient.post(`clients/${clientId}?_method=PUT`, values);
  return response;
};

const useUpdateClientModel = () => {
  const mutationConfig = {
    mutationFn: ({ clientId, values }) => updateClientModel({ clientId, values })
  };

  return useMutation(mutationConfig);
};

const deleteClientModel = async (clientId) => {
  const response = await axiosClient.delete(`clients/${clientId}`);
  return response;
};

const useDeleteClientModel = () => {
  const mutationConfig = {
    mutationFn: (clientId) => deleteClientModel(clientId)
  };

  return useMutation(mutationConfig);
};

export { useDeleteClientModel, useUpdateClientModel, useClientModels, useCreateClientModel, useGetClientModel };
