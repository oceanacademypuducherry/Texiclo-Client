import React, { useEffect, useRef, ReactNode } from "react";
import { useDispatch } from "react-redux";
// import { useLocation,Outlet } from "react-router-dom";
import { GetAllCategoryAPI } from "../features/api/categoryAPI";
import { AppDispatch } from "../redux";

interface DispatcherProps {
  children: ReactNode;
}

const Dispatcher: React.FC<DispatcherProps> = React.memo(({children} ) => {
  const dispatch = useDispatch<AppDispatch>();
 useEffect(() => {
    dispatch(GetAllCategoryAPI());
  }, [dispatch]);

 return <>{children}</>;
});

export default Dispatcher;
