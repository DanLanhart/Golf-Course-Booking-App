import TeeTime from "../models/TeeTime.js"
import Course from "../models/Course.js"
import { createError } from "../utils/error.js"

export const createTeeTime = async (req, res, next) => {
    const courseId = req.params.courseid
    const newTeeTime = new TeeTime(req.body)

    try {
        const savedTeeTime = await newTeeTime.save()
        try {
            await Course.findByIdAndUpdate(courseId, {
                $push : {teeTimes: savedTeeTime._id}
            })
        } catch(err) {
            next(err)
        }
        res.status(200).json(savedTeeTime)
    } catch(err) {
        next(err)
    }
}

export const updateTeeTime = async (req, res, next) => {
    try {
        const updateTeeTime = await TeeTime.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(updateTeeTime)
    } catch {
        next(err)
    }
}

export const updateTeeTimeAvailability = async (req, res, next) => {
    try {
        await TeeTime.updateOne({'teeTimeNumbers._id': req.params.id},
        {
            $push: {
                "teeTimeNumbers.$.unavailableDates": req.body.dates
            },
        })
        res.status(200).json(updateTeeTime)
    } catch {
        next(err)
    }
}

export const deleteTeeTime = async (req, res, next) => {
    const courseId = req.params.courseid
    try {
        await TeeTime.findByIdAndDelete(
            req.params.id
        )
        try {
            await Course.findByIdAndUpdate(courseId, {
                $pull: { teeTimes: req.params.id },
            })
        } catch(err) {
            next(err)
        }
        res.status(200).json('Tee Time has been deleted.')
    } catch {
        next(err)
    }
}

export const getTeeTime = async (req, res, next) => {
    try {
        const teeTime = await TeeTime.findById(
            req.params.id
        )
        res.status(200).json(teeTime)
    } catch {
        next(err)
    }
}

export const getAllTeeTimes = async (req, res, next) => {
    try {
        const teeTimes = await TeeTime.find()
        res.status(200).json(teeTimes)
    } catch (err) {
        next(err)
    }
}

