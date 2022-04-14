import { ToastContainer } from 'react-toastify';

import './App.css';
import 'react-toastify/dist/ReactToastify.min.css';
import Routes from './routes/index';

export default function App() {
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
