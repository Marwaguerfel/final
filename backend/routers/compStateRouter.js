import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import ComponentState from '../models/compStateModel.js';
import { generateToken,isAuth} from '../utils.js';
import data from '../data.js';

const componentStateRouter = express.Router();

componentStateRouter.get('/seed',async (req, res) => {
    const createdComponentState = await ComponentState.insertMany(data.componentState);
    res.send({createdComponentState})
  }
);


componentStateRouter.post(
  "/create",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const componentState = new ComponentState({
      name: req.body.name,
      description: req.body.description,
      deleted:req.body.deleted,
    });
    const createdComponentState = await componentState.save();
    res.send({
      _id: createdComponentState._id,
      name: createdComponentState.name,
      description: createdComponentState.description,
      deleted:createdComponentState.deleted,
      
    });
  })
);

componentStateRouter.get(
  "/:id",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const componentState = await ComponentState.findById(req.params.id);
    if (componentState) {
      res.send(componentState);
    } else {
      res.status(404).send({ message: "ComponentState Not Found" });
    }
  })
);

componentStateRouter.get(
  "/",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const componentState = await ComponentState.find();
    res.send({ componentState });
  })
);

componentStateRouter.delete(
  "/:id",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const componentState = await ComponentState.findById(req.params.id);
    if (componentState) {
        const deleteComponentState = await componentState.remove();
        res.send({ message: "componentState Deleted", componentState: deleteComponentState });
     }else {
      res.status(404).send({ message: "componentState Not Found" });
    }
  })
);
componentStateRouter.put(
  '/:id',
 // isAuth,
  //isAdmin,
  expressAsyncHandler(async (req, res) => {
    const componentState = await ComponentState.findById(req.params.id);
    if (componentState) {
      componentState.name = req.body.name || componentState.name;
      componentState.description = req.body.description || componentState.description;
      componentState.deleted = req.body.deleted || componentState.deleted;
      const updatedComponentState = await componentState.save();
      res.send({ message: 'ComponentState Updated', componentState: updatedComponentState });
    } else {
      res.status(404).send({ message: 'ComponentState Not Found' });
    }
  })
);


export default componentStateRouter;