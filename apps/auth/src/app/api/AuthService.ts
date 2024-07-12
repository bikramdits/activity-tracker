import { ENDPOINTS, post, patch, get } from '@appname/service';
import {
  ChangePasswordRequest,
  ChangePasswordResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LogInRequest,
  LogInResponse,
  MyProfileResponse,
  ResetRequest,
  ResetResponse,
  VerifyOTPRequest,
  VerifyOTPResponse,
} from '../types/authTypes';
export const onLogin = (credentials: LogInRequest): Promise<LogInResponse> => {
  return post<LogInResponse, LogInRequest>(ENDPOINTS.login, credentials);
};

export const OnForgotPassword = (
  email: string
): Promise<ForgotPasswordResponse> => {
  const requestData: ForgotPasswordRequest = { email };
  return post<ForgotPasswordResponse, ForgotPasswordRequest>(
    ENDPOINTS.forgotPassword,
    requestData
  );
};

export const OnVerifyEmail = (  
  email: string,
  otp: number
): Promise<VerifyOTPResponse> => {
  const requestVerifyEmail: VerifyOTPRequest = { email, otp };
  return post<VerifyOTPResponse, VerifyOTPRequest>(
    ENDPOINTS.verify,
    requestVerifyEmail
  );
};

export const onReset = (
  password: string,
  resetToken: string | null
): Promise<ResetResponse> => {
  const requestReset: ResetRequest = { password, resetToken };
  return post<ResetResponse, ResetRequest>(ENDPOINTS.reset, requestReset);
};

export const onChangePassword = (
  oldPassword: string,
  newPassword: string
): Promise<ChangePasswordResponse> => {
  const requestChangePassword: ChangePasswordRequest = {
    oldPassword,
    newPassword,
  };
  return patch<ChangePasswordResponse, ChangePasswordRequest>(
    ENDPOINTS.changePassword,
    requestChangePassword
  );
};

export const OnLogout = (): Promise<void> => {
  return post(ENDPOINTS.logout, {});
};

export const OnMyProfile = (
  id: string | undefined
): Promise<MyProfileResponse> => {
  return get<MyProfileResponse>(`${ENDPOINTS.getUserbyId(id as string)}`);
};
