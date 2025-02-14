import axios from "axios";

// ✅ Product List Fetch Function
export const fetchProducts = async (formdata) => {
  try {
    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/product`, formdata);
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
};


export const createCategory = async (categoryName, subcategoryName) => { 
    try {
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/category`, {categoryName, subcategoryName});
        return data;
    } catch (error) {
        console.error("Error fetching products:", error);
        return null;
    }
}