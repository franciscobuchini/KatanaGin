import Logo from '../assets/svg/katana-gin-logo.svg';
import Button from './Button';

function Footer() {
  return (
    <footer className="w-full relative flex flex-col md:flex-row items-center justify-center p-10 mt-auto">
      {/* Container to center the logo regardless of the absolute elements */}
      <img src={Logo} alt="Katana Gin Logo" loading="lazy" className="h-10 w-auto opacity-85 hover:opacity-100 transition-opacity cursor-pointer md:mx-auto" />
      
      {/* Redes y Contacto (Abajo a la derecha en Desktop, centrado en Mobile) */}
      <div className="flex items-center gap-4 mt-8 md:mt-0 md:absolute md:right-10">
        <Button 
          variant="secondary" 
          icon="ri:mail-fill" 
          onClick={() => window.location.href = 'mailto:info@katana.tech'}
        />
        <Button 
          variant="secondary" 
          icon="ri:whatsapp-fill" 
          onClick={() => window.open('https://wa.me/549342', '_blank', 'noopener,noreferrer')}
        />
        <Button 
          variant="secondary" 
          icon="ri:instagram-fill" 
          onClick={() => window.open('https://instagram.com', '_blank', 'noopener,noreferrer')}
        />
      </div>
    </footer>
  );
}

export default Footer;
