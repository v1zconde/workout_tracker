const toast = document.querySelector("#toast");
const completeButton = document.querySelector("button.complete");
const editButton = document.querySelector("button.edit-another");
const selectWorkout = document.querySelector("#workouts-options");
let workoutExercise = null;
let shouldNavigateAway = false;
let lastWorkoutId = null;
async function init() {

    
    const allWorkouts = await API.allWorkouts();
    console.log("Last workout:", allWorkouts);
    if (allWorkouts) {
    // lastWorkoutId = lastWorkout._id
 
        //  location.search = "?id=" + lastWorkout._id;
  
         renderExercises(allWorkouts);
    } else {
        console.log("no workout")
        renderNoExercises()
    }
}

function renderNoExercises() {
  console.log("no exercises");
}

function renderExercises(allWorkouts) {

for (i = 0; i < allWorkouts.length; i++){
    let option = `<option value="${allWorkouts[i]._id}">${i+1}- Day: ${allWorkouts[i].day} Duration: ${allWorkouts[i].totalDuration} minutes</option>`;
    $("#workouts-options").append(option);
}

}

async function handleFormSubmit(event) {
  event.preventDefault();
  let workoutData = {
     lastWorkout: workoutExercise,
    }

  location.href = "/?id=" + workoutData.lastWorkout;

  toast.classList.add("success");
}

function handleSelectExercise(event) {
    workoutExercise = event.target.value;
    if (workoutExercise){
      editButton.removeAttribute("disabled");
      completeButton.removeAttribute("disabled");
    }
    else{
      editButton.addAttribute("disabled");
        completeButton.addAttribute("disabled");
   
    }
  }

function handleToastAnimationEnd() {
    toast.removeAttribute("class");
    if (shouldNavigateAway) {
      location.href = "/";
    }
  }

if (selectWorkout) {
  selectWorkout.addEventListener("change", handleSelectExercise);
}
if (completeButton) {
  completeButton.addEventListener("click", function (event) {
    shouldNavigateAway = true;
  });
}
if (editButton) {
  editButton.addEventListener("click", handleFormSubmit);
}
toast.addEventListener("animationend", handleToastAnimationEnd);



init();