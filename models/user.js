const {Schema, model} = require('mongoose')

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
  },
  last_name: {
    type: String,
    required: [true, 'El apellido es obligatorio'],
  },
  type_document: {
    type: String,
    required: [true, 'El tipo de documento es requerido'],
  },
  number_document: {
    type: String,
    required: [true, 'El número de documento es requerido'],
  },

  email: {
    type: String,
    required: [true, 'El correo electrónico es obligatorio'],
    unique: true,
  },

  phone_number: {
    type: String,
    required: [true, 'El número de contacto es obligatorio'],
  },
})

UserSchema.methods.toJSON = function () {
  const {__v, _id, ...user} = this.toObject()
  user.id = _id
  return user
}

module.exports = model('User', UserSchema)
