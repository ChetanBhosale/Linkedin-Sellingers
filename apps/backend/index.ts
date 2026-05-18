import express from 'express'
import type {Request,Response} from 'express'
const app = express()

const PORT = process.env.PORT || 4000

// health check endpoint
app.get('/health', (req:Request,res:Response) => res.status(201).send('Healthy!'))

app.listen(PORT,(err) => {
    if(err){
        process.exit(1)
    }
    console.log(`Server started successfully on PORT : ${PORT}`)
})