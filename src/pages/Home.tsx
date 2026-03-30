import { Link } from 'react-router-dom';
import Card from '../components/Card';
import PageContainer from '../components/PageContainer';
import Button from '../components/Button';
import PageTitle from '../components/PageTitle';
import videoSource from "../assets/videos/Video.mp4";

function Home() {
  return (
    <PageContainer gap={16}>
      <div className='text-center flex flex-col gap-6 items-center'>
        <PageTitle size="lg" uppercase>
          PURA<br/>
          PRECISION
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
              Contactanos
            </Button>
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}

export default Home;
