import { useMutation, useQuery } from '@tanstack/react-query';
import axiosClient from '../axiosClient';

const fetchComplaintModels = async () => {
  const parsed = await axiosClient.get('complaints');
  return parsed.data;
};

const useComplaintModels = () =>
  useQuery({
    queryKey: ['complaints'],
    queryFn: () => fetchComplaintModels()
  });

const fetchComplaintModel = async (complaintId) => {
  const parsed = await axiosClient.get(`complaints/${complaintId}`);
  return parsed.data;
};

const useGetComplaintModel = (complaintId) =>
  useQuery({
    queryKey: ['complaints', complaintId],
    queryFn: () => fetchComplaintModel(complaintId)
  });

const createComplaintModel = async (values) => {
  const response = await axiosClient.post('complaints', values);
  return response;
};

const useCreateComplaintModel = () => {
  const mutationConfig = {
    mutationFn: (values) => createComplaintModel(values)
  };

  return useMutation(mutationConfig);
};

const updateComplaintModel = async ({ complaintId, values }) => {
  const response = await axiosClient.post(`complaints/${complaintId}?_method=PUT`, values);
  return response;
};

const useUpdateComplaintModel = () => {
  const mutationConfig = {
    mutationFn: ({ complaintId, values }) => updateComplaintModel({ complaintId, values })
  };

  return useMutation(mutationConfig);
};

const deleteComplaintModel = async (complaintId) => {
  const response = await axiosClient.delete(`complaints/${complaintId}`);
  return response;
};

const useDeleteComplaintModel = () => {
  const mutationConfig = {
    mutationFn: (complaintId) => deleteComplaintModel(complaintId)
  };

  return useMutation(mutationConfig);
};

export { useDeleteComplaintModel, useUpdateComplaintModel, useComplaintModels, useCreateComplaintModel, useGetComplaintModel };
