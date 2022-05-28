import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Departement from '../models/departementModel.js';
import { generateToken,isAuth} from '../utils.js';

const departementsRouter = express.Router();

departementsRouter.get('/seed',async (req, res) => {
    const createdDepartement = await Departement.insertMany(data.users);
    res.send({createdDepartement})
  }
);


departementsRouter.post(
  "/add",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const departement = new Departement({
      name: req.body.name,
      description: req.body.description,
      deleted:req.body.deleted,
    });
    const createdDepartement = await user.save();
    res.send({
      _id: createdDepartement._id,
      name: createdDepartement.name,
      description: createdDepartement.description,
      deleted:createdDepartement.deleted,
      
    });
  })
);

departementsRouter.get(
  "/:id",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const departement = await Departement.findById(req.params.id);
    if (departement) {
      res.send(departement);
    } else {
      res.status(404).send({ message: "Departement Not Found" });
    }
  })
);

departementsRouter.get(
  "/",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const departement = await Departement.find();
    res.send({ departement });
  })
);

departementsRouter.delete(
  "/:id",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const departement = await Departement.findById(req.params.id);
    if (departement) {
        const deleteDepartement = await departement.remove();
        res.send({ message: "departement Deleted", departement: deleteDepartement });
     }else {
      res.status(404).send({ message: "departement Not Found" });
    }
  })
);
departementsRouter.put(
  '/:id',
 // isAuth,
  //isAdmin,
  expressAsyncHandler(async (req, res) => {
    const departement = await Departement.findById(req.params.id);
    if (departement) {
      departement.name = req.body.name || departement.name;
      departement.description = req.body.description || departement.description;
      departement.deleted = req.body.deleted || departement.deleted;
      const updatedDepartement = await departement.save();
      res.send({ message: 'departement Updated', departement: updatedDepartement });
    } else {
      res.status(404).send({ message: 'departement Not Found' });
    }
  })
);


export default departementsRouter;