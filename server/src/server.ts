import cors from 'cors'
import dotenv from 'dotenv'
import express, { Express } from 'express'
import morgan from 'morgan'
import { corsConfig } from './config/cors'
import { connectDB } from './config/db'
import authRoutes from './routes/authRoutes'
import projectRoutes from './routes/projectRoutes'

dotenv.config()
connectDB()

/* Crear servidor */
const app: Express = express()
app.use(cors(corsConfig))

/* Loggin */
app.use(morgan('dev'))

/* Leer datos de formularios */
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/projects', projectRoutes)

export default app
