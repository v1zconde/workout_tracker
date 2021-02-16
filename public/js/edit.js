const toast = document.querySelector("#toast");
const completeButton = document.querySelector("button.complete");
const deleteButton = document.querySelector("button.delete-another");
const selectExercise = document.querySelector("#exercises-options");
let workoutExercise = null;
let shouldNavigateAway = false;
let lastWorkoutId = null;
async function init() {

    
    const lastWorkout = await API.getLastWorkout();
    console.log("Last workout:", lastWorkout);
    if (lastWorkout) {
    lastWorkoutId = lastWorkout._id
 
        //  location.search = "?id=" + lastWorkout._id;
  
         renderExercises(lastWorkout);
    } else {
        console.log("no workout")
        renderNoExercises()
    }
}

function renderNoExercises() {
  console.log("no exercises");
}

function renderExercises(lastWorkout) {

for (i = 0; i < lastWorkout.exercises.length; i++){
    let option = `<option value="${lastWorkout.exercises[i]._id}">${i+1}- Type: ${lastWorkout.exercises[i].name} Duration: ${lastWorkout.exercises[i].duration} minutes Calories: ${lastWorkout.exercises[i].calories}</option>`;
    $("#exercises-options").append(option);
}

}

async function handleFormSubmit(event) {
  event.preventDefault();
  let workoutData = {
      idExercise: workoutExercise,
      lastWorkout: lastWorkoutId,
    }
  await API.deleteExercise(workoutData);
  toast.classList.add("success");
  $("#exercises-options").empty()
  init();
}


function handleSelectExercise(event) {
    workoutExercise = event.target.value;
    if (workoutExercise){
      deleteButton.removeAttribute("disabled");
      completeButton.removeAttribute("disabled");
    }
    else{
        deleteButton.addAttribute("disabled");
        completeButton.addAttribute("disabled");
   
    }
  }


function handleToastAnimationEnd() {
    toast.removeAttribute("class");
    if (shouldNavigateAway) {
      location.href = "/";
    }
  }

if (selectExercise) {
    selectExercise.addEventListener("change", handleSelectExercise);
}
if (completeButton) {
  completeButton.addEventListener("click", function (event) {
    shouldNavigateAway = true;

  });
}
if (deleteButton) {
  deleteButton.addEventListener("click", handleFormSubmit);
}
toast.addEventListener("animationend", handleToastAnimationEnd);



init();