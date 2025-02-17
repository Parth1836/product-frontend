import { Grid, Stack } from "@mui/material";
import PaginationComp from "../../components/PaginationComponent";
import ProductCard from "../../components/ProductCard";
import { getProductListByPage } from "../../services/helperService";
import { useEffect, useState } from "react";
import { Product } from "../../types/product";

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // func to load product list by pagination
  const loadProductList = async (pageNum: number) => {
    try {
      const response = await getProductListByPage(pageNum);
      const totalStr = (response?.total / 10).toString();
      setTotalPages(parseInt(totalStr, 10));
      setProducts(response?.data);
    } catch (error) {
      console.log("---error for loadproducts");
    }
  };

  useEffect(() => {
    loadProductList(page);
  }, []);

  // func to change page on clicking page number for loading more products
  const handlePageChange = (event: any, pageArg: number) => {
    loadProductList(pageArg);
    setPage(pageArg);
  };

  // func for add to cart
  const addToCart = (prodId: number) => {
    // logic for adding to cart func, as of now this is out of scope
  };
  
  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      sx={{
        padding: "15px 15px",
      }}
    >
      {products?.map((product) => (
        <ProductCard product={product} addToCart={addToCart} />
      ))}
      <Stack
        alignItems="center"
        sx={{
          justifyContent: "center",
          width: "100%",
          margin: "10px 0",
        }}
      >
        <PaginationComp
          totalPages={totalPages}
          page={page}
          handlePageChange={handlePageChange}
        />
      </Stack>
    </Grid>
  );
};

export default ProductList;
