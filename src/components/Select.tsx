import React from 'react';

interface SelectOption {
  value: string;
  label: string;
}

const ARGENTINE_PROVINCES: SelectOption[] = [
  { value: 'caba', label: 'CABA' },
  { value: 'buenos-aires', label: 'Buenos Aires' },
  { value: 'catamarca', label: 'Catamarca' },
  { value: 'chaco', label: 'Chaco' },
  { value: 'chubut', label: 'Chubut' },
  { value: 'cordoba', label: 'Córdoba' },
  { value: 'corrientes', label: 'Corrientes' },
  { value: 'entre-rios', label: 'Entre Ríos' },
  { value: 'formosa', label: 'Formosa' },
  { value: 'jujuy', label: 'Jujuy' },
  { value: 'la-pampa', label: 'La Pampa' },
  { value: 'la-rioja', label: 'La Rioja' },
  { value: 'mendoza', label: 'Mendoza' },
  { value: 'misiones', label: 'Misiones' },
  { value: 'neuquen', label: 'Neuquén' },
  { value: 'rio-negro', label: 'Río Negro' },
  { value: 'salta', label: 'Salta' },
  { value: 'san-juan', label: 'San Juan' },
  { value: 'san-luis', label: 'San Luis' },
  { value: 'santa-cruz', label: 'Santa Cruz' },
  { value: 'santa-fe', label: 'Santa Fe' },
  { value: 'santiago-del-estero', label: 'Santiago del Estero' },
  { value: 'tierra-del-fuego', label: 'Tierra del Fuego' },
  { value: 'tucuman', label: 'Tucumán' }
];

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  options?: SelectOption[];
  placeholder?: string;
  variant?: 'default' | 'provincias';
}

const Select = ({ className = "", options = [], placeholder, variant = 'default', ...props }: SelectProps) => {
  const finalOptions = variant === 'provincias' ? ARGENTINE_PROVINCES : options;
  const baseStyles = "w-full bg-white border border-border/50 rounded-2xl px-6 outline-none focus:border-primary/30 transition-all duration-300 font-normal text-muted placeholder:text-muted/60 focus:bg-secondary appearance-none";
  
  return (
    <div className="relative">
      <select 
        className={`${baseStyles} h-14 ${className}`}
        {...props}
      >
        <option value="" disabled hidden>{placeholder || 'Seleccionar...'}</option>
        {finalOptions.map(opt => (
          <option key={opt.value} value={opt.value} className="bg-white text-muted">
            {opt.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-6 flex items-center pointer-events-none text-muted/60">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </div>
    </div>
  );
};

export default Select;
