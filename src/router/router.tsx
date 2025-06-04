import { createBrowserRouter, Outlet } from "react-router-dom";
import {
  CategoryPage,
  CollectionPage,
  EstimationPage,
  HomePage,
  NewCollectionPage,
  ProductPage,
} from "../Pages";
import { ViewProduct } from "../components/ViewProduct";
import { Preview } from "../components/Preview";
import Dispatcher from "../common/Dispatcher";

const MainLayout = () => (
  <>
    {/* <Dispatcher children={undefined} /> */}
    <Outlet />
  </>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // MainLayout now renders Dispatcher inside Router context
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/products/:categoryId?/:collectionId?", element: <ProductPage /> },
      { path: "/category", element: <CategoryPage /> },
      { path: "/newcollection", element: <NewCollectionPage /> },
      { path: "/estimation", element: <EstimationPage /> },
      { path: "/collection", element: <CollectionPage /> },
      { path: "/viewproduct/:productId", element: <ViewProduct /> },
      { path: "/preview", element: <Preview /> },
    ],
  },
]);


