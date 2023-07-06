const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')
const PORT =process.env.PORT 
app.use(express.json())
app.use('/',indexRouter)
app.use('/user',userRouter)

app.listen(PORT,()=>console.log(`Server is Running in ${PORT}`))