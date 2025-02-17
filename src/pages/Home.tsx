import { memo, useEffect } from "react";
import ProductList from "./product-list/ProductList";
import Header from "./Header";
import { isAuthenticated } from "../services/helperService";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }
  });
  return (
    <>
      <Header />
      <ProductList />
    </>
  );
};

export default memo(Home);
