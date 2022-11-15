const { request, response } = require('express')
const { DateTime } = require('luxon')
const { Course } = require('../models')

const create = async (req = request, res = response) => {
  try {
    let { name, description } = req.body
    name = name.toLowerCase().trim()

    const courseDB = await Course.findOne({ name })
    if (courseDB) {
      return res.status(400).json({
        msg: `Ya existe un curso con ese nombre ${name}`,
      })
    }

    const data = {
      name,
      description,
      user: req.authenticatedUser.id,
      createdAt: DateTime.now(),
    }

    const course = new Course(data)
    course.save()

    res.json({
      course,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Error en el servidor',
    })
  }
}

const findAll = async (req = request, res = response) => {
  try {
    let { from = 0, lot = 10 } = req.query
    from = from <= 0 || isNaN(from) ? 0 : from - 1

    const query = { status: true }

    const [courses, total] = await Promise.all([
      Course.find(query).populate('user').skip(from).limit(lot),
      Course.countDocuments(query),
    ])

    const quantity = novelties.length
    const pagination = {
      from: Number(from + 1),
      lot: Number(lot),
    }

    res.json({
      total,
      quantity,
      pagination,
      courses,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Error en el servidor',
    })
  }
}

module.exports = {
  create,
  findAll,
}
