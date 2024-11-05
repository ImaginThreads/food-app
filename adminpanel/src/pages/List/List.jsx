import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from "react-toastify";

const List = () => {
  const url = "http://localhost:4000";
  const [list, setList] = useState([]); // Initialize with useState

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      console.log(response.data);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("An error occurred while fetching data");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div>
      <h2>Food List</h2>
      {list.length > 0 ? (
        <ul>
          {list.map((item) => (
            <li key={item._id}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>Price: ${item.price}</p>
              <p>Category: {item.category}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No items found</p>
      )}
    </div>
  );
};

export default List;
