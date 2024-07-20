// src/pages/UserDashboard.jsx
import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function UserDashboard() {
  const [bills, setBills] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBills = async () => {
      const q = query(collection(db, 'bills'), where('userId', '==', auth.currentUser.uid));
      const querySnapshot = await getDocs(q);
      const billsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBills(billsList);
    };
    fetchBills();
  }, []);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate('/login');
    }).catch(error => {
      console.error("Error signing out: ", error);
    });
  };

  return (
    <div>
      <h2>User Dashboard</h2>
      <button onClick={handleSignOut}>Sign Out</button>
      <ul>
        {bills.map(bill => (
          <li key={bill.id}>
            {bill.month}: ${bill.amount} {bill.paid ? 'Paid' : <button>Pay</button>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserDashboard;
