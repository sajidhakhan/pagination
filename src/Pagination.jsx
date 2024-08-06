import React, { useState,useEffect } from 'react'

const Pagination = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;
  
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setData(data);
          } catch (error) {
            setError('Failed to fetch data');
            alert('Failed to fetch data');
          }
        };
    
        fetchData();
      }, []);
  
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);
  
    const totalPages = Math.ceil(data.length / rowsPerPage);
  
    const handleNextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };
  
    const handlePreviousPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };
  
    if (error) {
      return <div>{error}</div>;
    }
  
    if (data.length === 0) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
        <h1 style={{textAlign: 'center'}}>Employee Data Table</h1>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='buttons'>
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span className="page-number"> {currentPage} </span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
    );
}

export default Pagination