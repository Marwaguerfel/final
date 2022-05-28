import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import TaskTheme from '../models/taskThemeModel.js';
import data from '../data.js'
const taskThemeRouter = express.Router();

taskThemeRouter.get('/seed',async (req, res) => {
    const createdTaskTheme = await TaskTheme.insertMany(data.taskTheme);
    res.send({createdTaskTheme})
  }
);

taskThemeRouter.post(
  "/create",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const taskTheme = new TaskTheme({
      name: req.body.name,
      description: req.body.description,
      deleted:req.body.deleted,
    });
    const createdTaskTheme = await taskTheme.save();
    res.send({
      _id: createdTaskTheme._id,
      name: createdTaskTheme.name,
      description: createdTaskTheme.description,
      deleted:createdTaskTheme.deleted,
      
    });
  })
);

taskThemeRouter.get(
  "/:id",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const taskTheme = await TaskTheme.findById(req.params.id);
    if (taskTheme) {
      res.send(taskTheme);
    } else {
      res.status(404).send({ message: "task Theme Not Found" });
    }
  })
);

taskThemeRouter.get(
  "/",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const taskThemes = await TaskTheme.find();
    res.send({ taskThemes });
  })
);

taskThemeRouter.delete(
  "/:id",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const taskTheme = await TaskTheme.findById(req.params.id);
    if (taskTheme) {
        const deleteTaskTheme = await taskTheme.remove();
        res.send({ message: "task Theme Deleted", taskTheme: deleteTaskTheme });
     }else {
      res.status(404).send({ message: "task Theme Not Found" });
    }
  })
);
taskThemeRouter.put(
  '/:id',
 // isAuth,
  //isAdmin,
  expressAsyncHandler(async (req, res) => {
    const taskTheme = await TaskTheme.findById(req.params.id);
    if (taskTheme) {
      taskTheme.name = req.body.name || taskTheme.name;
      taskTheme.description = req.body.description || taskTheme.description;
      const updatedTaskTheme = await taskTheme.save();
      res.send({ message: 'task Theme Updated', taskTheme: updatedTaskTheme });
    } else {
      res.status(404).send({ message: 'task Theme Not Found' });
    }
  })
);


export default taskThemeRouter;