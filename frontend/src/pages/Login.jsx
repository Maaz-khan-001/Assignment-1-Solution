import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', this.state);
      this.props.onLoggedIn(res.data.student._id);

    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
    );
  }
}