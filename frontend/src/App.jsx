import React, { Component } from 'react';
import Register from './pages/Register';
import Login from './pages/Login';
import FacultySearch from './components/FacultySearch';
import FeedbackForm from './components/FeedbackForm';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentId: null,
      faculty: null,
    };
  }

  handleRegistered = () => {
    // Optionally navigate to login view or auto-login
  };

  handleLoggedIn = (studentId) => {
    this.setState({ studentId });
  };

  handleFacultySelect = (faculty) => {
    this.setState({ faculty });
  };

  render() {
    const { studentId, faculty } = this.state;

    if (!studentId) {
      return (
        <>
          <Register onRegistered={this.handleRegistered} />
          <Login onLoggedIn={this.handleLoggedIn} />
        </>
      );
    }

    if (!faculty) {
      return <FacultySearch onSelect={this.handleFacultySelect} />;
    }

    return (
      <FeedbackForm
        studentId={studentId}
        faculty={faculty}
      />
    );
  }
}