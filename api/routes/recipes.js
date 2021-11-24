const router = require("express").Router();
const pool = require("../database");
const authorization = require("../middleware/authorization");

module.exports = router;

ADMIN_EMAIL = 'ladacherkasovav@yandex.ru';

async function isAdmin(id) {
  const user = await pool.query('SELECT user_email from users WHERE user_id = $1', [id]);
  return user.rows[0].user_email === ADMIN_EMAIL;
}

//create recipe
router.post("/", authorization, async(req, res) => {
  try {
    const { title, description, isVegan, portions, preview, time, previousRecipe } = req.body;
    const isModerated = !(await isAdmin(req.user));

    const newRecipe = await pool.query('INSERT INTO recipes ' +
      '(recipe_title, recipe_description, recipe_isvegan, recipe_portions, recipe_preview, recipe_time, recipe_previousRecipe, recipe_author, recipe_ismoderated) ' +
      'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *', [title, description, isVegan, portions, preview, time, previousRecipe, req.user, isModerated]);

    const { ingredients } = req.body;
    for (let ingredient of ingredients) {
      const newIngredient = await pool.query('SELECT ingredient_id FROM ingredients WHERE ingredient_name = $1', [ingredient.name]);
      await pool.query('INSERT INTO recipe_ingredient (recipe_ingredient_amount, recipe_id, ingredient_id) VALUES' +
        '($1, $2, $3)', [ingredient.amount, newRecipe.rows[0].recipe_id, newIngredient.rows[0].ingredient_id]);
    }

    const { type } = req.body;
    const newType = await pool.query('SELECT type_id FROM types WHERE types.type_name = $1', [type]);
    await pool.query('INSERT INTO recipe_type (recipe_id, type_id) VALUES' +
      '($1, $2)', [newRecipe.rows[0].recipe_id, newType.rows[0].type_id]);

    const { steps } = req.body;
    for (let step of steps) {
      await pool.query('INSERT INTO steps (step_description, step_image, recipe_id) VALUES' +
        '($1, $2, $3)', [step.description, step.photo, newRecipe.rows[0].recipe_id]);
    }
  } catch(error) {
    console.error(error.message);
  }
})

//get all recipes
router.get("/", async(req, res) => {
  try {
    const recipes = await pool.query('SELECT * from recipes ' +
      'INNER JOIN recipe_type ON recipe_type.recipe_id = recipes.recipe_id ' +
      'INNER JOIN types ON types.type_id = recipe_type.type_id ' +
      'WHERE NOT recipe_ismoderated = true');
    res.json(recipes.rows);
  } catch(error) {
    console.error(error.message);
  }
})

//get specific recipe
router.get("/:id/", async(req, res) => {
  const { id } = req.params;
  try {
    const recipe = await pool.query('SELECT * from recipes ' +
      'INNER JOIN recipe_type ON recipe_type.recipe_id = recipes.recipe_id ' +
      'INNER JOIN types ON types.type_id = recipe_type.type_id ' +
      'WHERE recipes.recipe_id = $1', [id]);

    const ingredients = await pool.query('SELECT * from recipe_ingredient ' +
      'INNER JOIN ingredients ON recipe_ingredient.ingredient_id = ingredients.ingredient_id ' +
      'WHERE recipe_ingredient.recipe_id = $1', [id]);

    const steps = await pool.query('SELECT * from steps ' +
      'WHERE steps.recipe_id = $1', [id]);
    res.json({recipe: recipe.rows[0], ingredients: ingredients.rows, steps: steps.rows});
  } catch(error) {
    console.error(error.message);
  }
})

// //update recipe
// router.put("/:id", async(req, res) => {
//   const { id } = req.params;
//   const { newTitle } = req.body;
//   try {
//     const updateRecipe = await pool.query('UPDATE recipes SET recipe_title = $1 WHERE recipe_id = $2', [newTitle, id]);
//     res.json('Recipe was updated');
//   } catch(error) {
//     console.error(error.message);
//   }
// })

// //delete recipe
// router.delete("/:id", async(req, res) => {
//   const { id } = req.params;
//   try {
//     const updateRecipe = await pool.query('DELETE FROM recipes WHERE recipe_id = $1', [id]);
//     res.json('Recipe was deleted');
//   } catch(error) {
//     console.error(error.message);
//   }
// })
