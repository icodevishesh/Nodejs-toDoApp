const express = require('express');
const { newTask, getMyTask, updateTask, deleteTask} = require('../controller/task.js');
const { isAuthenticated } = require('../middlewares/auth.js');
const router = express.Router();
router.use(express.json());

router.post('/new', isAuthenticated, newTask);

router.get('/mytask', isAuthenticated, getMyTask);

router.route('/:id')
.put(isAuthenticated, updateTask)
.delete(isAuthenticated, deleteTask);

module.exports = router;
