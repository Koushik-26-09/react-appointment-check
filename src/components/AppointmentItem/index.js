import './index.css'

const AppointmentItem = props => {
  const {details, toggleStar, deleteAppointment} = props
  const {id, name, formattedDate, isStar} = details

  const onClickStar = () => {
    toggleStar(id)
  }

  const onClickDelete = () => {
    deleteAppointment(id)
  }

  return (
    <li className="appointment-item">
      <div className="appointment-details">
        <p className="title">{name}</p>
        <p className="date">Date: {formattedDate}</p>
      </div>

      <div className="actions">
        <button
          type="button"
          className="star-btn"
          onClick={onClickStar}
          data-testid="star"
        >
          <img
            src={
              isStar
                ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
                : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
            }
            alt="star"
            className="star-icon"
          />
        </button>

        <button type="button" className="delete-btn" onClick={onClickDelete}>
          ❌
        </button>
      </div>
    </li>
  )
}

export default AppointmentItem
