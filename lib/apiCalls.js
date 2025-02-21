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
  console.log("id =============================");
  console.log(id);

  try {
    const {data} = await axios.get(`/api/category/subcategory/One?id=${id}`);

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
    const { data } = await axios.get(`/api/product/search?name=${name}`);
    return data;
  } catch (error) {
    console.log("frontend error while fetching category products", error);
    return null;
  }
};
