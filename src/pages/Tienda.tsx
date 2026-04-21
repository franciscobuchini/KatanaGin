import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import PageContainer from '../components/PageContainer';
import CategoryFilter from '../components/CategoryFilter';
import products from '../data/products.json';
import PageTitle from '../components/PageTitle';
import SEO from '../components/SEO';

interface Product {
  id: number;
  title: string;
  price: string;
  image: string;
  detail?: string;
  category: string;
  isAvailable: boolean;
  isProximamente?: boolean;
  isHidden?: boolean;
}

function Tienda() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  // Filtrar productos visibles (no ocultos)
  const visibleProducts = (products as Product[]).filter(p => !p.isHidden);

  // Extraer categorías únicas de los productos visibles (evitando duplicados y falsy)
  const categories = ['Todos', ...Array.from(new Set(visibleProducts.map(p => p.category).filter(Boolean)))];

  // Filtrar productos según la categoría seleccionada
  const filteredProducts = (selectedCategory === 'Todos' 
    ? visibleProducts 
    : visibleProducts.filter(p => p.category === selectedCategory))
    .sort((a, b) => {
      if (a.isAvailable === b.isAvailable) return 0;
      return a.isAvailable ? -1 : 1;
    });

  return (
    <PageContainer gap={8}>
      <SEO 
        title="Tienda | Comprar Gin Artesanal en Santa Fe" 
        description="Explora nuestra tienda online. Comprá gin premium, packs de regalo y kits de Gin Tonic con envío a domicilio en Santa Fe, Santo Tomé y Esperanza. Calidad de exportación." 
        url="https://katanagin.com/tienda"
      />
      <PageTitle>NUESTROS PRODUCTOS</PageTitle>
      
      <CategoryFilter 
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mt-8'>
        {filteredProducts.map((product) => (
          <ProductCard 
            key={product.id} 
            id={product.id}
            title={product.title}
            price={product.price}
            image={product.image}
            detail={product.detail}
            isAvailable={product.isAvailable}
            isProximamente={product.isProximamente}
          />
        ))}
      </div>
    </PageContainer>
  );
}

export default Tienda;
