
import React, { useState, useEffect } from 'react';
import './Register.css';
import { upload_file, get_product_names, save_new_product_name} from '../api';
import {message as toast} from "antd"


const Register = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [file_url, setFile_url] = useState('');
  const [uploading, setUploading] = useState(false)
  const [newProduct, setNewProduct] = useState('');

  useEffect(() =>  {
    async function load_product_names(){
      let response = await get_product_names()
      if(response){
        setProducts(response.data)
      }
    }

    load_product_names()
  }, []);

  const handleProductChange = (event) => {
    setSelectedProduct(event.target.value);
  };

  const handlePurchasePriceChange = (event) => {
    setPurchasePrice(event.target.value);
  };

  const handlePdfUpload = async (event) => {
    const file =event.target.files[0]
    toast.info("Uploading file")
    setUploading(true)
    let response = await upload_file(file)
    if(response){
      toast.success("Upload completed")
      setFile_url(response.url)
    }

  };

  const handleAddMore = () => {
    if (newProduct) {
      setProducts([...products, newProduct]);
      save_new_product_name(newProduct)
      setNewProduct('');
    }
  };

  const handleAddProduct = () => {
    if (selectedProduct && purchasePrice) {
      let new_product ={product_name: selectedProduct, purchase_price: purchasePrice}
      console.log(new_product)
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
            <option key={index} value={product}>{product}</option>
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
          onChange={handlePdfUpload}
        />
      </div>
      <div className="price-section">
        <label htmlFor="purchase-price">Purchase price</label>
        <input
          type="text"
          id="purchase-price"
          value={purchasePrice}
          onChange={handlePurchasePriceChange}
        />
      </div>
      <button className="add-product-btn" onClick={handleAddProduct}>Add Product</button>
    </div>
  );
};

export default Register;
