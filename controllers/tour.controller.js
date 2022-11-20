const {request, response} = require('express')
const Tour = require('../models/tour')

const getTours = async (req = request, res = response) => {
  try {
    let {from = 0, lot = 10} = req.query
    from = from <= 0 || isNaN(from) ? 0 : from - 1
    lot = lot <= 0 || isNaN(lot) ? 10 : lot

    const query = {status: true}

    const [tours, total] = await Promise.all([
      Tour.find(query).skip(from).limit(lot),
      Tour.countDocuments(query),
    ])
    const quantity = tours.length
    const pagination = {from: Number(from + 1), lot: Number(lot)}

    res.status(200).json({
      total,
      quantity,
      pagination,
      tours,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Error en el servidor',
    })
  }
}

const createTour = async (req = request, res = response) => {
  try {
    let {name} = req.body

    name = name.toLowerCase().trim()

    const tourBD = await Tour.findOne({name})
    if (tourBD) {
      return res.status(400).json({
        msg: `Ya existe un tour con el nombre de ${name}`,
      })
    }
    const data = {
      ...req.body,
      name,
    }

    const tour = new Tour(req.body)

    await tour.save()

    res.status(201).json({
      tour,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Error en el servidor',
    })
  }
}

module.exports = {createTour, getTours}
