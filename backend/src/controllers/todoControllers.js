const { sqlDb } = require("../../db");

const getTodos = (req, res) => {
  sqlDb
    .query(`SELECT * FROM todos`)
    .then(([result]) => {
      // console.warn(result);
      res.status(200).json({ result });
    })
    .catch((err) => {
      // console.warn("There was an error in getTodos function", err);
      res.status(500).send("Error retrieving geTodos", err);
    });
};

const postTodos = (req, res) => {
  const { description } = req.body;

  sqlDb
    .query("INSERT INTO todos(description) VALUES (?)", [description])
    .then(([result]) => {
      res.status(201).json({ id: result.insertId });
    })
    .catch((err) => {
      res.status(500).send("Error inserting postTodos", err);
    });
};
const deleteTodos = (req, res) => {
  // let { id } = req.body; // ou req.params si router.delete avec :id
  let { id } = req.params;
  id = parseInt(id, 10); // ou Number(id)
  sqlDb
    .query("DELETE FROM todos WHERE id = ?", [id]) // il s'agit d'une requete preparer qui evite les injections SQL
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res
          .status(404)
          .json({ message: `task was not found in DB because wrong id` });
      } else {
        res.status(201).json({ message: `task ${id} was  deleted ` });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: `task ${id} was not deleted because of error, ${err}`,
      });
    });
};

const updateTodos = (req, res) => {
  // let { id } = req.body; // ou req.params si router.delete avec :id
  let { id } = req.params;
  id = parseInt(id, 10); // ou Number(id)
  const { description } = req.body;
  sqlDb
    .query("UPDATE todos SET description = ? WHERE id = ?", [description, id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res
          .status(404)
          .json({ message: `task was not found in DB because wrong id` });
      } else {
        res.status(201).json({ message: `task ${id} was  updated ` });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: `task ${id} was not updated because of error, ${err}`,
      });
    });
};

module.exports = {
  getTodos,
  postTodos,
  updateTodos,
  deleteTodos,
};
