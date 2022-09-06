// need to change name to match ejs - done
const deleteBtn = document.querySelectorAll(".del");
// const workoutItem = document.querySelectorAll("span.not");
const workoutItem = document.querySelectorAll(".innerWindow");
const workoutComplete = document.querySelectorAll("span.completed");

Array.from(deleteBtn).forEach((el) => {
  el.addEventListener("click", deleteWorkout);
});


Array.from(workoutItem).forEach((el) => {
  el.addEventListener("click", markComplete);
});


Array.from(workoutComplete).forEach((el) => {
  el.addEventListener("click", markIncomplete);
});
function submitButtonClick(event) {
  event.preventDefault();
} 
function validateInput() {
  const workoutName = document.getElementById('workoutNameInput').value
  const repsAmount = document.getElementById('repsAmountInput').value
  const submitButton = document.getElementById('submitWorkout')
  // submitButton.preventDefault()
  if (workoutName && repsAmount) {
    submitButton.style.display = 'block'
    submitButton.onclick = ''
  } else {
    submitButton.style.display = 'none'
    submitButton.onclick = 'submitButtonClick(event)'
  }
}


// const submit = document.getElementById('submitWorkout')
// submit.addEventListener('click', _ => {
//   const workoutName = document.getElementById('workoutNameInput')
//   const repsAmount = document.getElementById('repsAmountInput')
//   const form = document.getElementById('addWorkout')
//   form.addEventListener("click", function(event){
//     event.preventDefault()
//   });

//   if (!workoutName || !repsAmount) {
//     console.log('if')
//     form.preventDefault()
//   } else {
//     console.log('else')
//     form.submit()
//   }
// })
// 
// click event when workout is partial completed
// Array.from(workoutComplete).forEach((el)=>{
//     el.addEventListener('click', partialComplete)
// })

// async function partialComplete() {
//   const workoutId = this.parentNode.dataset.id;
//   try {
//     const response = await fetch("workouts/partialcomplete", {
//       method: "put",
//       headers: { "Content-type": "application/json" },
//       body: JSON.stringify({
//         workoutIdFromJSFile: workoutId,
//       }),
//     });
//     const data = await response.json();
//     console.log(data);
//     location.reload();
//   } catch (err) {
//     console.log(err);
//   }
// }

async function deleteWorkout() {
  const workoutId = this.parentNode.dataset.id;
  try {
    const response = await fetch("workouts/deleteWorkout", {
      method: "delete",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        workoutIdFromJSFile: workoutId,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}

async function markComplete() {
  // const workoutId = this.parentNode.dataset.id;
  const workoutId = this.dataset.id;
  // const dataToggleKey = {
  //   completed: 'completed',
  //   notCompleted: 'partialCompleted',
  //   partialCompleted: 'completed'
  // }
  try {
    const response = await fetch("workouts/markComplete", {
      method: "put",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        workoutIdFromJSFile: workoutId,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}

async function markIncomplete() {
  const workoutId = this.parentNode.dataset.id;
  try {
    const response = await fetch("workouts/markIncomplete", {
      method: "put",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        workoutIdFromJSFile: workoutId,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}
async function markPartialComplete() {
  const workoutId = this.parentNode.dataset.id;
  try {
    const response = await fetch("workouts/markIncomplete", {
      method: "put",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        workoutIdFromJSFile: workoutId,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}



// const deleteBtn = document.querySelectorAll('.del')
// const workoutItem = document.querySelectorAll('span.not')
// const workoutComplete = document.querySelectorAll('span.completed')

// Array.from(deleteBtn).forEach((el)=>{
//     el.addEventListener('click', deleteWorkout)
// })

// Array.from(workoutItem).forEach((el)=>{
//     el.addEventListener('click', markComplete)
// })

// Array.from(workoutComplete).forEach((el)=>{
//     el.addEventListener('click', markIncomplete)
// })

// async function deleteWorkout(){
//     const workoutId = this.parentNode.dataset.id
//     try{
//         const response = await fetch('workouts/deleteWorkout', {
//             method: 'delete',
//             headers: {'Content-type': 'application/json'},
//             body: JSON.stringify({
//                 'workoutIdFromJSFile': workoutId
//             })
//         })
//         const data = await response.json()
//         console.log(data)
//         location.reload()
//     }catch(err){
//         console.log(err)
//     }
// }

// async function markComplete(){
//     const workoutId = this.parentNode.dataset.id
//     try{
//         const response = await fetch('workouts/markComplete', {
//             method: 'put',
//             headers: {'Content-type': 'application/json'},
//             body: JSON.stringify({
//                 'workoutIdFromJSFile': workoutId
//             })
//         })
//         const data = await response.json()
//         console.log(data)
//         location.reload()
//     }catch(err){
//         console.log(err)
//     }
// }

// async function markIncomplete(){
//     const workoutId = this.parentNode.dataset.id
//     try{
//         const response = await fetch('workouts/markIncomplete', {
//             method: 'put',
//             headers: {'Content-type': 'application/json'},
//             body: JSON.stringify({
//                 'workoutIdFromJSFile': workoutId
//             })
//         })
//         const data = await response.json()
//         console.log(data)
//         location.reload()
//     }catch(err){
//         console.log(err)
//     }
// }