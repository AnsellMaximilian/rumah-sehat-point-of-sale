import { ToastContainer } from 'react-toastify';
import Modal from 'react-modal';

import './App.css';
import 'react-toastify/dist/ReactToastify.min.css';
import Routes from './routes/index';
import useToastNotification from './hooks/useToastNotification';

Modal.setAppElement('#root');

export default function App() {
  useToastNotification();
  return (
    <>
      <Routes />
      <ToastContainer
        position="bottom-left"
        theme="colored"
        pauseOnHover={false}
      />
    </>
  );
}
