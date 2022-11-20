const {Schema, model} = require('mongoose')

const TourSchema = Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
  },
  route: {
    type: String,
    required: [true, 'La ruta es obligatoria'],
  },
  duration: {
    type: String,
    required: [true, 'La duración es requerida'],
  },

  guide: {
    type: String,
    required: [true, 'El nombre del guia es requerido'],
  },

  date: {
    type: String,
    required: [true, 'Las fechas del tour son requeridas'],
  },

  meeting_point: {
    type: String,
    required: [true, 'El punto de encuentro es obligatorio'],
  },

  img: {
    type: String,
  },
  role: {
    type: String,
    required: [true, 'El rol es obligatorio (ADMIN_ROLE) en mayúsculas'],
    // default: 'ADMIN_ROLE',
    // enum: ['ADMIN_ROLE', 'USER_ROLE'],
  },
  status: {
    type: Boolean,
    default: true,
  },
  min_quota: {
    type: Number,
    default: 1,
  },
  max_quota: {
    type: Number,
    required: [true, 'El cupo máximo es obligatorio'],
  },
})

TourSchema.methods.toJSON = function () {
  const {__v, _id, /* user, */ ...tour} = this.toObject()
  //   user.id = _id
  return tour
}

module.exports = model('Tour', TourSchema)
