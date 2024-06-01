
import React, { useState, useEffect } from 'react';
import './Register.css';
import { upload_file, get_product_names, save_new_product_name} from '../api';
import {message as toast} from "antd"
import Loading from "../component/loading"
import {base_url} from "../config"

const Register = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [loading, setLoading] = useState(false)
  const [newProduct, setNewProduct] = useState('');
  const [files, setFiles] = useState([]);

  useEffect(() =>  {
    async function load_product_names(){
      let response = await get_product_names()
      if(response){
        setProducts(response.data)
      }
    }

    load_product_names()
  }, []);



  const add_new_products = async (files, additionalData) => {
    const formData = new FormData();
    Array.from(files).forEach(file => {
      formData.append("files", file);
    });
  
    // Append the JSON data as a string
    formData.append("data", JSON.stringify(additionalData));
  
    try {
      const response = await fetch(base_url + "/product", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        const errorMessage = errorResponse.message;
        toast.error(errorMessage);
        return;
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      toast.error(error.message);
    }
  };





  const handleProductChange = (event) => {
    setSelectedProduct(event.target.value);
  };

  const handlePurchasePriceChange = (event) => {
    setPurchasePrice(event.target.value);
  };

  const handle_pdf_selection = async (event) => {
    const files =event.target.files
    setFiles(files)
  };


  const handleAddMore = () => {
    if (newProduct) {
      setProducts([...products, newProduct]);
      save_new_product_name(newProduct)
      setNewProduct('');
    }
  };

  const handleAddProduct = async () => {

    if (selectedProduct && purchasePrice && files.length != 0) {
      let new_product ={name: selectedProduct, purchase_price: purchasePrice}
      setLoading(true)
      let response = await add_new_products(files, new_product)
      setLoading(false)
      toast.success(response.message)
      // Reset form fields
      setSelectedProduct('');
      setPurchasePrice('');
      setFile_url('')
    }else{
      toast.error("Please fill in all details")
    }
  };

  return (
    <div className="register-page">
      <h1>Register page</h1>
      <div className="product-section">
        <label htmlFor="product-select">Product name</label>
        <select id="product-select" value={selectedProduct} onChange={handleProductChange}>
          <option value="" disabled>Select product</option>
          {products.map((product, index) => (
            <option key={index} value={product.name}>{product.name}</option>
          ))}
        </select>
        <input
          style={{marginTop: 20}}
          type="text"
          value={newProduct}
          onChange={(e) => setNewProduct(e.target.value)}
          placeholder="Add new product"
        />
        <button className="add-more-btn" onClick={handleAddMore}>Add</button>
      </div>
      <div className="upload-section">
        <label htmlFor="pdf-upload">Paste or drag the product data (PDF) here:</label>
        <input
          type="file"
          id="pdf-upload"
          multiple
          accept=".pdf"
          onChange={handle_pdf_selection}
        />
      </div>
      <div className="price-section">
        <label htmlFor="purchase-price">Purchase price</label>
        <input
          type="number"
          id="purchase-price"
          value={purchasePrice}
          onChange={handlePurchasePriceChange}
        />
      </div>
      <button className="add-product-btn" onClick={handleAddProduct}>Add Product</button>
      <Loading isVisible={loading} message="Uploading new products" />
    </div>
  );
};

export default Register;
