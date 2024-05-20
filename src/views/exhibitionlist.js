import React, { useState } from 'react';
import './ExhibitionList.css';

const ExhibitionList = () => {
  const initialProducts = [
    { name: 'ANA5/2024', productNumber: 'A10001', registrationDate: '2024/2/13', purchasePrice: 1000, sellingPrice: 2000, sold: false },
    { name: 'ANA5/2024', productNumber: 'A10002', registrationDate: '2024/2/14', purchasePrice: 1000, sellingPrice: 2000, sold: false },
    { name: 'ANA5/2024', productNumber: 'A10003', registrationDate: '2024/2/14', purchasePrice: 1000, sellingPrice: 2000, sold: false },
    { name: 'ANA5/2024', productNumber: 'A10004', registrationDate: '2024/2/14', purchasePrice: 1000, sellingPrice: 2000, sold: false },
    { name: 'ANA5/2024', productNumber: 'A10005', registrationDate: '2024/2/20', purchasePrice: 1000, sellingPrice: 2000, sold: false },
    { name: 'ANA5/2024', productNumber: 'A10006', registrationDate: '2024/2/20', purchasePrice: 1000, sellingPrice: 2000, sold: false },
    { name: 'ANA5/2024', productNumber: 'A10009', registrationDate: '2024/3/2', purchasePrice: 1000, sellingPrice: 2000, sold: false },
    { name: 'ANA5/2024', productNumber: 'A10010', registrationDate: '2024/3/2', purchasePrice: 1000, sellingPrice: 2000, sold: false }
  ];

  const [products, setProducts] = useState(initialProducts);

  const handleMarkAsSold = (productNumber) => {
    setProducts(products.map(product => 
      product.productNumber === productNumber ? { ...product, sold: true, soldDate: new Date().toISOString().split('T')[0] } : product
    ));
  };

  const calculateTotals = () => {
    const totalPurchasePrice = products.reduce((total, product) => total + product.purchasePrice, 0);
    const totalSellingPrice = products.reduce((total, product) => total + product.sellingPrice, 0);
    const totalSold = products.filter(product => product.sold).length;
    return { totalPurchasePrice, totalSellingPrice, totalSold };
  };

  const { totalPurchasePrice, totalSellingPrice, totalSold } = calculateTotals();

  return (
    <div className="exhibition-list-page">
      <h1>Exhibition list</h1>
      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Product number</th>
            <th>Registration date</th>
            <th>Sold date</th>
            <th>Purchase price</th>
            <th>Selling price</th>
            <th>Sold</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.productNumber} className={product.sold ? 'sold' : ''}>
              <td>{product.name}</td>
              <td>{product.productNumber}</td>
              <td>{product.registrationDate}</td>
              <td>{product.sold ? product.soldDate : ''}</td>
              <td>{product.purchasePrice}</td>
              <td>{product.sellingPrice}</td>
              <td>
                {product.sold ? (
                  '2'
                ) : (
                  <button onClick={() => handleMarkAsSold(product.productNumber)}>1</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4">Total</td>
            <td>{totalPurchasePrice}</td>
            <td>{totalSellingPrice}</td>
            <td>{totalSold}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ExhibitionList;
