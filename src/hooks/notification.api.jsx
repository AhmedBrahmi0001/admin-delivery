import { useMutation, useQuery } from '@tanstack/react-query';
import axiosClient from '../axiosClient';

const fetchNotificationModels = async () => {
  const parsed = await axiosClient.get('notifications');
  return parsed.data;
};

const useNotificationModels = () =>
  useQuery({
    queryKey: ['notifications'],
    queryFn: () => fetchNotificationModels()
  });

const fetchNotificationModel = async (notificationId) => {
  const parsed = await axiosClient.get(`notifications/${notificationId}`);
  return parsed.data;
};

const useGetNotificationModel = (notificationId) =>
  useQuery({
    queryKey: ['notifications', notificationId],
    queryFn: () => fetchNotificationModel(notificationId)
  });

const createNotificationModel = async (values) => {
  const response = await axiosClient.post('notifications', values);
  return response;
};

const useCreateNotificationModel = () => {
  const mutationConfig = {
    mutationFn: (values) => createNotificationModel(values)
  };

  return useMutation(mutationConfig);
};

const updateNotificationModel = async ({ notificationId, values }) => {
  const response = await axiosClient.post(`notifications/${notificationId}?_method=PUT`, values);
  return response;
};

const useUpdateNotificationModel = () => {
  const mutationConfig = {
    mutationFn: ({ notificationId, values }) => updateNotificationModel({ notificationId, values })
  };

  return useMutation(mutationConfig);
};
//mark a single notification as read
const markNotificationAsRead = async ({ notificationId }) => {
  const response = await axiosClient.post(`notifications/${notificationId}/mark-as-read?_method=PUT`);
  return response.data;
};

const useMarkNotificationAsRead = () => {
  const mutationConfig = {
    mutationFn: ({ notificationId }) => markNotificationAsRead({ notificationId })
  };

  return useMutation(mutationConfig);
};
//mark a single notification as read
const markAllNotificationAsRead = async () => {
  const response = await axiosClient.post('notifications/read-all');
  return response.data;
};

// Corrected useMarkAllNotificationAsRead hook
const useMarkAllNotificationAsRead = () => {
  const mutationConfig = {
    mutationFn: () => markAllNotificationAsRead()
  };
  return useMutation(mutationConfig);
};

const deleteNotificationModel = async (notificationId) => {
  const response = await axiosClient.delete(`notifications/${notificationId}`);
  return response;
};

const useDeleteNotificationModel = () => {
  const mutationConfig = {
    mutationFn: (notificationId) => deleteNotificationModel(notificationId)
  };

  return useMutation(mutationConfig);
};

export {
  useDeleteNotificationModel,
  useUpdateNotificationModel,
  useNotificationModels,
  useCreateNotificationModel,
  useGetNotificationModel,
  useMarkAllNotificationAsRead,
  useMarkNotificationAsRead
};
