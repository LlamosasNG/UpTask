import { Router } from 'express'
import { body, param } from 'express-validator'
import { NoteController } from '../controllers/NoteController'
import { ProjectController } from '../controllers/ProjectController'
import { TaskController } from '../controllers/TaskController'
import { TeamController } from '../controllers/TeamController'
import { authenticate } from '../middleware/auth'
import { projectExists } from '../middleware/project'
import {
  hasAuthorization,
  taskBelongsToProject,
  taskExists,
} from '../middleware/task'
import { handleInputErrors } from '../middleware/validation'

const router: Router = Router()

/** Projects */
router.use(authenticate)
router.post(
  '/',
  body('projectName')
    .notEmpty()
    .withMessage('El nombre del proyecto es obligatorio'),
  body('clientName')
    .notEmpty()
    .withMessage('El nombre del cliente es obligatorio'),
  body('description').notEmpty().withMessage('La descripción es obligatoria'),
  handleInputErrors,
  ProjectController.createProjects
)

router.get('/', ProjectController.getAllProjects)
router.get(
  '/:id',
  param('id').isMongoId().withMessage('ID no válido'),
  handleInputErrors,
  ProjectController.getProjectById
)

router.param('projectId', projectExists)
router.put(
  '/:projectId',
  param('projectId').isMongoId().withMessage('ID no válido'),
  body('projectName')
    .notEmpty()
    .withMessage('El nombre del proyecto es obligatorio'),
  body('clientName')
    .notEmpty()
    .withMessage('El nombre del cliente es obligatorio'),
  body('clientName').notEmpty().withMessage('La descripción es obligatoria'),
  handleInputErrors,
  hasAuthorization,
  ProjectController.updateProject
)

router.delete(
  '/:projectId',
  param('projectId').isMongoId().withMessage('ID no válido'),
  handleInputErrors,
  hasAuthorization,
  ProjectController.deleteProject
)

/** Tasks */
router.param('taskId', taskExists)
router.param('taskId', taskBelongsToProject)

router.post(
  '/:projectId/tasks',
  hasAuthorization,
  body('name').notEmpty().withMessage('El nombre de la tarea es obligatorio'),
  body('description').notEmpty().withMessage('La descripción es obligatoria'),
  handleInputErrors,
  TaskController.createTask
)

router.get(
  '/:projectId/tasks',
  handleInputErrors,
  TaskController.getProjectTasks
)

router.get(
  '/:projectId/tasks/:taskId',
  param('taskId').isMongoId().withMessage('ID no válido'),
  handleInputErrors,
  TaskController.getTaksById
)

router.put(
  '/:projectId/tasks/:taskId',
  hasAuthorization,
  param('taskId').isMongoId().withMessage('ID no válido'),
  body('name').notEmpty().withMessage('El nombre de la tarea es obligatorio'),
  body('description').notEmpty().withMessage('La descripción es obligatoria'),
  handleInputErrors,
  TaskController.updateTask
)

router.delete(
  '/:projectId/tasks/:taskId',
  hasAuthorization,
  param('taskId').isMongoId().withMessage('ID no válido'),
  handleInputErrors,
  TaskController.deleteTask
)

router.post(
  '/:projectId/tasks/:taskId/status',
  param('taskId').isMongoId().withMessage('ID no válido'),
  body('status').notEmpty().withMessage('El estado es obligatorio'),
  handleInputErrors,
  TaskController.updateStatus
)

/** Teams */
router.post(
  '/:projectId/team/find',
  body('email').isEmail().toLowerCase().withMessage('El email no es válido'),
  handleInputErrors,
  TeamController.findMemberByEmail
)

router.get('/:projectId/team', TeamController.getProjectTeam)

router.post(
  '/:projectId/team',
  body('id').isMongoId().withMessage('ID no válido'),
  handleInputErrors,
  TeamController.addMemberById
)

router.delete(
  '/:projectId/team/:userId',
  param('userId').isMongoId().withMessage('ID no válido'),
  handleInputErrors,
  TeamController.removeMemberById
)

// Routes for notes
router.post(
  '/:projectId/tasks/:taskId/notes',
  body('content')
    .notEmpty()
    .withMessage('El contenido de la nota es obligatorio'),
  handleInputErrors,
  NoteController.createNote
)

router.get(
  '/:projectId/tasks/:taskId/notes',
  handleInputErrors,
  NoteController.getTaskNotes
)

router.delete(
  '/:projectId/tasks/:taskId/notes/:noteId',
  param('noteId').isMongoId().withMessage('ID no válido'),
  handleInputErrors,
  NoteController.deleteNote
)

export default router
