import React, { useEffect, useRef, ReactNode } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux";
import { GetAllCategoryAPI,GetAllCollectionAPI } from "../features/api";

interface DispatcherProps {
  children: ReactNode;
}

const Dispatcher: React.FC<DispatcherProps> = React.memo(({children} ) => {
  const dispatch = useDispatch<AppDispatch>();
 useEffect(() => {
    dispatch(GetAllCategoryAPI());
    dispatch(GetAllCollectionAPI());
    
  }, [dispatch]);

 return <>{children}</>;
});

export default Dispatcher;
