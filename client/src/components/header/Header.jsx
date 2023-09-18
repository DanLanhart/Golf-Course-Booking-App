import {
  faCalendarDays,
  faPerson,
  faGolfBallTee,
  faShirt,
  faTrophy,
  faBook,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './header.css'
import { DateRange } from 'react-date-range'
import { useContext, useState } from 'react'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext'
import { AuthContext } from '../../context/AuthContext'
import { Link } from 'react-router-dom'

const Header = ({ type }) => {
  const [destination, setDestination] = useState('')
  const [openDate, setOpenDate] = useState(false)
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ])
  const [openOptions, setOpenOptions] = useState(false)
  const [options, setOptions] = useState({
    player: 1,
  })

  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === 'i' ? options[name] + 1 : options[name] - 1,
      }
    })
  }

  const { dispatch } = useContext(SearchContext)

  const handleSearch = () => {
    dispatch({ type: 'NEW_SEARCH', payload: { destination, dates, options } })
    navigate('/courses', { state: { destination, dates, options } })
  }

  return (
    <div className="header">
      <div
        className={
          type === 'list' ? 'headerContainer listMode' : 'headerContainer'
        }
      >
        <div className="headerList">
          <div className="headerListItem active">
          <FontAwesomeIcon icon={faGolfBallTee} />
            <span>Tee Times</span>
          </div>
          <div className="headerListItem">
          <FontAwesomeIcon icon={faTrophy} />
            <span>Tournaments</span>
          </div>
          <div className="headerListItem">
          <FontAwesomeIcon icon={faShirt} />
            <span>Apparel</span>
          </div>
          <div className="headerListItem">
          <FontAwesomeIcon icon={faBook} />
            <span>Learn</span>
          </div>
        </div>
        {type !== 'list' && (
          <>
            <h1 className="headerTitle">
              The Best Deals On Tee Times? Yeah, we Do That.
            </h1>
            <p className="headerDesc">
              Get rewarded for your golfing – unlock instant savings of 20% off your next tee time and
              more with a free Lanhart Golf account
            </p>
            {!user && (
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <button className="headerBtn">Sign in / Register</button>
              </Link>
            )}
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="headerIcon" />
                <input
                  type="text"
                  placeholder="Where are we golfing?"
                  className="headerSearchInput"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >{`${format(dates[0].startDate, 'MM/dd/yyyy')} to ${format(
                  dates[0].endDate,
                  'MM/dd/yyyy'
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="headerSearchText"
                >{`${options.player} player`}</span>
                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Player</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.player <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption('player', 'd')}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.player}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption('player', 'i')}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Header
