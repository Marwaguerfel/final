import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import TaskReport from '../models/taskReportModel.js';
import { generateToken,isAuth} from '../utils.js';

const taskReportRouter = express.Router();

taskReportRouter.get('/seed',async (req, res) => {
    const createdTaskReport = await TaskReport.insertMany(data.users);
    res.send({createdTaskReport})
  }
);


taskReportRouter.post(
  "/add",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const taskReport = new TaskReport({
      name: req.body.name,
      description: req.body.description,
      components :req.body.components,
      deleted:req.body.deleted,
    });
    const createdTaskReport = await user.save();
    res.send({
      _id: createdTaskReport._id,
      name: createdTaskReport.name,
      components :createdTaskReport.components,
      description: createdTaskReport.description,
      deleted:createdTaskReport.deleted,
      
    });
  })
);

taskReportRouter.get(
  "/:id",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const taskReport = await TaskReport.findById(req.params.id);
    if (taskReport) {
      res.send(taskReport);
    } else {
      res.status(404).send({ message: "task Report Not Found" });
    }
  })
);

taskReportRouter.get(
  "/",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const taskReport = await TaskReport.find();
    res.send({ taskReport });
  })
);

taskReportRouter.delete(
  "/:id",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const taskReport = await TaskReport.findById(req.params.id);
    if (taskReport) {
        const deleteTaskReport = await taskReport.remove();
        res.send({ message: "task Report Deleted", taskReport: deleteTaskReport });
     }else {
      res.status(404).send({ message: "task Report Not Found" });
    }
  })
);
taskReportRouter.put(
  '/:id',
 // isAuth,
  //isAdmin,
  expressAsyncHandler(async (req, res) => {
    const taskReport = await TaskReport.findById(req.params.id);
    if (taskReport) {
      taskReport.name = req.body.name || taskReport.name;
      taskReport.description = req.body.description || taskReport.description;
      taskReport.components = req.body.components || taskReport.components;
      taskReport.deleted = req.body.deleted || taskReport.deleted;
      const updatedTaskReport = await taskReport.save();
      res.send({ message: 'task Report Updated', taskReport: updatedTaskReport });
    } else {
      res.status(404).send({ message: 'task Report Not Found' });
    }
  })
);


export default taskReportRouter;