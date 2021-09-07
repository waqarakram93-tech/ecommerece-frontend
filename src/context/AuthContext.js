import { useState, useEffect, createContext } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthState = ({ children }) => {
  const authToken = localStorage.getItem('token');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState({})

  useEffect(() => authToken && setIsAuthenticated(true), [authToken]);

  useEffect(() => {
    const getMe = async () => {
      try {
        setLoading(true);
        const {
          data
        } = await axios.get(`${process.env.REACT_APP_ECOMMERCE_FINAL}/auth/me`, { headers: { Authorization: authToken } });
        setProfile(data)
        setLoading(false);
      } catch (error) {
        if (error.response) {
          setError(error.response.data.error);
          setTimeout(() => setError(null), 3000);
          setLoading(false);
        } else {
          setError(error.message);
          setTimeout(() => setError(null), 3000);
          setLoading(false);
        }
      }
    }
    isAuthenticated && getMe()

  }, [isAuthenticated])

  const updateUserInfo = async data => {
    const axiosConfig = {
      headers: { Authorization: authToken }
    };
    try {
      setLoading(true);
      const {
        data: updatedUser
      } = await axios.put(`${process.env.REACT_APP_ECOMMERCE_FINAL}/auth/updateme`, data, axiosConfig);

      const { first_name, last_name, address, postcode, city, phone } = updatedUser

      setProfile(prev => ({ ...prev, firstname: first_name, lastname: last_name, address, postcode, city, phone }))

      setLoading(false);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
        setTimeout(() => setError(null), 3000);
        setLoading(false);
      } else {
        setError(error.message);
        setTimeout(() => setError(null), 3000);
        setLoading(false);
      }
    }
  };


  const signUp = async data => {
    if (data.password !== data.passwordConfirm) {
      setError('Passwords do not match');
      setTimeout(() => setError(null), 3000);
      return;
    }
    try {
      setLoading(true);
      const {
        data: { token }
      } = await axios.post(`${process.env.REACT_APP_ECOMMERCE_FINAL}/auth/signup`, data);
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
        setTimeout(() => setError(null), 3000);
        setLoading(false);
      } else {
        setError(error.message);
        setTimeout(() => setError(null), 3000);
        setLoading(false);
      }
    }
  };

  const signIn = async data => {
    try {
      setLoading(true);
      const {
        data: { token }
      } = await axios.post(`${process.env.REACT_APP_ECOMMERCE_FINAL}/auth/signin`, data);
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
        setTimeout(() => setError(null), 3000);
        setLoading(false);
      } else {
        setError(error.message);
        setTimeout(() => setError(null), 3000);
        setLoading(false);
      }
    }
  };

  const signOut = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ loading, isAuthenticated, profile, error, signUp, signIn, signOut, updateUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
