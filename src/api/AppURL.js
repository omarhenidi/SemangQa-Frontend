class AppURL {
    // Base URL for the API
    static BaseURL = "http://127.0.0.1:8000/api";

    // Authentication URLs
    static UserData = this.BaseURL + "/user";          // Fetch user data
    static UserLogin = this.BaseURL + "/auth/login";   // User login route
    static UserRegister = this.BaseURL + "/register";  // User registration route

    // Task URLs
    static GetTask = this.BaseURL + "/tasks";          // Get all tasks
    static AddTask = this.BaseURL + "/tasks";          // Add a new task
    static UpdateTask(id) {                           // Update a task by ID
        return this.BaseURL + "/task/" + id;
    }
    static DeleteTask(id) {                           // Delete a task by ID
        return this.BaseURL + "/task/" + id;
    }
}

export default AppURL;
