import React, { useEffect } from "react";
import { Grid, Card, CardMedia, CardContent, CardActions, Button, Typography, Container, CircularProgress, Snackbar,Box } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useLazyGetAllProductsQuery, useLazySearchProductsQuery } from "../app/api/productsApiSlice";
import { useDispatch } from "react-redux";
import { addProduct } from "../app/features/cartSlice";
import { useAddToCartMutation } from "../app/api/cartApiSlice"; 

const ProductList = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  const [addToCart, { isError }] = useAddToCartMutation();
  const [triggerGetAllProducts, { data: productsData, isLoading: productsLoading }] = useLazyGetAllProductsQuery();
  const [triggerSearchProducts, { data: searchResults, isLoading: searchLoading }] = useLazySearchProductsQuery();

  useEffect(() => {
    if (searchQuery) {
      triggerSearchProducts({ category: searchQuery }); //to search for a query
    } else {
      triggerGetAllProducts(); // if not trigger all products display
    }
  }, [searchQuery, triggerGetAllProducts, triggerSearchProducts]);

  const finalProductsData = searchQuery ? searchResults : productsData;
  const finalProductsLoading = searchQuery ? searchLoading : productsLoading;

  const handleAddToCart = async (product) => {
    const productWithQuantity = { ...product, quantity: 1 };
    try {
      await addToCart({ product: productWithQuantity }).unwrap(); // api call
      dispatch(addProduct({ product: productWithQuantity })); // local state
    } catch (err) {
      console.error('Failed to add product to cart:', err);
    }
  };

  return (
    <Container>
      {finalProductsLoading && <CircularProgress sx={{ position: "absolute", zIndex: "20", top: "50%", left: "50%" }} />}
      <Grid container spacing={4}>
        {finalProductsData?.products?.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardMedia component="img" height="140" image={product.thumbnail} alt={product.title} />
              <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">{product.title}</Typography>
                <Typography variant="body2" color="text.secondary">${product.price}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => handleAddToCart(product)}
                  sx={{ transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.05)' } }}
                >
                  Add to Cart
                </Button>
              </CardActions>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      {isError && (
        <Snackbar
          open={isError}
          autoHideDuration={6000}
          message="Failed to add product to cart. Please try again."
        />
      )}
    </Container>
  );
};

export default ProductList;
