import { useMutation, useQuery } from '@tanstack/react-query';
import axiosClient from '../axiosClient';

const fetchPlaceModels = async () => {
  const parsed = await axiosClient.get('places');
  return parsed.data;
};

const usePlaceModels = () =>
  useQuery({
    queryKey: ['places'],
    queryFn: () => fetchPlaceModels()
  });

const fetchPlaceModel = async (placeId) => {
  const parsed = await axiosClient.get(`places/${placeId}`);
  return parsed.data;
};

const useGetPlaceModel = (placeId) =>
  useQuery({
    queryKey: ['places', placeId],
    queryFn: () => fetchPlaceModel(placeId)
  });

const createPlaceModel = async (values) => {
  const response = await axiosClient.post('places', values);
  return response;
};

const useCreatePlaceModel = () => {
  const mutationConfig = {
    mutationFn: (values) => createPlaceModel(values)
  };

  return useMutation(mutationConfig);
};

const updatePlaceModel = async ({ placeId, values }) => {
  const response = await axiosClient.post(`places/${placeId}?_method=PUT`, values);
  return response;
};

const useUpdatePlaceModel = () => {
  const mutationConfig = {
    mutationFn: ({ placeId, values }) => updatePlaceModel({ placeId, values })
  };

  return useMutation(mutationConfig);
};

const deletePlaceModel = async (placeId) => {
  const response = await axiosClient.delete(`places/${placeId}`);
  return response;
};

const useDeletePlaceModel = () => {
  const mutationConfig = {
    mutationFn: (placeId) => deletePlaceModel(placeId)
  };

  return useMutation(mutationConfig);
};

export { useDeletePlaceModel, useUpdatePlaceModel, usePlaceModels, useCreatePlaceModel, useGetPlaceModel };
