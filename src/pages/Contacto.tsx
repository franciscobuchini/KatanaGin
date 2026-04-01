import { useState } from 'react';
import PageContainer from '../components/PageContainer';
import Card from '../components/Card';
import Label from '../components/Label';
import Input from '../components/Input';
import Select from '../components/Select';
import Button from '../components/Button';
import PageTitle from '../components/PageTitle';
import SEO from '../components/SEO';
import { sendContactForm, type ContactFormData } from '../functions/contact';

function Contacto() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');
    
    const formData = new FormData(e.currentTarget);
    const data: ContactFormData = {
      from_name: formData.get('from_name') as string,
      reply_to: formData.get('reply_to') as string,
      company: formData.get('company') as string,
      phone: formData.get('phone') as string,
      province: formData.get('province') as string,
      locality: formData.get('locality') as string,
      location: formData.get('location') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    };

    try {
      await sendContactForm(data);
      setStatus('success');
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error(error);
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer gap={8}>
      <SEO 
        title="Contacto | Ventas Mayoristas y Distribución" 
        description="¿Buscás gin artesanal para tu evento o negocio en Santa Fe? Contactanos para ventas mayoristas, regalos empresariales y distribución regional de Katana Gin." 
        url="https://katanagin.com/contacto"
      />
      <PageTitle>CONTACTO</PageTitle>
      
      <Card className="max-w-2xl mx-auto backdrop-blur-sm border-white/20">
        <form className="flex flex-col gap-6 p-8 md:p-12" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <Label htmlFor="from_name">Nombre Completo</Label>
              <Input id="from_name" name="from_name" placeholder="Ej: Juan Pérez" required />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="reply_to">Correo Electrónico</Label>
              <Input id="reply_to" name="reply_to" type="email" placeholder="hola@ejemplo.com" required />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <Label htmlFor="company">Nombre de la Empresa (Opcional)</Label>
              <Input id="company" name="company" placeholder="Ej: Katana S.A." />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="phone">Teléfono</Label>
              <Input id="phone" name="phone" type="tel" placeholder="Ej: +54 9 11 1234 5678" required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <Label htmlFor="province">Provincia</Label>
              <Select 
                id="province" 
                name="province"
                defaultValue=""
                variant="provincias"
                required
              />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="locality">Localidad</Label>
              <Input id="locality" name="locality" placeholder="Ej: Santa Fe Capital" required />
            </div>
          </div>

          <div className="flex flex-col">
            <Label htmlFor="location">Ubicación / Dirección (Opcional)</Label>
            <Input id="location" name="location" placeholder="Ej: Calle Falsa 123" />
          </div>
          
          <div className="flex flex-col">
            <Label htmlFor="subject">Asunto</Label>
            <Select 
              id="subject" 
              name="subject"
              defaultValue=""
              options={[
                { value: 'mayorista', label: 'Distribuidor/Mayorista' },
                { value: 'eventos', label: 'Eventos' },
                { value: 'informacion', label: 'Información' },
                { value: 'otro', label: 'Otro...' }
              ]} 
              required
            />
          </div>

          <div className="flex flex-col">
            <Label htmlFor="message">Mensaje</Label>
            <Input id="message" name="message" isTextarea placeholder="Escribe tu mensaje aquí..." required />
          </div>
          
          {status === 'success' && (
            <div className="p-4 bg-success/10 border border-success/30 text-success text-sm rounded-xl text-center animate-in fade-in slide-in-from-top-2">
              ¡Mensaje enviado con éxito! Nos contactaremos pronto.
            </div>
          )}

          {status === 'error' && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-500 text-sm rounded-xl text-center">
              Hubo un error: {errorMessage}. Por favor intenta de nuevo.
            </div>
          )}

          <Button 
            variant="primary" 
            size="lg" 
            className="w-full"
            disabled={loading}
            icon={loading ? "mdi:loading" : undefined}
          >
            {loading ? 'Enviando...' : 'Enviar Mensaje'}
          </Button>
        </form>
      </Card>
    </PageContainer>
  );
}

export default Contacto;
