import React from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';

class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      starts_at: '',
      ends_at: '',
      free: '',
      active: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    const { title, starts_at, ends_at, free, active } = this.state;
    const body = { title, starts_at, ends_at, free, active }
    const token = document.querySelector('meta[name="csrf-token"]').content
    axios
        .post('/api/v1/events',
            body,
            {
              headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
              }
            })
        .then(response => {
          const event = response.data
          this.props.createEvent(event)
        })
        .catch(error => {
          console.log(error)
        })
    e.target.reset()
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
        <div className="container mt-5">
          <div className="row">
            <div className="col-sm-12 col-lg-6 offset-lg-3">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                      type="text"
                      name="title"
                      required
                      className="form-control"
                      id="title"
                      onChange={this.onChange}
                      placeholder="Enter you event title...."
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="starts_at">Start</label>
                  <input
                      type="date"
                      name="starts_at"
                      id="starts_at"
                      className="form-control"
                      required
                      onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="ends_at">End</label>
                  <input
                      type="date"
                      name="ends_at"
                      id="ends_at"
                      className="form-control"
                      required
                      onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <div className="row">
                    <label htmlFor="free">Free</label>
                    <input
                        className="form-control"
                        id="free"
                        type="checkbox"
                        name="free"
                        onChange={this.onChange}
                    />
                    <label htmlFor="active">Active</label>
                    <input
                        className="form-control"
                        id="active"
                        type="checkbox"
                        name="active"
                        onChange={this.onChange}
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-outline-success btn-block mt-3">
                  Create Event
                </button>
              </form>
            </div>
          </div>
        </div>
    )
  }
}

export default EventForm;

EventForm.propTypes = {
  createEvent: PropTypes.func.isRequired,
}