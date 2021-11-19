const router = require("express").Router();
const pool = require("../database");
const authorization = require("../middleware/authorization");

module.exports = router;

//create recipe (now only for title)
router.post("/", authorization, async(req, res) => {
  try {
    const { recipe_title } = req.body;
    const newRecipe = await pool.query('INSERT INTO recipes (recipe_title) VALUES ($1) RETURNING *', [recipe_title]);
    res.json(newRecipe.rows);
  } catch(error) {
    console.error(error.message);
  }
})

//get all recipes (change * to specific column to get it)
router.get("/", async(req, res) => {
  try {
    res.json((await pool.query('SELECT * from recipes')).rows);
  } catch(error) {
    console.error(error.message);
  }
})

//get specific recipe (by recipe_id)
router.get("/:id", async(req, res) => {
  const { id } = req.params;
  try {
    const recipe = await pool.query('SELECT * from recipes WHERE recipe_id = $1', [id]);
    res.json(recipes.rows);
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
