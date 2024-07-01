import express from 'express'
import { categoryRouter } from './category/category.routes.js'

const app = express()
app.use(express.json())

app.use('/api/categories', categoryRouter)

app.use((_,res)=>{
  res.status(404).send({message: 'Resource not found'})
})

app.listen(3000, ()=>{
  console.log('Server running on http://localhost:3000/')
})