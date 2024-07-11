import { useMutation, useQuery } from '@tanstack/react-query';
import axiosClient from '../axiosClient';

const fetchDriverModels = async () => {
  const response = await axiosClient.get('drivers');
  return response.data;
};

const useDriverModels = () =>
  useQuery({
    queryKey: ['drivers'],
    queryFn: () => fetchDriverModels()
  });

const fetchDriverModel = async (driverId) => {
  const parsed = await axiosClient.get(`drivers/${driverId}`);
  return parsed.data;
};

const useGetDriverModel = (driverId) =>
  useQuery({
    queryKey: ['drivers', driverId],
    queryFn: () => fetchDriverModel(driverId)
  });

const createDriverModel = async (values) => {
  const response = await axiosClient.post('drivers', values);
  return response;
};

const useCreateDriverModel = () => {
  const mutationConfig = {
    mutationFn: (values) => createDriverModel(values)
  };

  return useMutation(mutationConfig);
};

const updateDriverModel = async ({ driverId, values }) => {
  const response = await axiosClient.post(`drivers/${driverId}?_method=PUT`, values);
  return response;
};

const useUpdateDriverModel = () => {
  const mutationConfig = {
    mutationFn: ({ driverId, values }) => updateDriverModel({ driverId, values })
  };

  return useMutation(mutationConfig);
};

const deleteDriverModel = async (driverId) => {
  const response = await axiosClient.delete(`drivers/${driverId}`);
  return response;
};

const useDeleteDriverModel = () => {
  const mutationConfig = {
    mutationFn: (driverId) => deleteDriverModel(driverId)
  };

  return useMutation(mutationConfig);
};

export { useDeleteDriverModel, useUpdateDriverModel, useDriverModels, useCreateDriverModel, useGetDriverModel };
