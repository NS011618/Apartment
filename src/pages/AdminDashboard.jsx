// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [billDetails, setBillDetails] = useState({ userId: '', month: '', amount: '' });

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const usersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersList);
    };
    fetchUsers();
  }, []);

  const handleAddBill = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'bills'), billDetails);
      alert('Bill added successfully');
    } catch (error) {
      console.error("Error adding bill: ", error);
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <form onSubmit={handleAddBill}>
        <select onChange={(e) => setBillDetails({ ...billDetails, userId: e.target.value })}>
          <option value="">Select User</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.email}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Month"
          value={billDetails.month}
          onChange={(e) => setBillDetails({ ...billDetails, month: e.target.value })}
        />
        <input
          type="number"
          placeholder="Amount"
          value={billDetails.amount}
          onChange={(e) => setBillDetails({ ...billDetails, amount: e.target.value })}
        />
        <button type="submit">Add Bill</button>
      </form>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
