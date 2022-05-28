import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import System from '../models/systemModel.js';
import {isAuth} from '../utils.js';
import data from '../data.js';

const systemRouter = express.Router();

systemRouter.get('/seed',async (req, res) => {
    const createdSystem = await System.insertMany(data.systems);
    res.send({createdSystem})
  }
);


systemRouter.post(
  "/create",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const system = new System({
      name: req.body.name,
      description: req.body.description,
      deleted:req.body.deleted,
    });
    const createdSystem = await system.save();
    res.send({
      _id: createdSystem._id,
      name: createdSystem.name,
      description: createdSystem.description,
      deleted:createdSystem.deleted,
      
    });
  })
);

systemRouter.get(
  "/:id",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const system = await System.findById(req.params.id);
    if (system) {
      res.send(system);
    } else {
      res.status(404).send({ message: "system Not Found" });
    }
  })
);

systemRouter.get(
  "/",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const system = await System.find();
    res.send({ system });
  })
);

systemRouter.delete(
  "/:id",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const system = await System.findById(req.params.id);
    if (system) {
        const deleteSystem = await system.remove();
        res.send({ message: "system Deleted", system: deleteSystem });
     }else {
      res.status(404).send({ message: "system Not Found" });
    }
  })
);
systemRouter.put(
  '/:id',
 // isAuth,
  //isAdmin,
  expressAsyncHandler(async (req, res) => {
    const system = await System.findById(req.params.id);
    if (system) {
      system.name = req.body.name || system.name;
      system.description = req.body.description || system.description;
      system.deleted = req.body.deleted || system.deleted;
      const updatedSystem = await system.save();
      res.send({ message: 'system Updated', system: updatedSystem });
    } else {
      res.status(404).send({ message: 'system Not Found' });
    }
  })
);


export default systemRouter;