import { useMutation, useQuery } from '@tanstack/react-query';
import {
  ChangePasswordRequest,
  ForgotPasswordRequest,
  LogInRequest,
  LogInResponse,
  MyProfileResponse,
  ResetRequest,
  VerifyOTPRequest,
} from '../types/authTypes';
import {
  OnForgotPassword,
  OnLogout,
  OnMyProfile,
  OnVerifyEmail,
  onChangePassword,
  onLogin,
  onReset,
} from '../api/AuthService';
import { removeItemLS, setLS } from '../utils/helpers';
import { queryKeys } from '@appname/service';
export const useLogin = () => {
  return useMutation<LogInResponse, Error, LogInRequest>({
    mutationKey: [queryKeys.login],
    mutationFn: (credentials: LogInRequest) => {
      return onLogin(credentials);
    },
    onSuccess: (data: LogInResponse) => {
      if (data && data?.data.token && data?.data.user && data?.data.user.id) {
        setLS('accessToken', data?.data.token);
        setLS('userId', data?.data?.user.id);
      } else {
        console.error('Login failed: Token or userId is missing');
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationKey: [queryKeys.forgotPassword],
    mutationFn: (response: ForgotPasswordRequest) => {
      return OnForgotPassword(response.email);
    },
  });
};
export const useVerifyEmail = () => {
  return useMutation({
    mutationKey: [queryKeys.verify],
    mutationFn: (response: VerifyOTPRequest) => {
      return OnVerifyEmail(response.email, response.otp);
    },
  });
};
export const useReset = () => {
  return useMutation({
    mutationKey: [queryKeys.reset],
    mutationFn: (response: ResetRequest) => {
      return onReset(response.password, response.resetToken);
    },
  });
};
export const useChangePassword = () => {
  return useMutation({
    mutationKey: [queryKeys.changePassword],
    mutationFn: (response: ChangePasswordRequest) => {
      return onChangePassword(response.oldPassword, response.newPassword);
    },
  });
};
export const useLogout = () => {
  return useMutation({
    mutationKey: [queryKeys.logout],
    mutationFn: () => OnLogout(),
    onSuccess: (data) => {
      const res = localStorage.getItem('accessToken');
      removeItemLS('accessToken');
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useMyProfile = (id: string) => {
  return useQuery<MyProfileResponse>({
    queryKey: [queryKeys.myProfile],
    queryFn: () => OnMyProfile(id),
  });
};
