import PageContainer from '../components/PageContainer';
import Card from '../components/Card';
import Label from '../components/Label';
import Input from '../components/Input';
import Select from '../components/Select';
import Button from '../components/Button';
import PageTitle from '../components/PageTitle';

function Contacto() {
  return (
    <PageContainer gap={8}>
      <PageTitle>CONTACTO</PageTitle>
      
      <Card className="max-w-2xl mx-auto backdrop-blur-sm border-white/20">
        <form className="flex flex-col gap-6 p-8 md:p-12" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <Label htmlFor="name">Nombre Completo</Label>
              <Input id="name" placeholder="Ej: Juan Pérez" />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input id="email" type="email" placeholder="hola@ejemplo.com" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <Label htmlFor="phone">Teléfono</Label>
              <Input id="phone" type="tel" placeholder="Ej: +54 9 11 1234 5678" />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="province">Provincia</Label>
              <Select 
                id="province" 
                defaultValue=""
                variant="provincias"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <Label htmlFor="locality">Localidad</Label>
            <Input id="locality" placeholder="Ej: Santa Fe Capital" />
          </div>
          
          <div className="flex flex-col">
            <Label htmlFor="subject">Asunto</Label>
            <Select 
              id="subject" 
              defaultValue=""
              options={[
                { value: 'mayorista', label: 'Distribuidor/Mayorista' },
                { value: 'eventos', label: 'Eventos' },
                { value: 'informacion', label: 'Información' },
                { value: 'otro', label: 'Otro...' }
              ]} 
            />
          </div>

          <div className="flex flex-col">
            <Label htmlFor="message">Mensaje</Label>
            <Input id="message" isTextarea placeholder="Escribe tu mensaje aquí..." />
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
