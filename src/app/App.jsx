import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Loader from '@/components/layout/Loader';
import AppRouter from '@/router/AppRouter';
import { useLenis } from '@/hooks/useLenis';

const App = () => {
  const [loaded, setLoaded] = useState(false);
  useLenis();

  return (
    <HelmetProvider>
      <BrowserRouter>
        {!loaded && <Loader onComplete={() => setLoaded(true)} />}
        <Navbar />
        <main id="main">
          <AppRouter />
        </main>
        <Footer />
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
