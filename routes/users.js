var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res) {
  db("SELECT * FROM cleaners ORDER BY id ASC;")
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

router.delete("/cleaners/add/:id", async (req, res) => {
  let cleanerId = req.params.id;
  try {
    let result = await db (`SELECT * FROM  cleaners WHERE id = ${cleanerId}`); ")
    if (result.data.length === 0) {
      res.status(400).send({error: "item not found"});
    } else {
      await db (`DELETE FROM cleaners WHERE id = ${cleanerId}`);
      result = await db ("SELECT * FROM cleaners"),
      res.status(200).send(result.data);
    }
  } catch (err) {
    res.status(500).send({error: err.message})
  }
});

module.exports = router;
