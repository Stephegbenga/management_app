// import React, {useEffect, useState} from "react";

// import {Helmet} from "react-helmet";

// const Register = (props) => {
//   const [botName, setBotName] = useState("");

//   useEffect(() => {
//     const onLoad = async () => {};
//     onLoad();
//   }, []);

//   return (
//     <div style={{width: "100%", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center"}}>
//       <div style={{borderColor: "black", borderWidth: 2, width: "80%", height: "80%", display: "flex", flexDirection: "column"}}>
//         {/* head */}
//         <div style={{display: "flex", flex: 1, flexDirection: "row", width: "100%"}}>
//           <div style={{height: 40, width: 120, display: "flex", alignItems: "center", justifyContent: "center",borderBottomWidth:2}}>
//             <p>Hello</p>
//           </div>

//           <div style={{flex: 1, height: "70%", flexDirection:"column", borderColor: "black", borderBottomWidth: 2, borderLeftWidth: 2 }}>
//           <div style={{height: 40, display: "flex", alignItems: "center", justifyContent: "center",borderBottomWidth:2}}>
//           </div>

//           </div>
//         </div>

//         <div style={{display: "flex", flexDirection: "row", width: "100%", height: 40, borderTopWidth: 2, borderColor: "black"}}>
//           <div style={{width: 120, display: "flex", alignItems: "center", justifyContent: "center", }}>
//             <p>Purchase Price</p>
//           </div>

//           <div style={{display: "flex", flex: 1, alignItems: "center", justifyContent: "center", borderLeftWidth: 2, borderColor: "black"}}>
//             <input style={{width: "80%", color: "inherit"}} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;
import React, { useState } from 'react';
import './Register.css';

const Register = () => {
  const [products, setProducts] = useState([
    'ANA5/2024', 'ANA12/2024', 'JAL6/2024', 'JAL12/2024', 'JR', 'PEACH4/2024', 'JetStar 7/2024'
  ]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [pdfFiles, setPdfFiles] = useState([]);
  const [newProduct, setNewProduct] = useState('');

  const handleProductChange = (event) => {
    setSelectedProduct(event.target.value);
  };

  const handlePurchasePriceChange = (event) => {
    setPurchasePrice(event.target.value);
  };

  const handlePdfUpload = (event) => {
    const files = Array.from(event.target.files);
    setPdfFiles(files);
  };

  const handleAddMore = () => {
    if (newProduct) {
      setProducts([...products, newProduct]);
      setNewProduct('');
    }
  };

  const handleAddProduct = () => {
    if (selectedProduct && purchasePrice && pdfFiles.length > 0) {
      console.log('Product added:', selectedProduct, purchasePrice, pdfFiles);
      // Reset form fields
      setSelectedProduct('');
      setPurchasePrice('');
      setPdfFiles([]);
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
          type="text"
          value={newProduct}
          onChange={(e) => setNewProduct(e.target.value)}
          placeholder="Add new product"
        />
        <button className="add-more-btn" onClick={handleAddMore}>Add more</button>
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
