const Workout = require('../models/Workout')
const bcrypt = require('../')
//cryptr stuff; remember to change secret key to .env variable
const Cryptr = require('cryptr')
const cryptr = new Cryptr('SampleSecretKey')

// //-=-=-=-=-=-=-//Encoder/Decoder//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=//
// class MrCryptr {
//     contructor() {}
//     //objBool for if it should parse decoded data, exclude or false if not an obj.
//     encodeData(data, objBool) {
//         if (objBool) { 
//             const obj = JSON.stringify(data)
//             const encryptedObj = cryptr.encrypt(obj)
//             return encryptedObj
//         }
//         const encryptedData = cryptr.encrypt(data)
//         return encryptedData
//     }
//     //objBool for if it should parse decoded data, exclude or false if not an obj.
//     decodeData(data, objBool) {
//         const decoded = cryptr.decrypt(data)
//         if (objBool) {
//             return JSON.parse(decoded)
//         } else {
//             return decoded
//         }
//     }
// }
// let cryptrKeeper = new MrCryptr()
// //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-//


module.exports = {
    getHome: (req,res)=>{
        res.render('index.ejs')
    },
    getCookiePrivacyPolicy: async (req, res) => {
        res.render('privacyCookies.ejs')
    },

    getWorkouts: async (req,res)=>{
        console.log(req.user)
        try{
            const workoutItems = await Workout.find({userId:req.user.id})
            const workoutsLeft = await Workout.countDocuments
            //add a find for partial as well
            ({userId:req.user.id,completed: false})
            res.render('workouts.ejs', {workouts: workoutItems, left: workoutsLeft, user: req.user, points: req.user.points})
        }catch(err){
            console.log(err)
        }
    },
    createWorkout: async (req, res)=>{
        
        if (!req.body || !req.body.workoutName || !req.body.reps || !req.user.id) {
           res.redirect('/workouts')
        }
        try{
            console.log(req.body.workoutName, req.body.reps, req.user.id)
            let newWorkout = new Workout ({
                workout: req.body.workoutItems,
                reps: req.body.reps,
                status: req.body.status,
                userId: req.user.id
            })
            // await Workout.create({workout: req.body.workoutItem, reps: req.body.reps, completed: false, userId: req.user.id})
            newWorkout.save()
            console.log('Workout has been added!')
            res.redirect('/workouts')
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{
        const dataToggleKey = {
            completed: 'completed',
            notCompleted: 'partialCompleted',
            partialCompleted: 'completed'
          }
          const workout = await Workout.findOne({_id:req.body.workoutIdFromJSFile})
          console.log(workout)
          if (workout.status === 'notCompleted') {
            try{
                await Workout.findOneAndUpdate({_id:req.body.workoutIdFromJSFile},{
                    status: 'partialCompleted'
                })
                console.log('Marked Partial Complete')
                res.json('Marked Partial Complete')
            }catch(err){
                console.log(err)
            }
          }
          else if (workout.status === 'partialCompleted') {
            try{
                await Workout.findOneAndUpdate({_id:req.body.workoutIdFromJSFile},{
                    status: 'completed'
                })
                console.log('Marked Complete')
                res.json('Marked Complete')
            }catch(err){
                console.log(err)
            }
          }
          else if (workout.status === 'completed') {
            try{
                await Workout.findOneAndUpdate({_id:req.body.workoutIdFromJSFile},{
                    status: 'notCompleted'
                })
                console.log('Marked Not Complete')
                res.json('Marked Not Complete')
            }catch(err){
                console.log(err)
            }
          }

        
    },
    // markComplete: async (req, res)=>{
    //     const dataToggleKey = {
    //         completed: 'completed',
    //         notCompleted: 'partialCompleted',
    //         partialCompleted: 'completed'
    //       }
    //     try{
    //         await Workout.findOneAndUpdate({_id:req.body.workoutIdFromJSFile},{
    //             completed: true
    //         })
    //         console.log('Marked Complete')
    //         res.json('Marked Complete')
    //     }catch(err){
    //         console.log(err)
    //     }
    // },
    markIncomplete: async (req, res)=>{
        try{
            await Workout.findOneAndUpdate({_id:req.body.workoutIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteWorkout: async (req, res)=>{
        console.log(req.body.workoutIdFromJSFile)
        try{
            await Workout.findOneAndDelete({_id:req.body.workoutIdFromJSFile})
            console.log('Deleted Workout')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}






// original code

// const Todo = require('../models/Todo')

// module.exports = {
//     getTodos: async (req,res)=>{
//         console.log(req.user)
//         try{
//             const todoItems = await Todo.find({userId:req.user.id})
//             const itemsLeft = await Todo.countDocuments({userId:req.user.id,completed: false})
//             res.render('todos.ejs', {todos: todoItems, left: itemsLeft, user: req.user})
//         }catch(err){
//             console.log(err)
//         }
//     },
//     createTodo: async (req, res)=>{
//         try{
//             await Todo.create({todo: req.body.todoItem, completed: false, userId: req.user.id})
//             console.log('Todo has been added!')
//             res.redirect('/todos')
//         }catch(err){
//             console.log(err)
//         }
//     },
//     markComplete: async (req, res)=>{
//         try{
//             await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
//                 completed: true
//             })
//             console.log('Marked Complete')
//             res.json('Marked Complete')
//         }catch(err){
//             console.log(err)
//         }
//     },
//     markIncomplete: async (req, res)=>{
//         try{
//             await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
//                 completed: false
//             })
//             console.log('Marked Incomplete')
//             res.json('Marked Incomplete')
//         }catch(err){
//             console.log(err)
//         }
//     },
//     deleteTodo: async (req, res)=>{
//         console.log(req.body.todoIdFromJSFile)
//         try{
//             await Todo.findOneAndDelete({_id:req.body.todoIdFromJSFile})
//             console.log('Deleted Todo')
//             res.json('Deleted It')
//         }catch(err){
//             console.log(err)
//         }
//     }
// }    