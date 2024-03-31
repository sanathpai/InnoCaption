// Ensure the path to fetchProducts and addItem is correct
import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography,
  Container,
} from "@mui/material";
import { useLazyGetAllProductsQuery } from "../app/api/productsApiSlice";
import CircularProgress from "@mui/material/CircularProgress";

const ProductList = () => {
  const [
    getAllProducts,
    {
      data: productsData,
      isLoading: productsLoading,
      isSuccess: productsLoadingSuccess,
    },
  ] = useLazyGetAllProductsQuery();

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    console.log(productsLoading, productsData);
  }, [productsLoading]);

  // Example of correctly calling addToCart with a single product
  // const handleAddToCart = (product) => {
  //   const userId = 1; // Assuming you have a userId
  //   dispatch(addToCart(userId, [{ id: product.id, quantity: 1 }]));
  // };

  return (
    <Container>
      {productsLoading && (
        <CircularProgress
          sx={{
            position: "absolute",
            zIndex: "20",
            top: "50%",
            left: "50%",
          }}
        />
      )}
      <Grid container spacing={4}>
        {productsLoadingSuccess &&
          productsData.products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.thumbnail}
                  alt={product.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${product.price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={(e) => {
                      console.log(e);
                    }}
                  >
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default ProductList;
