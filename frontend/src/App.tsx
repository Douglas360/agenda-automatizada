import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Loader from './common/Loader';
import { AppRouter } from './routes';
import 'devextreme/dist/css/dx.light.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <AppRouter />
      <ToastContainer />
    </>
  );
}

export default App;
