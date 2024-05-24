import express from 'express';
import { Category } from './category.js';
const app = express();
//category -> /api/categories/
//get -> obtener info sobre recursos
//post -> crear nuevos recursos
//delete -> borrar recursos
//put & patch -> modificar recursos
/*
app.use('/',(req,res) =>{
  res.send({ message: '<h1>Hello!!</h1>'})
})*/
const categories = [
    new Category(1, 'Ropa')
];
app.get('/api/categories', (req, res) => {
    res.json(categories);
});
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000/');
});
//# sourceMappingURL=app.js.map