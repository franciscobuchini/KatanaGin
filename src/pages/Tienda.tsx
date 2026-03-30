import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import PageContainer from '../components/PageContainer';
import CategoryFilter from '../components/CategoryFilter';
import products from '../data/products.json';
import PageTitle from '../components/PageTitle';

function Tienda() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  // Extraer categorías únicas de los productos (evitando duplicados y falsy)
  const categories = ['Todos', ...Array.from(new Set(products.map(p => p.category).filter(Boolean)))];

  // Filtrar productos según la categoría seleccionada
  const filteredProducts = selectedCategory === 'Todos' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <PageContainer gap={8}>
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
          />
        ))}
      </div>
    </PageContainer>
  );
}

export default Tienda;
