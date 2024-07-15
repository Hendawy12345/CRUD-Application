import React, { useState, useEffect } from 'react';
import './App.css';
import { useFormik } from 'formik';
import axios from 'axios';

export default function App() {
  const [dataApi, setDataApi] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  

  async function postData(values) {
    try {
      await axios.post('https://6672a2006ca902ae11b11814.mockapi.io/Crud', values);
      getData();
    } catch (error) {
      console.error('Error posting data:', error);
    }
  }



  async function updateData(id, values) {
    try {
      await axios.put(`https://6672a2006ca902ae11b11814.mockapi.io/Crud/${id}`, values);
      getData();
      setIsUpdating(false);
      setCurrentId(null);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  }

  async function deleteData(id) {

    try {
      await axios.delete(`https://6672a2006ca902ae11b11814.mockapi.io/Crud/${id}`);
      getData();
    } catch (error) {
        console.error('Error deleting data:', error);
    }

  }

  async function getData() {
    try {
      let { data } = await axios.get('https://6672a2006ca902ae11b11814.mockapi.io/Crud');
      setDataApi(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }


  function submitForm(values, { resetForm }) {
    if (!values.NameProduct || !values.PriceProduct || !values.Category || !values.Count || !values.Model || !values.Description) {
      alert('All fields are required');
      return;
    }
    if (isUpdating) {
      updateData(currentId, values);
    } else {
      postData(values);
    }
    resetForm();
  }

  function handleEdit(item) {
    formik.setValues(item);
    setIsUpdating(true);
    setCurrentId(item.id);
  }


  async function deleteAllData() {
    try {
      for (let item of dataApi) {
        await axios.delete(`https://6672a2006ca902ae11b11814.mockapi.io/Crud/${item.id}`);
      }
      getData();
    } catch (error) {
      console.error('Error deleting all data:', error);
    }
  }



  function clearAll(){
    formik.setValues({
      NameProduct: '',
      PriceProduct: '',
      Category: '',
      Count: '',
      Model: '',
      Description: ''
    });
    setIsUpdating(false);
    setCurrentId(null);
  }

  const formik = useFormik({
    initialValues: {
      NameProduct: '',
      PriceProduct: '',
      Category: '',
      Count: '',
      Model: '',
      Description: ''
    },
    onSubmit: submitForm
  });

  return (
    <>
      <div className='header'>
        <h1>C R U D</h1>
        <p>Welcome to CRUD application</p>
      </div>
      <div className='container'>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor='NameProduct'>NameProduct:</label>
          <input
            type='text'
            value={formik.values.NameProduct}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name='NameProduct'
            id='NameProduct'
          />

          <label htmlFor='PriceProduct'>PriceProduct:</label>
          <input
            type='text'
            value={formik.values.PriceProduct}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name='PriceProduct'
            id='PriceProduct'
          />

          <label htmlFor='Category'>Category:</label>
          <input
            type='text'
            value={formik.values.Category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name='Category'
            id='Category'
          />

          <label htmlFor='Count'>Count:</label>
          <input
            type='text'
            value={formik.values.Count}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name='Count'
            id='Count'
          />

          <label htmlFor='Model'>Model:</label>
          <input
            type='text'
            value={formik.values.Model}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name='Model'
            id='Model'
          />

          <label htmlFor='Description'>Description:</label>
          <input
            type='text'
            value={formik.values.Description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name='Description'
            id='Description'
          />

          <button type='submit'>{isUpdating ? 'Update Product' : 'Add Product'}</button>
        </form>
          <div className='clear'>
          <button onClick={clearAll} className='clear_all'>Clear Form</button>
          <button onClick={deleteAllData} className='clear_all'>Delete All Products</button>
          </div>

        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>Index</th>
              <th scope='col'>Name</th>
              <th scope='col'>Price</th>
              <th scope='col'>Category</th>
              <th scope='col'>Count</th>
              <th scope='col'>Model</th>
              <th scope='col'>Description</th>
              <th scope='col'>Update</th>
              <th scope='col'>Delete</th>
            </tr>
          </thead>
          <tbody>
            {dataApi.map((x, index) => (
              <tr key={x.id}>
                <th scope='row'>{index + 1}</th>
                <td>{x.NameProduct}</td>
                <td>{x.PriceProduct}</td>
                <td>{x.Category}</td>
                <td>{x.Count}</td>
                <td>{x.Model}</td>
                <td>{x.Description}</td>
                <td>
                  <button className='update' onClick={()=> handleEdit(x)}>Update</button>
                </td>
                <td>
                  <button onClick={()=>deleteData(x.id) }>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
      </div>
    </>
  );
}
