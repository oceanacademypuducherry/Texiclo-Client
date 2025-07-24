import React, { useEffect, ReactNode } from "react";
import { useDispatch } from "react-redux";
import { GetAllCategoryAPI,GetAllCollectionAPI } from "../features/api";
import { AppDispatch } from "../app/store";

interface DispatcherProps {
  children: ReactNode;
}

const Dispatcher: React.FC<DispatcherProps> = React.memo(({children} ) => {
  const dispatch = useDispatch<AppDispatch>();
 useEffect(() => {
    dispatch(GetAllCategoryAPI());
    dispatch(GetAllCollectionAPI());
    console.log("dispatcher page")
  }, [dispatch]);

 return <>{children}</>;
});

export default Dispatcher;
