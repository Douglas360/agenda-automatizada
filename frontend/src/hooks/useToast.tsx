import { toast } from 'react-toastify';

type ToastType = 'success' | 'warning' | 'error';

const useToast = () => {
  const createToast = (msg: string, type: ToastType) => {
    toast[type](msg, {
      autoClose: 3000,
    });
  };

  return createToast;
};

export default useToast;
