import Button from './Button';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function CategoryFilter({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}: CategoryFilterProps) {
  return (
    <div className='flex flex-wrap gap-2 justify-center lg:justify-start w-full mt-4'>
      {categories.map(category => (
        <Button 
          key={category} 
          variant={selectedCategory === category ? 'primary' : 'ghost'}
          size='sm'
          onClick={() => onSelectCategory(category)}
          className="px-6"
        >
          {category}
        </Button>
      ))}
    </div>
  );
}
