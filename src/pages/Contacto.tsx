import PageContainer from '../components/PageContainer';
import Card from '../components/Card';
import Label from '../components/Label';
import Input from '../components/Input';
import Select from '../components/Select';
import Button from '../components/Button';
import PageTitle from '../components/PageTitle';
import SEO from '../components/SEO';

function Contacto() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Formulario desactivado. Contacto solo por navegación.');
  };

  return (
    <PageContainer gap={8}>
      <SEO 
        title="Contacto" 
        description="Ponte en contacto con Katana Gin. Consultas sobre ventas mayoristas, eventos o información general." 
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
          
          <Button 
            variant="primary" 
            size="lg" 
            className="w-full"
          >
            Enviar Mensaje
          </Button>
        </form>
      </Card>
    </PageContainer>
  );
}

export default Contacto;
