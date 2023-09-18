import './course.css'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import MailList from '../../components/mailList/MailList'
import Footer from '../../components/footer/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons'
import { useContext, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import { useLocation, useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext'
import { AuthContext } from '../../context/AuthContext'
import Reserve from '../../components/reserve/Reserve'

const Course = () => {
  const location = useLocation()
  const id = location.pathname.split('/')[2]
  const [slideNumber, setSlideNumber] = useState(0)
  const [open, setOpen] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  const { data, loading, error } = useFetch(
    `http://localhost:8800/api/courses/find/${id}`
  )

  const { dates, options } = useContext(SearchContext)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime())
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY)
    return diffDays
  }

  const days =
    dates[0]?.endDate && dates[0]?.startDate
      ? dayDifference(dates[0].endDate, dates[0].startDate)
      : 0

  const handleOpen = (i) => {
    setSlideNumber(i)
    setOpen(true)
  }

  const handleMove = (direction) => {
    let newSlideNumber

    if (direction === 'l') {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1
    }

    setSlideNumber(newSlideNumber)
  }

  const handleClick = () => {
    if (user) {
      setOpenModal(true)
    } else {
      navigate('/login')
    }
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        'Loading...'
      ) : (
        <div className="courseContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove('l')}
              />
              <div className="sliderWrapper">
                <img
                  src={data.photos[slideNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove('r')}
              />
            </div>
          )}
          <div className="courseWrapper">
            <button className="bookNow">Reserve or Book Now!</button>
            <h1 className="courseTitle">{data.name}</h1>
            <div className="courseAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="courseDistance">
              Excellent location – {data.distance}m from city center
            </span>
            <span className="coursePriceHighlight">
              Book tee times over ${data.cheapestPrice} at this course and get a
              free local resort stay
            </span>
            <div className="courseImages">
              {data.photos?.map((photo, i) => (
                <div className="courseImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className="courseImg"
                  />
                </div>
              ))}
            </div>
            <div className="courseDetails">
              <div className="courseDetailsTexts">
                <h1 className="courseTitle">{data.title}</h1>
                <p className="courseDesc">{data.desc}</p>
              </div>
              <div className="courseDetailsPrice">
                <h1>Perfect for a {days}-days golf session!</h1>
                <span>
                  Located in the heart of your destination, this course has an
                  excellent location score of 9.8!
                </span>
                <h2>
                  <b>${days * data.cheapestPrice}</b> ({days} days)
                </h2>
                <button onClick={handleClick}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} courseId={id}/>}
    </div>
  )
}

export default Course
