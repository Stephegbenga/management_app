import React, { useState, useEffect } from 'react';
import {get_product} from "../api"
import {convertTimestampToDate} from "../util"
import './ExhibitionList.css';

const ExhibitionList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() =>  {
    async function load_products(){
      let response = await get_product("exhibition")
      if(response){
        setProducts(response.data)
      }
    }

    load_products()
  }, []);


  const handleMarkAsSold = (productNumber) => {
    setProducts(products.map(product => 
      product.product_no === productNumber ? { ...product, sold: true, soldDate: new Date().toISOString().split('T')[0] } : product
    ));
  };

  const calculateTotals = () => {
    const totalPurchasePrice = products.reduce((total, product) => total + Number(product.purchase_price), 0);
    const totalSellingPrice = products.reduce((total, product) => total + Number(product.selling_price), 0);
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
              <td>{product.product_no}</td>
              <td>{convertTimestampToDate(product.registration_date)}</td>
              <td>{product.sold ? product.soldDate : ''}</td>
              <td>{product.purchase_price}</td>
              <td>{product.sellingPrice}</td>
              <td>
                {/* {product.sold ? (
                  '2'
                ) : (
                  <button onClick={() => handleMarkAsSold(product.productNumber)}>1</button>
                )} */}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4">Total</td>
            <td>{totalPurchasePrice}</td>
            <td>{isNaN(totalSellingPrice) ? '' : totalSellingPrice}</td>
            <td>{totalSold}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ExhibitionList;
