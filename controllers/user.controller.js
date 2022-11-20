const {request, response} = require('express')
const User = require('../models/user')

const createUser = async (req = request, res = response) => {
  try {
    const {
      name,
      last_name,
      type_document,
      number_document,
      phone_number,
      email,
    } = req.body
    const user = new User({
      name,
      last_name,
      type_document,
      number_document,
      phone_number,
      email,
    })

    await user.save()

    res.status(201).json({
      user,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Error en el servidor',
    })
  }
}

module.exports = createUser
