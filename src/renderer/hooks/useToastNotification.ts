import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface Notification {
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
}

const useToastNotification = () => {
  const [notification, setNotification] = useState<Notification>({
    message: '',
    type: 'success',
  });

  useEffect(() => {
    window.electron.ipcRenderer.on('notify', (message, type) => {
      setNotification({ message, type } as Notification);
    });
  }, []);

  useEffect(() => {
    switch (notification.message) {
      case 'success':
        toast.success(notification.message);
        break;
      case 'error':
        toast.error(notification.message);
        break;
      case 'warning':
        toast.warning(notification.message);
        break;
      default:
        toast(notification.message);
        break;
    }
  }, [notification.message]);
};

export default useToastNotification;
