import express from 'express';
import { Category } from './category.js';
const app = express();
app.use(express.json());
//user --> request --> express --> express.json() --> app.post(req.body) --> response --> user
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
    new Category('C001', 'Ropa', 'Gastos en vestimenta y calzado')
];
function sanitizeCategoryInput(req, res, next) {
    req.body.sanitizedInput = {
        id: req.body.id,
        name: req.body.name,
        description: req.body.description
    };
    //more checks here
    Object.keys(req.body.sanitizedInput).forEach(key => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key];
        }
    });
    next();
}
app.get('/api/categories', (req, res) => {
    //res.json({data: category })
    res.json(categories);
});
app.get('/api/categories/:id', (req, res) => {
    const category = categories.find((category) => category.id === req.params.id);
    if (!category) {
        res.status(404).send({ message: 'Category not found' });
    }
    //res.json({data: category })
    res.json(category);
});
app.post('/api/categories', sanitizeCategoryInput, (req, res) => {
    const input = req.body.sanitizedInput;
    const category = new Category(input.id, input.name, input.description);
    categories.push(category);
    res.status(201).send({ message: 'Category created', data: category });
});
app.put('/api/categories/:id', sanitizeCategoryInput, (req, res) => {
    const categoryIdx = categories.findIndex((category) => category.id === req.params.id);
    if (categoryIdx === -1) {
        res.status(404).send({ message: 'Category not found' });
    }
    /*const input = {
      id: req.body.id,
      name: req.body.name   esto se reemplaza con sanitize
    }*/
    categories[categoryIdx] = { ...categories[categoryIdx], ...req.body.sanitizedInput }; //...input}
    res.status(200).send({ message: 'Category updated successfully', data: categories[categoryIdx] });
});
app.patch('/api/categories/:id', sanitizeCategoryInput, (req, res) => {
    const categoryIdx = categories.findIndex((category) => category.id === req.params.id);
    if (categoryIdx === -1) {
        res.status(404).send({ message: 'Category not found' });
    }
    categories[categoryIdx] = { ...categories[categoryIdx], ...req.body.sanitizedInput }; //...input}
    res.status(200).send({ message: 'Category updated successfully', data: categories[categoryIdx] });
});
app.delete('/api/categories/:id', (req, res) => {
    const categoryIdx = categories.findIndex((category) => category.id === req.params.id);
    if (categoryIdx === -1) {
        res.status(404).send({ message: 'Category not found' });
    }
    else {
        categories.splice(categoryIdx, 1);
        res.status(200).send({ message: 'Category deleted successfully' });
    }
});
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000/');
});
//# sourceMappingURL=app.js.map