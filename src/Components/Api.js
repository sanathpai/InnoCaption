import axios from 'axios';

const API_BASE_URL = 'https://dummyjson.com';

// Fetches products from the API
export const fetchProducts = async () => {
  const response = await axios.get(`${API_BASE_URL}/products`);
  console.log(response.data);
  return response.data; // Correctly used response here
};

// Adds an item to the cart
// Note: The dispatch function should be provided by the component or context using this API method, not directly in the API call.
export const addToCart = async (item, dispatch) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/carts/add`, {
      // Adjust the payload according to your API's requirements
      productId: item.id,
      quantity: 1, // or another quantity as needed
    });

    // Assuming the API returns the updated cart item or some relevant data
    // Dispatch the ADD_TO_CART action with the response data if necessary
    // This part needs to align with your Redux setup
    dispatch({
      type: 'ADD_TO_CART',
      payload: response.data, // Assuming response.data contains the item data
    });
  } catch (error) {
    console.error('Failed to add item to cart:', error);
    // Optionally, dispatch an error action here
  }
};

// Searches products based on a query
export const searchProducts = async (query) => {
  const response = await axios.get(`${API_BASE_URL}/products/search?q=${query}`);
  return response.data; // Directly returning the fetched data
};
