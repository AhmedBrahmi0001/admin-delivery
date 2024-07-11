import { useMutation, useQuery } from '@tanstack/react-query';
import axiosClient from '../axiosClient';

const fetchEvaluationModels = async () => {
  const parsed = await axiosClient.get('evaluations');
  return parsed.data;
};

const useEvaluationModels = () =>
  useQuery({
    queryKey: ['evaluations'],
    queryFn: () => fetchEvaluationModels()
  });

const fetchEvaluationModel = async (evaluationId) => {
  const parsed = await axiosClient.get(`evaluations/${evaluationId}`);
  return parsed.data;
};

const useGetEvaluationModel = (evaluationId) =>
  useQuery({
    queryKey: ['evaluations', evaluationId],
    queryFn: () => fetchEvaluationModel(evaluationId)
  });

const createEvaluationModel = async (values) => {
  const response = await axiosClient.post('evaluations', values);
  return response.data;
};

const useCreateEvaluationModel = () => {
  const mutationConfig = {
    mutationFn: (values) => createEvaluationModel(values)
  };

  return useMutation(mutationConfig);
};

const updateEvaluationModel = async ({ evaluationId, values }) => {
  const response = await axiosClient.post(`evaluations/${evaluationId}?_method=PUT`, values);
  return response;
};

const useUpdateEvaluationModel = () => {
  const mutationConfig = {
    mutationFn: ({ evaluationId, values }) => updateEvaluationModel({ evaluationId, values })
  };

  return useMutation(mutationConfig);
};

const deleteEvaluationModel = async (evaluationId) => {
  const response = await axiosClient.delete(`evaluations/${evaluationId}`);
  return response;
};

const useDeleteEvaluationModel = () => {
  const mutationConfig = {
    mutationFn: (evaluationId) => deleteEvaluationModel(evaluationId)
  };

  return useMutation(mutationConfig);
};

export { useDeleteEvaluationModel, useUpdateEvaluationModel, useEvaluationModels, useCreateEvaluationModel, useGetEvaluationModel };
