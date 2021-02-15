// Require Mongoose
const mongoose = require("mongoose");

// Save mongoose's ability the create a schema in a variable 
const Schema = mongoose.Schema;

// Schema for workouts(documents)
const workoutSchema = new Schema({
  day: {
    type: Date,
    default: () => new Date(),
  },
  exercises: [
    {
      type: {
        type: String,
        trim: true,
        required: "Exercise type is required",
      },
      name: {
        type: String,
        trim: true,
        required: "Exercise name is required",
      },
      duration: {
        type: Number,
        required: "Weight is required",
      },
      weight: {
        type: Number,
        //required: "Weight is required",
      },
      reps: {
        type: Number,
        //required: "Number of reps required",
      },
      sets: {
        type: Number,
        //required: "Number of sets required",
      },
      distance: {
        type: Number,
        //required: "Number of sets required",
      },
    },
  ],
  // totalDuration: {
  //   type: Number,
  //   default: 0,
  // }
});

// Variable that holds the logic to create a new Document from the workoutSchema in the Workout Collection
const Workout = mongoose.model("Workout", workoutSchema);

// Export the ability to create a new Document
module.exports = Workout;
