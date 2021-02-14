const mongoose = require("mongoose");

const Schema = mongoose.Schema;

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
                required: "Enter an excercise type",
            },
            name: {
                type: String,
                trim: true,
                required: "Enter an excercise name",
            },
            duration: {
                type: Number,
                required: "Enter an excercise duration in minutes",
            },
            weight: {
                type: Number,
            },
            reps: {
                type: Number,
            },
            sets: {
                type: Number,
            },
            distance: {
                type: Number,
            },
            totalDuration: {
                type: Number,
            }
        }
    ]
});


workoutSchema.methods.totalDuration = function() {
    this.totalDuration = this.exercises.reduce((total, exercise) => {
        return total + exercise.duration;
      }, 0);
  };

const Workout = mongoose.model('Workout', workoutSchema);
module.exports = Workout;