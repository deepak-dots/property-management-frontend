// pages/_app.js
import '../styles/globals.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'react-toastify/dist/ReactToastify.css';

import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';

import { AuthProvider } from '../context/AuthContext';
import { FavoritesProvider } from '../context/FavoritesContext';
import { CompareProvider } from '../context/CompareContext';

// Import Header/Footer safely
import HeaderImport from '../components/Header';
import FooterImport from '../components/Footer';

// Handle default/named exports
const Header = HeaderImport?.default || HeaderImport;
const Footer = FooterImport?.default || FooterImport;

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Paths where header/footer should be hidden
  const hideHeaderFooter = ['/admin', '/admin/login', '/dashboard', '/dashboard/login', '/user'];
  
  // Check if current path should hide header/footer
  const shouldHide = hideHeaderFooter.some(path => router.pathname.startsWith(path));

  return (
    <AuthProvider>
      <FavoritesProvider>
        <CompareProvider>
          {!shouldHide && Header && <Header />}
          <Component {...pageProps} />
          {!shouldHide && Footer && <Footer />}
          <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
        </CompareProvider>
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default MyApp;
