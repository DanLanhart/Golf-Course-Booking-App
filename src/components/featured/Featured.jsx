import useFetch from '../../hooks/useFetch.js'
import './featured.css'

const Featured = () => {
  const { data, loading, error } = useFetch(
    'http://localhost:8800/api/courses/countByCity?cities=arizona,georgia,florida'
  )

  return (
    <div className="featured">
      {loading ? (
        'Loading, please wait'
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://golf.com/wp-content/uploads/2020/10/we-ko-pa.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Arizona</h1>
              <h2>{data[0]} courses</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://golf.com/wp-content/uploads/2019/11/Augusta-National.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Georgia</h1>
              <h2>{data[1]} courses</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://images.ctfassets.net/56u5qdsjym8c/3b96eGN9KodYhSYaBsYpI/261024d195ef6803bca98d4e10fd2793/Blue-Doral-Monster-Hero.jpg?fl=progressive&q=80"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Florida</h1>
              <h2>{data[2]} courses</h2>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Featured
