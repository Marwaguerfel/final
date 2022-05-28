import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import TaskModel from '../models/taskMoModel.js';
//import { generateToken,isAuth} from '../utils.js';
import data from '../data.js';


const taskModelRouter = express.Router();



taskModelRouter.get('/seed',async (req, res) => {
       const createdTaskModel = await TaskModel.insertMany(data.taskModel);
       res.send({createdTaskModel});
  }
);


taskModelRouter.post(
  '/create',
  
  expressAsyncHandler(async (req, res) => {
    const taskModel = new TaskModel({
      name: req.body.name,
      description: req.body.description,
      taskTheme:req.body.taskTheme,
      deleted:req.body.deleted,
    });
    const createdTaskModel = await taskModel.save();
    res.send({ message: 'taskModel Created', taskModel: createdTaskModel });
  })
);

taskModelRouter.get(
  "/:id",
  //isAuth,
  expressAsyncHandler(async (req, res) => {

    const taskModel = await TaskModel.findById(req.params.id);
    if (taskModel) {
      res.send(taskModel);
    } else {
      res.status(404).send({ message: "taskModel Not Found" });
    }
  })
);

taskModelRouter.get(
  "/",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const taskModels = await TaskModel.find().populate('taskTheme','name ');
    res.send({ taskModels });
  })
);

taskModelRouter.delete(
  "/:id",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const taskModel = await TaskModel.findById(req.params.id);
    if (taskModel) {
        const deleteTaskModel = await taskModel.remove();
        res.send({ message: "taskModel Deleted", taskModel: deleteTaskModel });
     }else {
      res.status(404).send({ message: "taskModel Not Found" });
    }
  })
);
taskModelRouter.put(
  '/:id',
 // isAuth,
  //isAdmin,
  expressAsyncHandler(async (req, res) => {
    const taskModel = await TaskModel.findById(req.params.id);
    if (taskModel) {
      taskModel.name = req.body.name || taskModel.name;
      taskModel.description = req.body.description || taskModel.description;
      taskModel.taskTheme = req.body.taskTheme || taskModel.taskTheme;
      taskModel.deleted = req.body.deleted || taskModel.deleted;
      const updatedTaskModel = await taskModel.save();
      res.send({ message: 'taskModel Updated', taskModel: updatedTaskModel });
    } else {
      res.status(404).send({ message: 'taskModel Not Found' });
    }
  })
);


export default taskModelRouter;