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
    let option = `<option value="${allWorkouts[i]._id}">${i+1}- Day: ${day} Minutes: ${allWorkouts[i].totalDuration} Minutes Calories: ${allWorkouts[i].totalCalories} Calories</option>`;
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
      for (var i = 0; i < allExercises[position].exercises.length; i++) {
        data_id = allExercises[position].exercises[i]["_id"];
        name = allExercises[position].exercises[i]["name"];
        duration = allExercises[position].exercises[i]["duration"]
        var calories = allExercises[position].exercises[i]["calories"]
        totalDuration = allExercises[position]["totalDuration"]
        totalCalories = allExercises[position]["totalCalories"]
console.log(totalCalories)
        snippet = `
       <p class="data-entry">
      <span class="dataTitle" data-id=${data_id}>Type: ${name}    
      Duration: ${duration} Minutes Calories: ${calories}</span>
      <span onClick="delete" class="delete" data-id=${data_id}>x</span>
      </p>`;
   
      exerciseList.insertAdjacentHTML("beforeend", snippet);

    }
    snippetTotal = `
    <p class="data-entry">---------------------------------------------------------------------------------
    <span class="dataTitle" data-id=${data_id}>Total Duration: ${totalDuration} minutes Calories: ${totalCalories}</span>
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



init();