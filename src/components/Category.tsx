import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GetAllCategoryAPI } from '../features/api';

interface CategoryData {
  _id: string;
  imageUrl: string;
  name: string;
}

export const Product = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: categories = [], isLoading } = useSelector(
    (state: RootState) => state.category
  );

  useEffect(() => {
    dispatch(GetAllCategoryAPI({ withMeta: false }) as any);
  }, [dispatch]);

  useEffect(() => {
    // Scroll to category section if URL hash matches
    const hash = window.location.hash;
    if (hash === '#category-section') {
      const element = document.getElementById('category-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollRef.current;
    if (container) {
      const card = container.querySelector('.product-card') as HTMLElement;
      const cardWidth = card?.offsetWidth || 250;
      container.scrollBy({
        left: direction === 'left' ? -cardWidth - 24 : cardWidth + 24,
        behavior: 'smooth',
      });
    }
  };

  const isDataReady = !isLoading && Array.isArray(categories) && categories.length > 0;

  return (
    <section  id="category-section" className='w-[95%] sm:w-[85%] mx-auto px-4 sm:px-6 md:px-10 lg:px-20 pb-0 sm:pb-10'>
      <div className='text-center sm:mb-12 mb-0'>
        <h2 className='text-[20px] md:text-3xl font-bold'>
          Choose Your Category
        </h2>
        <p className='text-custom-grey mt-2 max-w-xl mx-auto text-[16px] md:text-[20px]'>
          Explore a variety of categories to create unique T-shirts that match your personality.
        </p>
      </div>

      <div className='relative'>
        {/* Scroll Left */}
        <button
          onClick={() => scroll('left')}
          className='hidden lg:flex absolute -left-12 top-1/2 transform -translate-y-1/2 bg-custom-black text-white p-2 rounded-full z-10 hover:bg-gray-800'
        >
          <ChevronLeft size={24} />
        </button>

        <div className='overflow-hidden'>
          <div
            ref={scrollRef}
            className='
              flex gap-0 sm:gap-4  py-0 sm:py-4
              overflow-x-auto scroll-smooth
              scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100
              lg:overflow-x-hidden lg:scrollbar-none
              justify-start lg:justify-start
            '
          >
            {isDataReady
              ? categories.map((category: CategoryData) => (
                  <div
                    key={category._id}
                    className='product-card flex-shrink-0 w-[250px] rounded-xl overflow-hidden text-center cursor-pointer transition'
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      navigate(`/products/?categoryId=${category._id}`);
                    }}
                  >
                    <img
                      src={category.imageUrl}
                      alt={category.name}
                      className='w-full h-48 md:h-72 object-contain rounded-xl'
                    />
                    <p className='mt-3 font-medium text-[16px] md:text-[20px]'>
                      {category.name}
                    </p>
                  </div>
                ))
              : // Skeleton Loaders (image + name placeholders)
                <div className="w-full flex justify-center gap-4 py-4">
  {Array.from({ length: 4 }).map((_, index) => (
    <div
      key={index}
      className='w-[250px] rounded-xl overflow-hidden text-center bg-white shadow animate-pulse'
    >
      <div className='w-full h-48 md:h-72 bg-gray-200 rounded-xl' />
      <div className='h-4 w-3/4 mx-auto bg-gray-200 rounded mt-4' />
    </div>
  ))}
</div>
}

            {/* View More Button (only after data loads) */}
            {isDataReady && (
              <a
  href="/category"
  target="_blank"
  rel="noopener noreferrer"
  className="flex-shrink-0 
             w-[150px] h-44 mt-6
             sm:w-[180px] sm:h-48 
             md:w-[220px] md:h-72 
             bg-custom-yellow 
             rounded-xl 
             flex items-center justify-center 
             text-center cursor-pointer 
             shadow 
             hover:bg-yellow-300 
             transition"
>
  <span className="text-sm sm:text-base md:text-xl font-semibold text-custom-black px-2 sm:px-3 md:px-4">
    View More Category
  </span>
</a>

            )}
          </div>
        </div>

        {/* Scroll Right */}
        <button
          onClick={() => scroll('right')}
          className='hidden lg:flex absolute -right-12 top-1/2 transform -translate-y-1/2 bg-custom-black text-white p-2 rounded-full z-10 hover:bg-gray-800'
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
};
