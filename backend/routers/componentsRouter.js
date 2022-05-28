import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Components from '../models/componentsModel.js';
import { generateToken,isAuth} from '../utils.js';

const componentsRouter = express.Router();

componentsRouter.get('/seed',async (req, res) => {
    const createdComponents = await Components.insertMany(data.components);
    res.send({createdComponents})
  }
);


componentsRouter.post(
  "/create",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const components = new Components({
      name: req.body.name,
      description: req.body.description,
      taskTheme:req.body.taskTheme,
      taskModel: req.body.taskModel,
      deleted:req.body.deleted,
    });
    const createdComponents = components.save();
    res.send({
      _id: createdComponents._id,
      name: createdComponents.name,
      description: createdComponents.description,
      taskTheme:createdComponents.taskTheme,
      taskModel: createdComponents.taskModel,
      deleted:createdComponents.deleted,
      
    });
  })
);

componentsRouter.get(
  "/:id",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const components = await Components.findById(req.params.id);
    if (components) {
      res.send(components);
    } else {
      res.status(404).send({ message: "Components Not Found" });
    }
  })
);

componentsRouter.get(
  "/",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const components = await Components.find().populate('taskTheme','name').populate('taskModel','name');
    res.send({ components });
  })
);

componentsRouter.delete(
  "/:id",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const components = await Components.findById(req.params.id);
    if (components) {
        const deleteComponents = await components.remove();
        res.send({ message: "components Deleted", components: deleteComponents });
     }else {
      res.status(404).send({ message: "components Not Found" });
    }
  })
);
componentsRouter.put(
  '/:id',
 // isAuth,
  //isAdmin,
  expressAsyncHandler(async (req, res) => {
    const components = await Components.findById(req.params.id);
    if (components) {
      components.name = req.body.name || components.name;
      components.description = req.body.description || components.description;
      components.taskTheme=req.body.taskTheme||components.taskTheme;
      components.taskModel = req.body.taskModel || components.taskModel;
      components.deleted = req.body.deleted || components.deleted;
      const updatedComponents = await components.save();
      res.send({ message: 'Components Updated', components: updatedComponents });
    } else {
      res.status(404).send({ message: 'Components Not Found' });
    }
  })
);


export default componentsRouter;