import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setProducts } from '../redux/productSlice'
import { setAllProducts } from '../redux/viewproductSlice'
import { RootState } from '../redux'
import { products as mockProducts } from '../constant/Product'
import { viewproducts } from '../constant/viewproduct'
import { useNavigate, useLocation } from 'react-router-dom'
import { Pagination } from '../common/Pagination'
import { Footer, Navbar, SearchBar } from '../common'

export const ProductPage = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const searchParams = new URLSearchParams(location.search)
  const categoryId = searchParams.get('categoryId')
  const collectionId = searchParams.get('collectionId')
  const [searchQuery, setSearchQuery] = useState('')
  const categoryIdNum = categoryId ? Number(categoryId) : null

  const products = useSelector((state: RootState) => state.products.products)
  const varientProduct = useSelector(
    (state: RootState) => state.viewproduct.products
  )

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6
  const topRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    dispatch(setProducts(mockProducts))
    dispatch(setAllProducts(viewproducts))
  }, [dispatch])

  useEffect(() => {
    setCurrentPage(1)
  }, [categoryId, collectionId])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPage])

  // Step 1: Filter products by both categoryId and collectionId
  const filteredProducts = products.filter(product => {
    const categoryMatch = categoryId
      ? product.categoryId === Number(categoryId)
      : true
    const collectionMatch = collectionId
      ? product.collectionId === Number(collectionId)
      : true
    return categoryMatch && collectionMatch
  })

  // Step 2: Extract matched product IDs
  const filteredProductIds = filteredProducts.map(p => p.id)

  // Step 3: Get all variant products that match the filtered product IDs
  const filteredVariants = viewproducts.filter(v =>
    filteredProductIds.includes(v.productId)
  )

  // Step 4: Further filter viewproducts that match variant IDs
  const filteredVariantIds = filteredVariants.map(v => v.id)
  const filteredViewProducts = viewproducts.filter(vp =>
    filteredVariantIds.includes(vp.id)
  )

  // Step 5: Apply search filter
  const finalFilteredProducts = filteredViewProducts.filter(product => {
    const searchableText = `
    ${product.name}
    ${product.color}
    ${product.type}
    ${product.total}
    ${product.discount}
  `.toLowerCase()
    return searchableText.includes(searchQuery.toLowerCase())
  })

  const totalPages = Math.ceil(finalFilteredProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentProducts = finalFilteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  return (
    <div className='min-h-screen flex flex-col bg-white'>
      <Navbar />

      <main className='w-full max-w-[1200px] mx-auto flex-grow px-4 sm:px-6 md:px-10 py-10'>
        <div ref={topRef} />

        <h2 className='text-2xl sm:text-3xl font-bold text-center mb-14'>
          Products
        </h2>

        <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4'>
          <div className='w-3/4 mx-auto md:mx-0 sm:w-full md:w-1/2'>
            <SearchBar
              onSearch={query => {
                setSearchQuery(query)
                setCurrentPage(1)
              }}
            />
          </div>
        </div>

        {/* <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16'>
          {currentProducts.length > 0 ? (
            currentProducts.map(product => (
              <div
                key={product.id}
                className='flex flex-col items-center text-center cursor-pointer bg-white  rounded-lg p-4 transition-transform hover:scale-[1.02]'
                onClick={() => navigate(`/viewproduct/${product.id}`)}
              >
                <img
                  src={product.image.Image}
                  alt={product.name}
                  className='w-full h-56 object-contain rounded-md mb-4'
                />
                <h3 className='text-base sm:text-lg md:text-xl font-medium mb-2'>
                  {product.name} ({product.color}, {product.type})
                </h3>
                <p className='text-sm sm:text-base md:text-lg text-gray-600'>
                  ₹{product.total}
                </p>
                <p className='text-sm sm:text-base md:text-lg text-green-600'>
                  Discount {product.discount}% Off
                </p>
              </div>
            ))
          ) : (
            <p className='text-lg col-span-full text-center'>
              No products found for this filter
            </p>
          )}
        </div> */}
         <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16'>
         
              <div
               
                className='flex flex-col items-center text-center cursor-pointer bg-white  rounded-lg p-4 transition-transform hover:scale-[1.02]'
                onClick={() => navigate(`/viewproduct/`)}
              >
                <img
                  src=""
                  alt=""
                  className='w-full h-56 object-contain rounded-md mb-4'
                />
                <h3 className='text-base sm:text-lg md:text-xl font-medium mb-2'>
                  {/* {product.name} ({product.color}, {product.type}) */}
                  T shirt (Red, Hoodie)
                </h3>
                <p className='text-sm sm:text-base md:text-lg text-gray-600'>
                  {/* ₹{product.total} */}
                  ₹ 500
                </p>
                <p className='text-sm sm:text-base md:text-lg text-green-600'>
                  Discount {60}% Off
                </p>
              </div>
          
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </main>

      <Footer />
    </div>
  )
}
