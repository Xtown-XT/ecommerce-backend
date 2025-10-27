import Category from "../models/category.js";

export const createCategoryService = async (data) => {
  const category = await Category.create(data);
  return category;
};

export const getAllCategoriesService = async () => {
  const categories = await Category.findAll();
  return categories;
};

export const getCategoryByIdService = async (id) => {
  const category = await Category.findByPk(id);
  return category;
};

export const updateCategoryService = async (id, data) => {
  const [updated] = await Category.update(data, {
    where: { category_id: id },
  });
  return updated; // returns 1 if updated, 0 if not found
};

export const deleteCategoryService = async (id) => {
  const deleted = await Category.destroy({
    where: { category_id: id },
  });
  return deleted; // returns 1 if deleted, 0 if not found
};
