const toast = document.querySelector("#toast");
const completeButton = document.querySelector("button.complete");
const editButton = document.querySelector("button.edit-another");
const selectWorkout = document.querySelector("#workouts-options");
let exerciseList = document.getElementById("results");
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
    var day = allWorkouts[i].day.slice(5, 10)
    let option = `<option value="${allWorkouts[i]._id}">${i+1}- Day: ${day} || Time: ${allWorkouts[i].totalDuration} Minutes || Calories: ${allWorkouts[i].totalCalories}</option>`;
    $("#workouts-options").append(option);
}

}

async function handleFormSubmit(event) {
  event.preventDefault();
  let workoutData = {
     lastWorkout: workoutExercise,
    }
console.log(workoutData.lastWorkout)
  location.href = "/edit?id=" + workoutData.lastWorkout;

  toast.classList.add("success");
}

async function handleSelectExercise(event) {
    workoutExercise = event.target.value;
    exerciseList.innerHTML = "";
    const allExercises = await API.getWorkout(workoutExercise);

console.log(allExercises, "allexercises")
  allExercises.map((exercise, position)=> {
    if (exercise._id === workoutExercise){
      console.log(allExercises[position].exercises)
      console.log(allExercises[position])
      let data_id;
      let name;
      let duration;
      let totalDuration;
      let totalCalories;
      let workout_id;
      for (var i = 0; i < allExercises[position].exercises.length; i++) {
        data_id = allExercises[position].exercises[i]["_id"];
        workout_id = allExercises[position]._id;
        name = allExercises[position].exercises[i]["name"];
        duration = allExercises[position].exercises[i]["duration"]
        var calories = allExercises[position].exercises[i]["calories"]
        totalDuration = allExercises[position]["totalDuration"]
        totalCalories = allExercises[position]["totalCalories"]
console.log(totalCalories)
console.log(data_id, workout_id)
        snippet = `
       <p class="data-entry">
      <span class="dataTitle" data-id="${data_id}">Type: ${name} ||    
      Duration: ${duration} Minutes || Calories: ${calories}</span>
      <span onClick="delete" class="delete" data-workout="${workout_id}" data-id="${data_id}">x</span>
      </p>`;
   
      exerciseList.insertAdjacentHTML("beforeend", snippet);

    }
    snippetTotal = `
    <p class="data-entry">---------------------------------------------------------------------------------
    <span class="dataTitle" data-id="${data_id}">Total Duration: ${totalDuration} minutes || Total Calories: ${totalCalories}</span>
    </p>`;
    exerciseList.insertAdjacentHTML("beforeend", snippetTotal);
    }

  })

  

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

exerciseList.addEventListener("click", async function(e) {
  if (e.target.matches(".delete")) {
 
      element = e.target;
      data_id = element.getAttribute("data-id");
      workout_id = element.getAttribute("data-workout")
      console.log(element, data_id, workout_id)
      element.parentNode.remove();
      var deleteExercise = {
        lastWorkout : workout_id,
        idExercise : data_id
      }
    await API.deleteExercise(deleteExercise)
        
    };
  })

init();