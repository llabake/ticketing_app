import React from 'react';

import PropTypes from 'prop-types'
import axios from 'axios';

class Event extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      free: this.props.event.free,
      title: this.props.event.title,
      active: this.props.event.active,
      starts_at: this.props.event.starts_at,
      ends_at: this.props.event.ends_at
    }

    this.handleDelete = this.handleDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateEvent = this.updateEvent.bind(this);
  }

  handleDelete() {
    const token = document.querySelector('meta[name="csrf-token"]').content
    axios.delete(
        `api/v1/events/${this.props.event.id}`,
        {
          headers: {
            "X-CSRF-Token": token,
            "Content-Type": "application/json"
          }
        }
    ).then(response => {
      this.props.getEvents();
    })
        .catch(error => {
          console.log(error)
        })
  }

  handleChange(event) {
    this.updateEvent(event);
  }

  updateEvent(event) {
    this.setState({ [event.target.name]: event.target.value });
    const { title, starts_at, ends_at, free, active } = this.state;
    const body = { title, starts_at, ends_at, free, active }
    const token = document.querySelector('meta[name="csrf-token"]').content
    axios.put(
        `api/v1/events/${this.props.event.id}`,
        body,
        {
          headers: {
            "X-CSRF-Token": token,
            "Content-Type": "application/json"
          }
        }
    ).then(response => {})
        .catch(error => {
          console.log(error);
        })

  }

  render() {
    const { event } = this.props
    return (
        <tr className={`${this.state.free ? 'table-light' : ''}`}>
          <td>
            <input
                type="text"
                defaultValue={event.title}
                disabled={this.state.free}
                className="form-control"
                onChange={this.handleChange}
                id={`event__title-${event.id}`}
            />
          </td>
          <td>
            <svg
                className={`bi bi-check-circle ${
                    this.state.free ? `text-success` : `text-muted`
                }`}
                width="2em"
                height="2em"
                viewBox="0 0 20 20"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  fillRule="evenodd"
                  d="M17.354 4.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3-3a.5.5 0 11.708-.708L10 11.293l6.646-6.647a.5.5 0 01.708 0z"
                  clipRule="evenodd"
              />
              <path
                  fillRule="evenodd"
                  d="M10 4.5a5.5 5.5 0 105.5 5.5.5.5 0 011 0 6.5 6.5 0 11-3.25-5.63.5.5 0 11-.5.865A5.472 5.472 0 0010 4.5z"
                  clipRule="evenodd"
              />
            </svg>
          </td>
          <td>
            <input
                type="text"
                defaultValue={event.starts_at}
                className="form-control"
                onChange={this.handleChange}
                id={`event__title-${event.id}`}
            />
          </td>
          <td>
            <input
                type="text"
                defaultValue={event.ends_at}
                onChange={this.handleChange}
                className="form-control"
                id={`event__title-${event.id}`}
            />
          </td>
          <td className="text-right">
            <div className="form-check form-check-inline">
              <input
                  type="boolean"
                  defaultChecked={this.state.free}
                  type="checkbox"
                  className="form-check-input"
                  onChange={this.handleChange}
                  id={`free-${event.id}`}
              />
              <label
                  className="form-check-label"
                  htmlFor={`free-${event.id}`}
              >
                Free
              </label>
            </div>
            <button className="btn btn-outline-danger" onClick={this.handleDelete}>Delete</button>
          </td>
        </tr>
    )
  }
}

export default Event
Event.propTypes = {
  event: PropTypes.object.isRequired,
  getEvents: PropTypes.func.isRequired
}
