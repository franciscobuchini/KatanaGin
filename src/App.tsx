import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import Tienda from './pages/Tienda';
import Contacto from './pages/Contacto';

import Checkout from './pages/Checkout';
import ScrollToTop from './functions/ScrollToTop';
import { CartProvider } from './functions/CartProvider';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/tienda" element={<Tienda />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
