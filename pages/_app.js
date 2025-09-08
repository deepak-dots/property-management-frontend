// pages/_app.js
import '../styles/globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { CompareProvider } from '../context/CompareContext';
import { FavoritesProvider } from '../context/FavoritesContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import NearbyProperties component
import NearbyProperties from '../components/NearbyProperties';

function MyApp({ Component, pageProps }) {
  return (
    <CompareProvider>
      <FavoritesProvider>
        <Header />

        {/* Nearby properties globally */}
        {/* <NearbyProperties /> */}

        <Component {...pageProps} />
        <Footer />
        <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
      </FavoritesProvider>
    </CompareProvider>
  );
}

export default MyApp;



