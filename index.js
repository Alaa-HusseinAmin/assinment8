import express from 'express'
import { dbConnection } from './database/db.connection.js'
import userRouter from './src/modules/user/user.router.js'
const app = express()
const port = 3000

app.use(express.json())
app.use('/users',userRouter)
dbConnection()
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))