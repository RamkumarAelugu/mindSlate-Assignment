import React, { Component } from 'react';
import axios from 'axios';
import './App.css'; // Optional: Add a CSS file for styling

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMessage: ''
        };
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const { email, password } = this.state;

        try {
            const response = await axios.post('http://localhost:5000/login', { email, password });
            const token = response.data.token;
            localStorage.setItem('token', token); // Store JWT token in local storage
            this.props.history.push('/dashboard'); // Redirect to dashboard after successful login
        } catch (error) {
            this.setState({ errorMessage: 'Invalid email or password' });
        }

  
    }

    render() {
        return (
          <>
            <div className = "container">
            <div className="login-container">
                <form className="login-form" onSubmit={this.handleSubmit}>
                    <img src = "https://res.cloudinary.com/dn5tjlndx/image/upload/v1723709236/v83mdwkomlxdqndmdtwq.png" className = "image" alt = "mindslate-logo"/>
                    <h2  className= "heading">Welcome to MindSlate</h2>
                    {this.state.errorMessage && (
                        <div className="error-message">{this.state.errorMessage}</div>
                    )}
                    <div className="input-group">
                        <label htmlFor="email" className = "Email">Email:</label>
                        <input
                            type="email"
                            name="email"
                            className = "input"
                            value={this.state.email}
                            onChange={this.handleInputChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password" className = "Email">Password:</label>
                        <input
                            type="password"
                            name="password"
                            className = "input"
                            value={this.state.password}
                            onChange={this.handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
            </div>
            </div>
            </>
        )
        
    }
}


export default Login;