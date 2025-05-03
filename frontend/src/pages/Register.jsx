import React, { Component } from 'react';
import axios from 'axios';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '', email: '', password: '' };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', this.state);
      this.props.onRegistered();
      alert("registered successfully");
    } catch (err) {
      console.error(err);
      alert('Registration failed');
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          onChange={this.handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          onChange={this.handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={this.handleChange}
        />
        <button type="submit">Register</button>
      </form>
    );
  }
}