import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import noteRoutes from './routes/note.routes.js'

dotenv.config()


const app = express()

const port = process.env.PORT || 5000

connectDB()

app.use(cors());
app.use(express.json())

app.use('/api/notes', noteRoutes)

app.get('/', (req, res) => {
    res.send("Api is running...")
})


app.listen(port, () => {
    console.log(`Server is Running on http://localhost:${port}`)
})