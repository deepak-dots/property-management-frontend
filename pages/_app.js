// pages/_app.js
import '../styles/globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { AuthProvider } from '../context/AuthContext';
import { FavoritesProvider } from '../context/FavoritesContext';
import { CompareProvider } from '../context/CompareContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const hideHeaderFooter = [];
  const shouldHide = hideHeaderFooter.includes(router.pathname);

  return (
    <AuthProvider>
      <FavoritesProvider>
        <CompareProvider>
          {!shouldHide && <Header />}
          <Component {...pageProps} />
          {!shouldHide && <Footer />}
          <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
        </CompareProvider>
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default MyApp;
