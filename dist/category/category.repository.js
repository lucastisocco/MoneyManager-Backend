import { Category } from "./category.entity.js";
const categories = [
    new Category('C001', 'Ropa', 'Gastos en vestimenta y calzado')
];
export class CategoryRepository {
    findAll() {
        return categories;
    }
    findOne(item) {
        return categories.find((category) => category.id === item.id);
    }
    add(item) {
        categories.push(item);
        return item;
    }
    update(item) {
        const categoryIdx = categories.findIndex((category) => category.id === item.id);
        if (categoryIdx !== -1) {
            categories[categoryIdx] = { ...categories[categoryIdx], ...item };
        }
        return categories[categoryIdx];
    }
    delete(item) {
        const categoryIdx = categories.findIndex((category) => category.id === item.id);
        if (categoryIdx !== -1) {
            const deletedCategories = categories[categoryIdx];
            categories.splice(categoryIdx, 1);
            return deletedCategories;
        }
    }
}
//# sourceMappingURL=category.repository.js.map