import { useState, useEffect, useRef } from 'react';
import Button from './Button';
import CartDropdown from './CartDropdown';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../functions/useCart';

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);
  const { cartItems, increaseQuantity, decreaseQuantity, totalItems, isRecentlyAdded } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const isCheckout = location.pathname === '/checkout';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(e.target as Node)) {
        setIsCartOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 px-4 md:px-10 transition-all duration-500 bg-card border-b border-border md:bg-transparent md:border-none ${
      scrolled 
        ? 'py-3 md:py-8' 
        : 'py-4 md:py-8'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <div className="flex-1 flex justify-start">
          <Link to="/">
            <img 
              src="https://res.cloudinary.com/dpleitc1d/image/upload/v1775004783/Katana_Logo_vc2a6b.webp" 
              alt="Katana Logo" 
              loading="lazy"
              className={`transition-all duration-500 ${scrolled ? 'h-4' : 'h-5'} w-auto opacity-85 hover:opacity-100 flex-shrink-0`} 
            />
          </Link>
        </div>

        {/* Navigation Desktop */}
        <nav className={`hidden md:flex gap-2 flex-none transition-all duration-500 overflow-hidden ${
          scrolled 
            ? 'opacity-0 scale-95 pointer-events-none translate-y-[-10px] w-0' 
            : 'opacity-100 scale-100 translate-y-0 w-auto'
        }`}>
          <Link to="/"><Button variant="ghost" size="md">Inicio</Button></Link>
          <Link to="/tienda"><Button variant="ghost" size="md">Tienda</Button></Link>
          <Link to="/contacto"><Button variant="ghost" size="md">Contacto</Button></Link>
        </nav>

        {/* Right Side */}
        <div ref={cartRef} className="flex-1 flex justify-end gap-2 items-center relative">
          {!isCheckout && (
            <div className="md:hidden">
              <Button 
                variant={scrolled ? "primary" : "secondary"} 
                size="md" 
                icon={isMobileMenuOpen ? "mdi:close" : "mdi:menu"} 
                className="transition-all duration-500"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </div>
          )}
          
          {isCheckout ? (
            <Button 
                variant={scrolled ? "primary" : "secondary"} 
                size="md" 
                icon="mdi:arrow-left" 
                className="transition-all duration-500"
                onClick={() => navigate('/tienda')}
              />
          ) : (
            <>
              <div className="relative">
                <Button 
                    variant={isRecentlyAdded ? "success" : (scrolled ? "primary" : "secondary")} 
                    size="md" 
                    icon={isRecentlyAdded ? "mdi:check" : "roentgen:supermarket-cart"} 
                    className="transition-all duration-500"
                    onClick={() => {
                      setIsCartOpen(!isCartOpen);
                      if (isMobileMenuOpen) setIsMobileMenuOpen(false);
                    }}
                  />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] bg-success text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 pointer-events-none">
                    {totalItems}
                  </span>
                )}
              </div>
              <CartDropdown 
                isVisible={isCartOpen} 
                cartItems={cartItems}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
                onClose={() => setIsCartOpen(false)}
              />
            </>
          )}
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-2xl border-b border-border transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <nav className="flex flex-col gap-2 p-4">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}><Button className="w-full justify-start" variant="ghost" size="md">Inicio</Button></Link>
          <Link to="/tienda" onClick={() => setIsMobileMenuOpen(false)}><Button className="w-full justify-start" variant="ghost" size="md">Tienda</Button></Link>
          <Link to="/contacto" onClick={() => setIsMobileMenuOpen(false)}><Button className="w-full justify-start" variant="ghost" size="md">Contacto</Button></Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
