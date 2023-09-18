import express from 'express'
import { countByType, countByCity, createCourse, deleteCourse, getAllCourses, getCourse, updateCourse, getTeeTimes } from '../controllers/courseController.js'
import { verifyAdmin } from '../utils/verifyToken.js'

const router = express.Router()

// CREATE
router.post('/', verifyAdmin, createCourse)

// UPDATE
router.put('/:id', verifyAdmin, updateCourse)

// DELETE
router.delete('/:id', verifyAdmin, deleteCourse)

// GET
router.get('/find/:id', getCourse)

// GET ALL
router.get('/', getAllCourses)
router.get('/countByCity', countByCity)
router.get('/countByType', countByType)
router.get('/teeTime/:id', getTeeTimes)

export default router
