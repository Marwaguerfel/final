import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Task from '../models/taskModel.js';
import data from '../data.js'
import { generateToken,isAuth} from '../utils.js';

const taskRouter = express.Router();

taskRouter.get('/seed',async (req, res) => {
    const createdTask = await Task.insertMany(data.tasks);
    res.send({createdTask});
  }
);


taskRouter.post(
  "/create",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const tasks = new Task({
    name: req.body.name,
    description: req.body.description,
    week:req.body.week,
    user: req.body.user,
    startDate:req.body.startDate,
    endDate: req.body.endDate,
    taskModel: req.body.taskModel,  
    component:req.body.component,
    taskState:req.body.taskState,
      
      });
    const createdTask = tasks.save();

    res.send({
       _id: createdTask._id,
      name: createdTask.name,
      description: createdTask.description,
      week:createdTask.week,
      user: createdTask.user,
      startDate:createdTask.startDate,
      endDate: createdTask.endDate,
      taskModel: createdTask.taskModel,  
      component:createdTask.component,
      taskState:createdTask.taskState,
      
    });
        })
  );

taskRouter.get(
  "/:id",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const tasks = await Task.findById(req.params.id);
    if (tasks) {
      res.send(tasks);
    } else {
      res.status(404).send({ message: "Components Not Found" });
    }
  })
);

taskRouter.get(
  "/",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const tasks = await Task.find()
                .populate('week','name')
                .populate('user','firstName')
                .populate('taskModel','name')
                .populate('component','name')
                .populate('taskState','name');
               
               
    res.send({ tasks });
  })
);

taskRouter.delete(
  "/:id",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const tasks = await Task.findById(req.params.id);
    if (tasks) {
        const deletetasks = await tasks.remove();
        res.send({ message: "tasks Deleted", tasks: deletetasks });
     }else {
      res.status(404).send({ message: "tasks Not Found" });
    }
  })
);
taskRouter.put(
  '/:id',
 // isAuth,
  //isAdmin,
  expressAsyncHandler(async (req, res) => {
    const tasks = await Task.findById(req.params.id);
    if (tasks) {
       tasks.name=req.body.name||tasks.name;
       tasks.description=req.body.description||tasks.description;
       tasks.taskModel=req.body.taskModel||tasks.taskModel;
       tasks.week=req.body.week||tasks.week;
       tasks.startDate=req.body.startDate||tasks.startDate;
       tasks.endDate=req.body.endDate||tasks.endDate;
       tasks.user=req.body.user||tasks.user;
       tasks.taskState=req.body.taskState||tasks.taskState;
       const updatedTask = await tasks.save();
      res.send({ message: 'Components Updated', Tasks: updatedTask });
    } else {
      res.status(404).send({ message: 'Components Not Found' });
    }
  })
);


export default taskRouter;