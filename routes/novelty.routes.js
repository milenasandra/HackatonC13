const { Router } = require('express')
const { check } = require('express-validator')

const { validateJWT, isRole } = require('../middlewares')
const { validateFields } = require('../middlewares/validate-fields')
const {
  create,
  findAll,
  update,
  deleteById,
} = require('../controllers/novelty.controller')
const { noveltytByIdExists } = require('../helpers/db-validators')

const router = Router()

router.post(
  '/',
  [
    validateJWT,
    check('title', 'El título es requerido').not().isEmpty(),
    check('description', 'La descripción es requerida').not().isEmpty(),
    validateFields,
  ],
  create
)

router.get('/', findAll)

router.patch(
  '/:id',
  [
    validateJWT,
    isRole('ADMIN_ROLE'),
    check('id', 'El id debe ser válido de Mongo').isMongoId(),
    check('id').custom(noveltytByIdExists),
    validateFields,
  ],
  update
)

router.delete(
  '/:id',
  [
    validateJWT,
    isRole('ADMIN_ROLE'),
    check('id', 'El id debe ser válido de Mongo').isMongoId(),
    check('id').custom(noveltytByIdExists),
    validateFields,
  ],
  deleteById
)

module.exports = router
