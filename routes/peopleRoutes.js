const express = require("express");
const router = express.Router();
const People = require("../model/peopleSchema");

/* POST a new people */
router.post("/newPeople", (req, res) => {
  let newPeople = new People(req.body);
  newPeople.save((err, msg) => {
    if (err) throw err;
    else res.json({ msg: "new people added" });
  });
});

/*POST many peoples*/
router.post("/newPeoples", (req, res) => {
  const arrayOfPeoples = req.body;
  People.create(arrayOfPeoples, (err, msg) => {
    if (err) throw err;
    else res.json({ msg: "List added successfully !" });
  });
});

/* GET: Find all the people having a given fname */
router.get("/:fname", (req, res) => {
  People.find({ fname: req.params.fname }, (err, data) => {
    if (err) throw err;
    else res.send(data);
  });
});
// GET: Find just one peopme which has a certain food in the person's favorites
router.get("/peopleByFavFoods/:favFoods", (req, res) => {
  People.findOne({ favFoods: req.params.favFoods }, (err, data) => {
    if (err) throw err;
    else res.send(data);
  });
});
/* GET by Id: Find the (only!!) people having a given _id */
router.get("/peopleById/:id", (req, res) => {
  People.findById({ _id: req.params.id }, (err, data) => {
    if (err) throw err;
    else res.send(data);
  });
});

/* UPDATE people by id */
router.put("/updatePeople/:id", (req, res) => {
  let updatePeople = { $push: { favFoods: req.body.favFoods } };
  let PeopleId = req.params.id;
  People.findByIdAndUpdate({ _id: PeopleId }, updatePeople, (err, data) => {
    if (err) throw err;
    else res.send(data);
  });
});
// Find a people by Name and update people's age.
router.put("/updatePeopleByName/:fname", (req, res) => {
  let updatePeople = req.body;
  let PeopleByName = req.params.fname;
  People.findOneAndUpdate(
    { fname: PeopleByName },
    updatePeople,
    (err, data) => {
      if (err) throw err;
      else res.send(data);
    }
  );
});
// Delete one people by the people's _id
router.delete("/deletePeople/:id", (req, res) => {
  People.findByIdAndDelete({ _id: req.params.id }, (err, msg) => {
    if (err) throw err;
    else res.json({ msg: "People was deleted" });
  });
});

// Delete all the people having a given name
router.delete("/deletePeople/:fname", (req, res) => {
  People.deleteMany({ fname: req.params.fname }, (err, msg) => {
    if (err) throw err;
    else res.json({ msg: "People was deleted" });
  });
});
// search with query helpers
router.get("/People/:favFoods", (req, res) => {
  People.find({ favFoods: req.params.favFoods })
    .sort({ fname: 1 })
    .limit(2)
    .select("-age")
    .exec((err, data) => {
      if (err) throw err;
      else res.send(data);
    });
});
module.exports = router;
