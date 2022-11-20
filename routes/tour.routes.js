const {Router} = require('express')
const {check} = require('express-validator')

const {validateFields, validateJWT, isRole} = require('../middlewares')
const {isValidRole, emailExists, userByIdExists} = require('../helpers')
const {createTour, getTours} = require('../controllers/tour.controller')

const router = Router()

router.get('/', getTours)

router.post(
  '/',
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('route', 'La descripción del recorrido es obligatoria')
      .not()
      .isEmpty(),
    check('duration', 'La duración es requerida').not().isEmpty(),
    check('guide', 'El nombre del guia es obligatorio').not().isEmpty(),
    check('date', 'Las fechas del tour son requeridas').not().isEmpty(),
    check('meeting_point', 'El punto de encuentro es obligatorio')
      .not()
      .isEmpty(),
    check('role', 'El rol es obligatorio (ADMIN_ROLE) en mayúsculas')
      .not()
      .isEmpty(),
    check('max_quota', 'El cupo máximo es obligatorio').not().isEmpty(),
    validateFields,
  ],
  createTour
)

module.exports = router
