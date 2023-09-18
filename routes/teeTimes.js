import express from 'express'
import { createTeeTime, deleteTeeTime, getAllTeeTimes, getTeeTime, updateTeeTime, updateTeeTimeAvailability } from '../controllers/teeTimeController.js'
import { verifyAdmin } from '../utils/verifyToken.js'

const router = express.Router()

// CREATE
router.post('/:courseid', verifyAdmin, createTeeTime)

// UPDATE
router.put('/:id', verifyAdmin, updateTeeTime)
router.put('/availability/:id', updateTeeTimeAvailability)

// DELETE
router.delete('/:id/:courseid', verifyAdmin, deleteTeeTime)

// GET
router.get('/:id', getTeeTime)

// GET ALL
router.get('/', getAllTeeTimes)

export default router
