import React, { Component } from 'react';
import axios from 'axios';

export default class FeedbackForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      responses: [],
      comment: ''
    };
    this.questions = [
      { id: 'q1', text: 'Quality of teaching' },
      // ... up to 10 questions ...
    ];
  }

  handleResponseChange = (questionId, value) => {
    this.setState(prevState => {
      const others = prevState.responses.filter(r => r.questionId !== questionId);
      return { responses: [...others, { questionId, answer: value }] };
    });
  };

  handleCommentChange = (e) => {
    this.setState({ comment: e.target.value });
  };

  handleSubmit = async () => {
    const { studentId, faculty } = this.props;
    const { responses, comment } = this.state;

    try {
      await axios.post('/api/feedback', {
        studentId,
        feedback: { faculty: faculty._id, responses, comment }
      });
      alert('Thank you for your feedback!');
    } catch (err) {
      console.error(err);
      alert('Error submitting feedback');
    }
  };

  render() {
    const { faculty } = this.props;
    return (
      <div>
        <h2>Feedback for {faculty.name}</h2>
        {this.questions.map(q => (
          <div key={q.id}>
            <label>{q.text}</label>
            <input
              type="number"
              min="1"
              max="5"
              onChange={e => this.handleResponseChange(q.id, e.target.value)}
            />
          </div>
        ))}
        <textarea
          placeholder="Additional comments"
          value={this.state.comment}
          onChange={this.handleCommentChange}
        />
        <button onClick={this.handleSubmit}>Submit Feedback</button>
      </div>
    );
  }
}