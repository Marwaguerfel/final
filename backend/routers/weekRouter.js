import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Week from '../models/weekModel.js';
import { generateToken, isAuth } from '../utils.js';
import data from '../data.js';


const weekRouter = express.Router();

weekRouter.get('/seed', async (req, res) => {
  const createdWeek = await Week.insertMany(data.weeks);
  res.send({ createdWeek })
}
);


weekRouter.post(
  "/create",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const week = new Week({
      name: req.body.name,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      description: req.body.description,
      user:req.body.user,
      deleted: req.body.deleted,
    });
    const createdWeek = await week.save();
    res.send({
      _id: createdWeek._id,
      name: createdWeek.name,
      startDate: createdWeek.startDate,
      endDate: createdWeek.endDate,
      description: createdWeek.description,
      user:createdWeek.user,
      deleted: createdWeek.deleted,

    });
  })
);

weekRouter.get(
  "/:id",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const week = await Week.findById(req.params.id);
    if (week) {
      res.send(week);
      console.log(week);
    } else {
      res.status(404).send({ message: "week Not Found" });
    }
  })
);

weekRouter.get(
  "/",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const weeks = await Week.find().populate('user','firstName');
    res.send({ weeks });
  })
);

weekRouter.delete(
  "/:id",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const week = await Week.findById(req.params.id);
    if (week) {
      const deletedWeek = await week.remove();
      res.send({ message: "week Deleted", week: deletedWeek });
    } else {
      res.status(404).send({ message: "week Not Found" });
    }
  })
);
weekRouter.put(
  '/:id',
  // isAuth,
  //isAdmin,
  expressAsyncHandler(async (req, res) => {
    const week = await Week.findById(req.params.id);
    if (week) {
      week.name = req.body.name || week.name;
      week.startDate = req.body.startDate || week.startDate;
      week.endDate = req.body.endDate || week.endDate;
      week.description = req.body.description || week.description;
      week.user=req.body.user||week.user;
      const updatedWeek = await week.save();
      res.send({ message: 'week Updated', week: updatedWeek });
    } else {
      res.status(404).send({ message: 'week Not Found' });
    }
  })
);


export default weekRouter;