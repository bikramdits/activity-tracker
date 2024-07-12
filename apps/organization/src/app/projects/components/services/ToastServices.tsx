// src/services/toastService.ts
import { toast, ToastOptions } from 'react-toastify';

const defaultOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const showToast = (message: string, options: ToastOptions = defaultOptions) => {
  toast(message, options);
};

const showSuccessToast = (message: string, options: ToastOptions = defaultOptions) => {
  toast.success(message, options);
};

const showErrorToast = (message: string, options: ToastOptions = defaultOptions) => {
  toast.error(message, options);
};

const showInfoToast = (message: string, options: ToastOptions = defaultOptions) => {
  toast.info(message, options);
};

const showWarningToast = (message: string, options: ToastOptions = defaultOptions) => {
  toast.warn(message, options);
};

export { showToast, showSuccessToast, showErrorToast, showInfoToast, showWarningToast };
