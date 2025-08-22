import {Component} from 'react'
import {format} from 'date-fns'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    appointmentList: [],
    name: '',
    date: '',
    showStarred: false,
  }

  handleDate = e => {
    this.setState({date: e.target.value}) // keep raw date for input
  }

  handleName = e => {
    this.setState({name: e.target.value})
  }

  addAppointment = e => {
    e.preventDefault()
    const {name, date} = this.state
    if (name !== '' && date !== '') {
      const newAppointment = {
        id: uuidv4(),
        isStar: false,
        name,
        date,
        formattedDate: format(new Date(date), 'dd MMMM yyyy, EEEE'),
      }
      this.setState(prev => ({
        appointmentList: [...prev.appointmentList, newAppointment],
        name: '',
        date: '',
      }))
    }
  }

  toggleStar = id => {
    this.setState(prev => ({
      appointmentList: prev.appointmentList.map(each =>
        each.id === id ? {...each, isStar: !each.isStar} : each,
      ),
    }))
  }

  deleteAppointment = id => {
    this.setState(prev => ({
      appointmentList: prev.appointmentList.filter(each => each.id !== id),
    }))
  }

  toggleStarredFilter = () => {
    this.setState(prev => ({showStarred: !prev.showStarred}))
  }

  render() {
    const {appointmentList, name, date, showStarred} = this.state
    const filteredList = showStarred
      ? appointmentList.filter(each => each.isStar)
      : appointmentList

    return (
      <div className="bg-container">
        <div className="card-container">
          <h1 className="header">Add Appointment</h1>
          <div className="child-container-and-image">
            <form
              onSubmit={this.addAppointment}
              className="form-child-container"
            >
              <label htmlFor="titleInput" className="label">
                TITLE
              </label>
              <input
                id="titleInput"
                type="text"
                value={name}
                onChange={this.handleName}
                placeholder="Title"
                className="input"
              />

              <label htmlFor="dateInput" className="label">
                DATE
              </label>
              <input
                id="dateInput"
                type="date"
                value={date}
                onChange={this.handleDate}
                className="input"
              />

              <button className="button" type="submit">
                Add
              </button>
            </form>

            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointment-image"
            />
          </div>

          <hr className="separator" />

          <div className="appointments-list-container">
            <div className="top-headers">
              <h1 className="header">Appointments</h1>
              <button
                className={`starred-filter ${showStarred ? 'active' : ''}`}
                onClick={this.toggleStarredFilter}
              >
                Starred
              </button>
            </div>

            <ul className="appointment-list-items">
              {filteredList.map(each => (
                <AppointmentItem
                  key={each.id}
                  details={each}
                  toggleStar={this.toggleStar}
                  deleteAppointment={this.deleteAppointment}
                />
              ))}
            </ul>
          </div>

          {/* Footer Section */}
        </div>
        <footer className="footer">
          <p>
            Designed by <strong>Koushik</strong> |
            <a
              href="https://github.com/Koushik-26-09/"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>{' '}
            |{' '}
            <a
              href="https://www.linkedin.com/in/koushik26"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </p>
        </footer>
      </div>
    )
  }
}

export default Appointments
