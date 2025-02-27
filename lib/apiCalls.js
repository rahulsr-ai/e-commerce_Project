import axios from "axios";

// ✅ Product List Fetch Function
export const CreateProduct = async (formdata) => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/product/create`,
      formdata
    );
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
};

export const createCategory = async (categoryName, subcategoryName) => {
  try {
    const { data } = await axios.post(`/api/category`, {
      categoryName,
      subcategoryName,
    });
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
};

export const fetchCategories = async () => {
  try {
    const { data } = await axios.get(`/api/category`);
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return null;
  }
};

export const fetchSubCategories = async (id) => {
  

  try {
    const { data } = await axios.get(`/api/category/subcategory/One?id=${id}`);

    return data;
  } catch (error) {
    console.error("Error fetching SubCategories:", error);
    return null;
  }
};

export const getDealsProducts = async () => {
  try {
    const { data } = await axios.get("/api/product/getallondealsProducts");
    return data;
  } catch (error) {
    console.log("frontend error while fetching deals products", error);
    return null;
  }
};

export const getExploreProducts = async (name) => {
  console.log("name,", name);

  try {
    const { data } = await axios.get(`/api/product/explore?name=${name}`);
    return data;
  } catch (error) {
    console.log("frontend error while fetching deals products", error);
    return null;
  }
};

export const getProductsByCategory = async (name) => {
  try {
    const { data } = await axios.get(
      `/api/product/getProductByCategory?name=${name}`
    );
    return data;
  } catch (error) {
    console.log("frontend error while fetching category products", error);
    return null;
  }
};

export const handleSearchProduct = async (name) => {
  try {
    const { data } = await axios.get(`/api/product/search?search=${name}`);
    return data;
  } catch (error) {
    console.log("frontend error while fetching category products", error);
    return null;
  }
};

export const HandleWishlist = async (id) => {
  try {
    const { data } = await axios.post(`/api/wishlist`, {
      id,
    });
    return data;
  } catch (error) {
    console.log("frontend error while fetching wishlist", error);
    return null;
  }
};

export const getAllProducts = async () => {
  try {
    const { data } = await axios.get(`/api/product/getallproduct`);
    return data;
  } catch (error) {
    console.log("frontend error while fetching wishlist", error);
    return null;
  }
};

export const HandleProductClick = async (id) => {
  try {
    const { data } = await axios.get(
      `/api/product/GetSingleProductData?name=${id}`
    );
    return data;
  } catch (error) {
    console.log("frontend error while fetching wishlist", error);
    return null;
  }
};

export const GetUserDetails = async () => {
  try {
    const { data } = await axios.get(`/api/User`);
    return data;
  } catch (error) {
    console.log("frontend error while fetching User Details", error);
    return null;
  }
};

export const GetallUserData = async () => {
  try {
    const { data } = await axios.get(`/api/User/All`);
    return data;
  } catch (error) {
    console.log("frontend error while fetching User Details", error);
    return null;
  }
};

export const UpdateProductStock = async (id, value) => {
  try {
    const { data } = await axios.post(`/api/product/stock`, {
      stock: value,
      id,
    });
    return data;
  } catch (error) {
    console.log("frontend error while fetching User Details", error);
    return null;
  }
};

export const handleAddToCart = async (id, quantity) => {
  try {
    const { data } = await axios.post(`/api/cart/add`, {
      id,
      quantity,
    });
    return data;
  } catch (error) {
    console.log("frontend error while fetching wishlist", error);
    return null;
  }
};


export const removeCartProduct = async (id) => {
  try {
    const { data } = await axios.post(`/api/cart/remove`, {
      id,
    });
    return data;
  } catch (error) {
    console.log("frontend error while fetching wishlist", error);
    return null;
  }
};


export const HandleUserStatus = async (id, status) => {
  try {
    const { data } = await axios.post(`/api/User/status`, {
      id,
      status, 
    });
    return data;
  } catch (error) {
    console.log("frontend error while fetching wishlist", error);
    return null;
  }
};



