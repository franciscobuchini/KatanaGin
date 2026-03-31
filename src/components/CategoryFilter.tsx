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
    <div className='flex flex-nowrap overflow-x-auto gap-2 w-full mt-4 pb-4 no-scrollbar lg:justify-start'>
      {categories.map(category => (
        <Button 
          key={category} 
          variant={selectedCategory === category ? 'primary' : 'ghost'}
          size='sm'
          onClick={() => onSelectCategory(category)}
          className="px-6 flex-shrink-0"
        >
          {category}
        </Button>
      ))}
    </div>
  );
}
