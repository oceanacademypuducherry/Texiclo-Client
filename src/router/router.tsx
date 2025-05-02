import { createBrowserRouter } from "react-router-dom";
import { CategoryPage, CollectionPage, EstimationPage, HomePage, NewCollectionPage, ProductPage } from "../Pages";
import { ViewProduct } from "../components/ViewProduct";
import { Preview } from "../components/Preview";





export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/products",
    element: <ProductPage />,
  },
  {
    path:"/category",
    element:<CategoryPage />
  },
  {
    path:"/newcollection",
    element:<NewCollectionPage />
  },
  {
    path:"/estimation",
    element:<EstimationPage />
  },
  {
    path:"/collection",
    element:< CollectionPage/>
  },
  {
      path: "/viewproducts",
      element: <ViewProduct/>,
  },
  {
      path: "/preview",
      element: <Preview/>,
  }
]);