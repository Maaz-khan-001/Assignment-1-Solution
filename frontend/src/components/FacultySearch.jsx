import React, { Component } from 'react';
import axios from 'axios';

export default class FacultySearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      faculty: null,
    };
  }

  handleChange = (e) => {
    this.setState({ name: e.target.value });
  };

  handleSearch = async () => {
    try {
      const res = await axios.get(
        `/api/feedback/search?name=${encodeURIComponent(this.state.name)}`
      );
      this.setState({ faculty: res.data });
      this.props.onSelect(res.data);
    } catch (err) {
      console.error(err);
      alert('Error fetching faculty');
    }
  };

  render() {
    const { name, faculty } = this.state;
    return (
      <div>
        <input
          type="text"
          placeholder="Faculty Name"
          value={name}
          onChange={this.handleChange}
        />
        <button onClick={this.handleSearch}>Search</button>
        {faculty && (
          <div>
            {faculty.name} — {faculty.department}
          </div>
        )}
      </div>
    );
  }
}