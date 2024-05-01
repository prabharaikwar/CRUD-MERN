import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    employee_name: '',
    employee_salary: 0
  });

  const [editedData, setEditedData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:4000/')
      .then((res) => {
        console.log(res, 'res');
        setData(res.data);
      }).catch((err) => {
        console.log(err, 'err in fetching');
      })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    axios.post('http://localhost:4000/', formData)
      .then((res) => {
        console.log(res);
        fetchData();
      }).catch((err) => {
        console.log(err, 'err in add');
      })
  };

  const handleDelete = (deleteId) => {
    axios.delete(`http://localhost:4000/${deleteId}`)
      .then((res) => {
        console.log(res, 'res in delete');
        fetchData();
      }).catch((err) => console.log(err, 'delete err'));
  };

  const handleUpdate = (editId) => {
    axios.put(`http://localhost:4000/${editId}`, editedData)
      .then((res) => {
        console.log(res);
        fetchData();
        setIsEditing(false);
      }).catch((err) => {
        console.log(err, 'err in upadte');
      })
  };

  const handleEdit = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value;
    setData(newData);
    setEditedData(newData[index]);
  };

  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    setEditedData({ employee_name: employee.employee_name, employee_salary: employee.employee_salary });
    setIsEditing(true);
  };

  return (
    <div className='container'>
      <h1 className="justify-center">CRUD in MERN</h1>
      <div className="row">
        <form onSubmit={handleSubmit}>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <label>Employee Name</label>
              <input
                type='text'
                className='mx-1'
                value={formData.employee_name || ''}
                onChange={(e) => setFormData({ ...formData, employee_name: e.target.value })}
                placeholder='Employee name'
              />
            </div>
            <div className="col-md-6 mt-1">
              <label>Employee Salary</label>
              <input
                type='number'
                className='mx-1'
                value={formData.employee_salary || ''}
                onChange={(e) => setFormData({ ...formData, employee_salary: e.target.value })}
                placeholder='Employee salary'
              />
            </div>
          </div>
          <button className='btn btn-primary' type='submit'>Add</button>
        </form>
        <ul>
          {
            data.map((item, index) => (
              <li key={index}>
                {isEditing && selectedEmployee && selectedEmployee._id === item._id ? (
                  <>
                    <input
                      type="text"
                      value={item.employee_name}
                      onChange={(e) => handleEdit(index, 'employee_name', e.target.value)}
                    />
                    <input
                      type="number"
                      value={item.employee_salary}
                      onChange={(e) => handleEdit(index, 'employee_salary', e.target.value)}
                    />
                    <button onClick={() => handleDelete(item._id)}>Delete</button>
                    <button onClick={() => handleUpdate(item._id)}>Update</button>
                  </>
                )
                  : (
                    <>
                      {item.employee_name} - {item.employee_salary}
                      <button onClick={() => handleDelete(item._id)}>Delete</button>
                      <button onClick={() => handleEditClick(item)}>Update</button>
                    </>
                  )}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;