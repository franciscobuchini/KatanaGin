import { Link } from 'react-router-dom';
import Card from '../components/Card';
import PageContainer from '../components/PageContainer';
import Button from '../components/Button';
import PageTitle from '../components/PageTitle';
import SEO from '../components/SEO';
import videoSource from "../assets/videos/Video.mp4";

function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Katana Gin",
    "url": "https://katanagin.com/",
    "logo": "https://res.cloudinary.com/dpleitc1d/image/upload/v1775004783/Katana_Logo_vc2a6b.webp",
    "description": "Katana Gin es sinónimo de pura precisión. Descubre nuestra destilería de gin premium.",
    "sameAs": [
      "https://www.instagram.com/katanagin/"
    ]
  };

  return (
    <PageContainer gap={16}>
      <SEO 
        title="Gin Artesanal Santa Fe | Pura Precisión"
        description="Katana Gin: Destilería de gin de autor en Santa Fe. Pura precisión en cada botella de nuestro Gin artesanal. Envío a domicilio en Santa Fe Capital y alrededores."
        structuredData={structuredData} 
      />
      <div className='text-center flex flex-col gap-6 items-center'>
        <PageTitle size="lg" uppercase>
          PURA<br/>
          PRECISIÓN
        </PageTitle>        
      </div>
      
      <div className='flex flex-col gap-10 items-center w-full'>
        <Card>
          <video
            src={videoSource}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full aspect-video object-cover transition-transform duration-700"
          />
        </Card>

        <div className='flex flex-wrap gap-4 justify-center'>
          <Link to="/tienda">
            <Button variant="primary" size="lg" className="min-w-[200px]">
              Ver productos
            </Button>
          </Link>
          <Link to="/contacto">
            <Button variant="secondary" size="lg" className="min-w-[200px]">
              Contáctanos
            </Button>
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}

export default Home;
