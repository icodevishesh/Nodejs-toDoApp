const ErrorHandler = require('../middlewares/error.js');
const { Task, isCompleted } = require('../models/task.js');

const newTask = async(req, res, next) =>{
    try {
        const { title, description} = req.body;

    await Task.create({
        title,
        description,
        user: req.user
    })
    res.status(201).json({
        success: true,
        message: 'Task added successfully'  
    })
    } catch (error) {
        next(error);
    }
}

const getMyTask = async(req, res, next)=>{
    try {
        const tasks = await Task.find({user: req.user._id});

    res.status(200).json({
        success: true,
        tasks
    })
    } catch (error) {
        next(error);
    }
}

const updateTask = async(req, res, next)=>{
    try {
        const task = await Task.findById(req.params.id);

    if(!task){
        return res.status(404).json({
            success: false,
            message: 'Task not found'
        });
    }else{
        task.isCompleted = !task.isCompleted;
        await task.save();
    }
     res.status(200).json({
        success: true,
        message: 'Task updated successfully'
    })
    } catch (error) {
        next(error);
    }
}

const deleteTask = async(req, res, next)=>{
    try {
        const task = await Task.findById(req.params.id);

    if(!task){
        return res.status(404).json({
            success: false,
            message: 'Task not found'
        });
    }else{
        await task.deleteOne();
    }
     res.status(200).json({
        success: true,
        message:'Task deleted successfully'
    })
    } catch (error) {
        next(error);
    }
}

module.exports = {newTask, getMyTask, updateTask, deleteTask};