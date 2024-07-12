export interface Post {
  id: number;
  title: string;
  body: string;
}
export interface LogInRequest {
  email: string;
  password: string;
}
export interface LogInResponse {
  data: any;
  token: string;
  message: string;
  user: {
    id: string;
    email: string;
    password: string;
  };
}
export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: {
    email: string;
  };
}
export interface VerifyOTPRequest {
  email: string;
  otp: number;
}
export interface VerifyOTPResponse {
  success: boolean;
  message: string;
  statusCode: number;
}

export interface ResetRequest {
  password: string;
  resetToken: string | null;
}
export interface ResetResponse {
  message: string;
  statusCode: number;
  errorRes: string;
  data: {
    resetToken: string | null;
  };
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}
export interface ChangePasswordResponse {
  statusCode: number;
  message: string;
  errorRes: string;
}

export interface MyProfileRequest {
  id: string;
}
export interface MyProfileResponse {
  data: {
    foundUser: {
      id: string;
      firstName: string;
      lastName: string;
      companyEmail: string;
      contractType: string;
      image: string;
      role: string;
      personalPhone: number;
      workType: string;
      workPhone: string;
      employeeId: string | number;
      departments: Departments[];
      memberId: string | number;
    };
    message: string;
    statusCode: number;
  };
}
export interface Departments {
  id: string;
  name: string;
}
