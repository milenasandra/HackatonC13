const {Router} = require('express')
const {check} = require('express-validator')

const {validateFields, validateJWT, isRole} = require('../middlewares')
const {isValidRole, emailExists, userByIdExists} = require('../helpers')
const createUser = require('../controllers/user.controller')

const router = Router()

router.post(
  '/',
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('last_name', 'El apellido es obligatorio').not().isEmpty(),
    check('type_document', 'El tipo de documento es obligatorio')
      .not()
      .isEmpty(),
    check('number_document', 'El número de documento es obligatorio')
      .not()
      .isEmpty(),
    check('phone_number', 'El número de contacto es obligatorio')
      .not()
      .isEmpty(),
    check('email', 'El email no es válido').isEmail(),
    check('email').custom(emailExists),
    validateFields,
  ],
  createUser
)

module.exports = router
