import { CategoryRepository } from "./category.repository.js";
import { Category } from "./category.entity.js";
const repository = new CategoryRepository();
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
function findAll(req, res) {
    res.json({ data: repository.findAll() });
}
function findOne(req, res) {
    const id = req.params.id;
    const category = repository.findOne({ id });
    if (!category) {
        return res.status(404).send({ message: 'Category not found' });
    }
    res.json({ data: category });
}
function add(req, res) {
    const input = req.body.sanitizedInput;
    const categoryInput = new Category(input.id, input.name, input.description);
    const category = repository.add(input);
    return res.status(201).send({ message: 'Category created', data: category });
}
function update(req, res) {
    req.body.sanitizedInput.id = req.params.id;
    const category = repository.update(req.body.sanitizedInput);
    if (!category) {
        return res.status(404).send({ message: 'Category not found' });
    }
    return res.status(200).send({ message: 'Category updated successfully', data: category });
}
function remove(req, res) {
    const id = req.params.id;
    const category = repository.delete({ id });
    if (!category) {
        res.status(404).send({ message: 'Category not found' });
    }
    else {
        res.status(200).send({ message: 'Category deleted successfully' });
    }
}
export { sanitizeCategoryInput, findAll, findOne, add, update, remove };
//# sourceMappingURL=category.controler.js.map