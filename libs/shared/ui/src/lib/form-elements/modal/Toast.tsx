import { toast, ToastOptions } from 'react-toastify';

const defaultOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,

  progress: undefined,
};

const showToast = (
  message: string,
  type: 'success' | 'error' | 'info' | 'warning',
  options: ToastOptions = {}
) => {
  const toastOptions: ToastOptions = { ...defaultOptions, ...options };

  switch (type) {
    case 'success':
      toast.success(message, toastOptions);
      break;
    case 'error':
      toast.error(message, toastOptions);
      break;
    case 'info':
      toast.info(message, toastOptions);
      break;
    case 'warning':
      toast.warn(message, toastOptions);
      break;
    default:
      toast(message, toastOptions);
      break;
  }
};

export default showToast;
