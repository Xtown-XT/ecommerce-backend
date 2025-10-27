import Category from "../models/category.js";
import { createCategorySchema,updateCategorySchema} from "../dto/category.authValidations.js";

// ✅ Create category
export const createCategory = async (req, res) => {
  try {
    const parsedData = createCategorySchema.parse(req.body);
    const category = await Category.create(parsedData);
    res.status(201).json({ message: "Category created", data: category });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get single category
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: "Not found" });
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update category
export const updateCategory = async (req, res) => {
  try {
    const parsedData = updateCategorySchema.partial().parse(req.body);
    const [updated] = await Category.update(parsedData, {
      where: { category_id: req.params.id },
    });
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Delete category
export const deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.destroy({ where: { category_id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
