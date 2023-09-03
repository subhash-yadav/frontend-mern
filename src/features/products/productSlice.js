import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProducts ,fetchProductsByFilters,fetchAllCategories, fetchAllBrand,fetchProductById, createProduct, updateProduct} from './productAPI';

const initialState = {
  products: [],
  totalItems:0,
  categories:[],
  brands:[],
  status: 'idle',
  selectedProduct:null
};



export const createProductAsync = createAsyncThunk(
  'product/createProduct',
  async (newProduct) => {
    const response = await createProduct(newProduct);
    return response.data;
  }
);
export const updateProductAsync = createAsyncThunk(
  'product/updateProduct',
  async (update) => {
    const response = await updateProduct(update);
    return response.data;
  }
);
export const fetchProductByIdAsync = createAsyncThunk(
  'product/fetchProductById',
  async (id) => {
    const response = await fetchProductById(id);
    return response.data;
  }
);

export const fetchProductsByFiltersAsync = createAsyncThunk(
  'product/fetchProductsByFilters',
  async ({filter,sort,pagination,admin}) => {
    const response = await fetchProductsByFilters(filter,sort,pagination,admin);
    return response.data;
  }
);

export const fetchAllCategoriesAsync = createAsyncThunk(
  'product/fetchAllCategories',
  async () => {
    const response = await fetchAllCategories();
    return response.data;
  }
);
export const fetchAllBrandAsync = createAsyncThunk(
  'product/fetchAllBrand',
  async () => {
    const response = await fetchAllBrand();
    return response.data;
  }
);

export const productsSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearSelectedProduct:(state)=>{
      state.selectedProduct = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems
      })
      .addCase(fetchAllCategoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categories = action.payload;
      })
      .addCase(fetchAllBrandAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllBrandAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.brands = action.payload;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct = action.payload;
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products.push(action.payload);
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // const index = state.products.findIndex((product)=>(product.id === action.payload.id));
        // state.products[index]=action.payload;
        state.selectedProduct = action.payload;

      })
  },
});

export const { clearSelectedProduct } = productsSlice.actions;
export const selectBrands = (state)=>state.products.brands;
export const selectCategories = (state)=>state.products.categories;
export const selectedProductById = (state)=>state.products.selectedProduct;
export const selectStatus = (state)=>state.products.status;
export default productsSlice.reducer;
