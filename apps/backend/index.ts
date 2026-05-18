import express from 'express'
import type { Request, Response } from 'express'
import ENVS from '@repo/secrets'
import indexRoutes from './route/index.route'

const app = express()

app.use(express.json())

app.get('/health', (_req: Request, res: Response) => res.status(200).send('Healthy!'))

app.use('/api', indexRoutes)

const { PORT } = ENVS
app.listen(PORT, () => {
    console.log(`Server started successfully on PORT : ${PORT}`)
})
