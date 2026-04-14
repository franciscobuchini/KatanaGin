import { useNavigate } from 'react-router-dom';
import Button from './Button';

function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="w-full relative flex flex-col md:flex-row items-center justify-center p-6 md:p-10 mt-auto">
      {/* Container to center the logo regardless of the absolute elements */}
      <img src="https://res.cloudinary.com/dpleitc1d/image/upload/q_auto/f_auto/v1775004784/KatanaGin_Logo_qy726k.webp" alt="Katana Gin Logo" loading="lazy" className="h-8 md:h-10 w-auto opacity-85 hover:opacity-100 transition-opacity cursor-pointer md:mx-auto" />
      
      {/* Redes y Contacto (Abajo a la derecha en Desktop, centrado en Mobile) */}
      <div className="flex items-center gap-4 mt-8 md:mt-0 md:absolute md:right-10">
        <Button 
          variant="secondary" 
          icon="ri:mail-fill" 
          onClick={() => navigate('/contacto')}
        />
        <Button 
          variant="secondary" 
          icon="ri:whatsapp-fill" 
          onClick={() => window.open('https://wa.me/5493424666830', '_blank', 'noopener,noreferrer')}
        />
        <Button 
          variant="secondary" 
          icon="ri:instagram-fill" 
          onClick={() => window.open('https://instagram.com/katana.gin', '_blank', 'noopener,noreferrer')}
        />
      </div>
    </footer>
  );
}

export default Footer;
