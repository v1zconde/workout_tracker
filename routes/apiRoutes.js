const router = require("express").Router();

const Workout = require("../models/workout");

// get route
//agregate function for get routes

router.get("/api/workouts", (req, res) => {

  // Workout
  //   .find()
  //   .then((data) => {
  //     console.log(data);
  //     data.forEach((workout) => {
  //       var total = 0;
  //       workout.exercises.agreggate([
  //         totalDuration: {
  //           $sum: "$duration"
  //         }]
  //       )
  //     });
  //     res.json(data);
  //   })
  //   .catch((err) => {
  //     res.json(err);
  //   });
Workout.find({})
.then(data => {
  console.log(data);
  res.json(data);
})
.catch(err => {
  res.json(err);
});
});

router.put("/api/workouts/:id", (req, res) => {

    console.log(req.body, req.params.id);
    console.log(req.params);
    Workout.findOneAndUpdate(
    { _id: req.params.id },
    {
      // $inc: { totalDuration: req.body.duration },
      $push: { exercises: req.body }
    },
    { new: true } //, runValidators: true
  )
    .then((data) => {
      Workout.totalDuration();
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/api/workouts", (req, res) => {
  console.log(req.body)
  
  Workout.create({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
  Workout.find({}).limit(7)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
