import { useMutation } from '@tanstack/react-query';
import axiosClient from '../axiosClient';

const login = async (values) => {
  const response = await axiosClient.post('adminlogin/login', values);
  return response;
};

const useLogin = () => {
  const mutationConfig = {
    mutationFn: (values) => login(values)
  };

  return useMutation(mutationConfig);
};

export { useLogin };
