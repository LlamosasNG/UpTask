import { Router } from 'express'
import { body, param } from 'express-validator'
import { AuthController } from '../controllers/AuthController'
import { authenticate } from '../middleware/auth'
import { handleInputErrors } from '../middleware/validation'

const router: Router = Router()

router.post(
  '/create-account',
  body('name').notEmpty().withMessage('El nombre no puede ir vacío'),
  body('email').isEmail().withMessage('El email no es válido'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('La contraseña debe tener al menos 8 caracteres'),
  body('password_confirmation').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Las contraseñas no coinciden')
    }
    return true
  }),
  handleInputErrors,
  AuthController.createAccount
)

router.post(
  '/confirm-account',
  body('token').notEmpty().withMessage('El token no puede ir vacío'),
  handleInputErrors,
  AuthController.confirmAccount
)

router.post(
  '/login',
  body('email').isEmail().withMessage('El email no es válido'),
  body('password').notEmpty().withMessage('La contraseña no puede ir vacía'),
  handleInputErrors,
  AuthController.login
)

router.post(
  '/request-code',
  body('email').isEmail().withMessage('El email no es válido'),
  handleInputErrors,
  AuthController.requestConfirmationCode
)

router.post(
  '/forgot-password',
  body('email').isEmail().withMessage('El email no es válido'),
  handleInputErrors,
  AuthController.forgotPassword
)

router.post(
  '/validate-token',
  body('token').notEmpty().withMessage('El token no puede ir vacío'),
  handleInputErrors,
  AuthController.validateToken
)

router.post(
  '/update-password/:token',
  param('token').isNumeric().withMessage('Token no válido'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('La contraseña debe tener al menos 8 caracteres'),
  body('password_confirmation').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Las contraseñas no coinciden')
    }
    return true
  }),
  handleInputErrors,
  AuthController.updatePasswordWithToken
)

router.get('/user', authenticate, AuthController.getUser)

/** Profile */
router.put(
  '/profile',
  authenticate,
  body('name').notEmpty().withMessage('El nombre no puede ir vacío'),
  body('email').isEmail().withMessage('El email no es válido'),
  handleInputErrors,
  AuthController.updatedProfile
)

router.post(
  '/updated-password',
  authenticate,
  body('current_password')
    .isLength({ min: 8 })
    .withMessage('La contraseña debe tener al menos 8 caracteres'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('La contraseña debe tener al menos 8 caracteres'),
  body('password_confirmation').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Las contraseñas no coinciden')
    }
    return true
  }),
  handleInputErrors,
  AuthController.updateCurrentUserPassword
)

router.post(
  '/check-password',
  authenticate,
  body('password').notEmpty().withMessage('La contraseña es obligatoria'),
  handleInputErrors,
  AuthController.checkPassword
)

export default router
