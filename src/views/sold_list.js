import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { parse, isWithinInterval } from 'date-fns';
import './sold_list.css';

const SoldList = () => {
  const initialSoldProducts = [
    { name: 'JAL10/2024', productNumber: 'B10001', registrationDate: '13/02/2024', soldDate: '10/03/2024', purchasePrice: 1000, sellingPrice: 2000, sold: 2 },
    { name: 'JAL10/2024', productNumber: 'B10002', registrationDate: '14/02/2024', soldDate: '10/03/2024', purchasePrice: 1000, sellingPrice: 2000, sold: 2 },
    { name: 'JAL10/2024', productNumber: 'B10006', registrationDate: '20/02/2024', soldDate: '21/03/2024', purchasePrice: 1000, sellingPrice: 2000, sold: 2 },
    { name: 'JAL10/2024', productNumber: 'B10008', registrationDate: '02/03/2024', soldDate: '12/04/2024', purchasePrice: 1000, sellingPrice: 1900, sold: 2 },
    { name: 'JAL10/2024', productNumber: 'B10009', registrationDate: '02/03/2024', soldDate: '17/04/2024', purchasePrice: 1000, sellingPrice: 1900, sold: 2 },
    { name: 'JAL10/2024', productNumber: 'B10010', registrationDate: '02/03/2024', soldDate: '17/04/2024', purchasePrice: 1000, sellingPrice: 1900, sold: 2 },
  ];

  const [soldProducts, setSoldProducts] = useState(initialSoldProducts);
  const [startDate, setStartDate] = useState(new Date('2024-02-30'));
  const [endDate, setEndDate] = useState(new Date());

  const handleFilterChange = (date, setDate) => {
    setDate(date);
  };

  const filteredProducts = soldProducts.filter(product => {
    try {
      const soldDate = parse(product.soldDate, 'dd/MM/yyyy', new Date());
      return isWithinInterval(soldDate, { start: startDate, end: endDate });
    } catch (error) {
      console.error(`Error parsing sold date: ${error}`);
      return false;
    }
  });

  const calculateTotals = (products) => {
    const totalPurchasePrice = products.reduce((total, product) => total + product.purchasePrice, 0);
    const totalSellingPrice = products.reduce((total, product) => total + product.sellingPrice, 0);
    const totalSold = products.reduce((total, product) => total + product.sold, 0);
    return { totalPurchasePrice, totalSellingPrice, totalSold };
  };

  const { totalPurchasePrice, totalSellingPrice, totalSold } = calculateTotals(filteredProducts);

  return (
    <div className="sold-list-page">
      <h1>Sold list</h1>
      <div style={{ marginTop: 20 }} className="date-picker-container">
        <h3>From</h3>
        <DatePicker
          selected={startDate}
          onChange={(date) => handleFilterChange(date, setStartDate)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="dd/MM/yyyy"
        />
        <h3>To</h3>
        <DatePicker
          selected={endDate}
          onChange={(date) => handleFilterChange(date, setEndDate)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          dateFormat="dd/MM/yyyy"
        />
        <button onClick={() => handleFilterChange(new Date(), setEndDate)}>Filter</button>
      </div>
      <table className="sold-product-table">
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
          {filteredProducts.map(product => (
            <tr key={product.productNumber}>
              <td>{product.name}</td>
              <td>{product.productNumber}</td>
              <td>{product.registrationDate}</td>
              <td>{product.soldDate}</td>
              <td>{product.purchasePrice}</td>
              <td>{product.sellingPrice}</td>
              <td>{product.sold}</td>
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

export default SoldList;
