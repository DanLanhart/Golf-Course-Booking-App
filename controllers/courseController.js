import Course from '../models/Course.js'
import TeeTime from '../models/TeeTime.js'

export const createCourse = async (req, res, next) => {
  const newCourse = new Course(req.body)

  try {
    const savedCourse = await newCourse.save()
    res.status(200).json(savedCourse)
  } catch {
    next(err)
  }
}

export const updateCourse = async (req, res, next) => {
  try {
    const updateCourse = await Course.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )
    res.status(200).json(updateCourse)
  } catch {
    next(err)
  }
}

export const deleteCourse = async (req, res, next) => {
  try {
    await Course.findByIdAndDelete(req.params.id)
    res.status(200).json('Course has been deleted.')
  } catch {
    next(err)
  }
}

export const getCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id)
    res.status(200).json(course)
  } catch {
    next(err)
  }
}

export const getAllCourses = async (req, res, next) => {
  const { min, max, ...others } = req.query
  try {
    const courses = await Course.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit)
    res.status(200).json(courses)
  } catch (err) {
    next(err)
  }
}

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(',')
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Course.countDocuments({ city: city })
      })
    )
    res.status(200).json(list)
  } catch (err) {
    next(err)
  }
}

export const countByType = async (req, res, next) => {
  try {
    const linksCourseCount = await Course.countDocuments({
      type: 'Links Courses',
    })
    const parklandCourseCount = await Course.countDocuments({
      type: 'Parkland Courses',
    })
    const heathlandCourseCount = await Course.countDocuments({
      type: 'Heathland Courses',
    })
    const sandbeltCourseCount = await Course.countDocuments({
      type: 'Sandbelt Courses',
    })
    const championshipCourseCount = await Course.countDocuments({
      type: 'Championship Courses',
    })
    res.status(200).json([
      { type: 'Links Courses', count: linksCourseCount },
      { type: 'Parkland Courses', count: parklandCourseCount },
      { type: 'Heathland Courses', count: heathlandCourseCount },
      { type: 'Sandbelt Courses', count: sandbeltCourseCount },
      { type: 'Championship Courses', count: championshipCourseCount },
    ])
  } catch (err) {
    next(err)
  }
}

export const getTeeTimes = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id)
    const list = await Promise.all(course.teeTimes.map((teeTime) => {
      return TeeTime.findById(teeTime)
    }))
    res.status(200).json(list)
  } catch (err) {
    next(err)
  }
}
