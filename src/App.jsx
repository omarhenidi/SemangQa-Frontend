import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "layouts";
import UserLogin from "./views/login"; // Update the path
import axios from "axios";
import "App.css"
import AppURL from "api/AppURL";
class App extends Component {
  state = {
    user: null, // Initialize user as null
    loading: true, // Add loading state to handle data fetching
  };

  componentDidMount() {
    this.fetchUserData();
  }

  fetchUserData = () => {
    axios
      .get(AppURL.UserData)
      .then((response) => {
        this.setState({ user: response.data.data, loading: false });
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        this.setState({ loading: false });
      });
  };

  render() {
    const isAuthenticated = localStorage.getItem("token");
    const { user, loading } = this.state;

    return (
      <Routes>
        <Route
          path="admin/*"
          element={
            isAuthenticated ? (
              <AdminLayout user={user} setUser={this.fetchUserData} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/login" element={<UserLogin />} />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate user={user} setUser={this.fetchUserData} to="/admin" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    );
  }
}

export default App;
