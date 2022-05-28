import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import TaskState from '../models/taskStateModel.js';
import { generateToken,isAuth} from '../utils.js';
import data from '../data.js'


const taskStateRouter = express.Router();

taskStateRouter.get('/seed',async (req, res) => {
    const createdTaskStates = await TaskState.insertMany(data.taskStates);
    res.send({createdTaskStates})
  }
);


taskStateRouter.post(
  "/create",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const taskState = new TaskState({
      name: req.body.name,
      description: req.body.description,
      deleted:req.body.deleted,
    });
    const createdTaskState = await taskState.save();
    res.send({
      _id: createdTaskState._id,
      name: createdTaskState.name,
      description: createdTaskState.description,
      deleted:createdTaskState.deleted,
      
    });
  })
);

taskStateRouter.get(
  "/:id",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const taskState = await TaskState.findById(req.params.id);
    if (taskState) {
      res.send(taskState);
    } else {
      res.status(404).send({ message: "task State Not Found" });
    }
  })
);

taskStateRouter.get(
  "/",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const taskStates = await TaskState.find();
    res.send({ taskStates });
  })
);

taskStateRouter.delete(
  "/:id",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const taskState = await TaskState.findById(req.params.id);
    if (taskState) {
        const deleteTaskState = await taskState.remove();
        res.send({ message: "task State Deleted", taskState: deleteTaskState });
     }else {
      res.status(404).send({ message: "task State Not Found" });
    }
  })
);
taskStateRouter.put(
  '/:id',
 // isAuth,
  //isAdmin,
  expressAsyncHandler(async (req, res) => {
    const taskState = await TaskState.findById(req.params.id);
    if (taskState) {
      taskState.name = req.body.name || taskState.name;
      taskState.description = req.body.description || taskState.description;
      taskState.deleted = req.body.deleted || taskState.deleted;
      const updatedTaskState = await taskState.save();
      res.send({ message: 'task State Updated', taskState: updatedTaskState });
    } else {
      res.status(404).send({ message: 'task State Not Found' });
    }
  })
);


export default taskStateRouter;