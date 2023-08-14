import React, { Component, Fragment } from "react";
import "./style.css";
import { Link, Navigate, Redirect } from "react-router-dom";
import axios from "axios";
import AppURL from "../../api/AppURL";

class UserLogin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      message: "",
    };
  }

  formSubmitHandler(event) {
    event.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password,
    };

    axios
      .post(AppURL.UserLogin, data)
      .then((response) => {
        if (response.data.status === true) {
          localStorage.setItem("token", response.data.token);
          console.log(response.data);
          window.location.reload();
        } else {

          this.setState({
            PageRefreshStatus: true,
          });
        }
      })
      .catch((error) => { });
  }


  render() {

    // Redirect After Login
    if (this.state.loggedIn) {
      return <Navigate to="/" />;
    }

    // Authorization
    if (localStorage.getItem("token")) {
      return <Navigate to="/" />;
    }

    return (
      <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            SemangQa
          </a>
          <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">

              <form onSubmit={this.formSubmitHandler.bind(this)}>
                <div>
                  <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input type="email" name="email" id="email" class="form-inputs bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""
                    onChange={(e) => {
                      this.setState({ email: e.target.value });
                    }} />
                </div>
                <div>
                  <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input id="passwordField"
                    type="password" name="password" placeholder="••••••••" class="form-inputs bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                    onChange={(e) => {
                      this.setState({ password: e.target.value });
                    }} />
                </div>

                <button type="submit" class="w-full text-dark bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>

              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}


export default UserLogin;

