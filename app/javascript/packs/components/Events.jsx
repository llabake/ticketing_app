import React from 'react'
import ReactDOM from 'react-dom'

import axios from 'axios';

import EventsList from "./EventsList";
import Event from "./Event";
import EventForm from "./EventForm";

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };

    this.getEvents = this.getEvents.bind(this);
    this.createEvent = this.createEvent.bind(this);
  }

  componentDidMount() {
    this.getEvents();
  }

  getEvents() {
    axios.get('api/v1/events')
        .then(response => {
          const events = response.data;
          this.setState({ events })
        }).catch(error => {
          console.log(error)
    })
  }

  createEvent(event) {
    const events = [event,  ...this.state.events]
    this.setState({ events });
  }

  render() {
    return (
      <>
        <EventForm createEvent={this.createEvent} />
        <EventsList>
          {this.state.events.map(event => (
              <Event event={event} key={event.id} />
          ))}
        </EventsList>
      </>
    );
  }
}

document.addEventListener('turbolinks:load', () => {
  const app = document.getElementById('events')
  app && ReactDOM.render(<Events />, app)
})
