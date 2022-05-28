import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routers/userRouter.js';
import weekRouter from './routers/weekRouter.js';
import taskThemeRouter from './routers/taskThemeRouter.js';
import taskStateRouter from './routers/taskStateRouter.js';
import taskModelRouter from './routers/taskMoRouter.js';
import systemRouter from './routers/systemRouter.js';
import groupRouter from './routers/groupRouter.js' 
import componentStateRouter from './routers/compStateRouter.js'
import taskRouter from './routers/taskRouter.js'
import componentsRouter from './routers/componentsRouter.js'
dotenv.config();


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(cors());


mongoose.connect('mongodb://localhost/projet',/*{//mahabech ymchi b hethi lazem narj3 nchoufha lwach
  useNewUrlParser: true,
  useUnifiedTopology: true,
 
}*/);
app.use('/api/tasks',taskRouter);
app.use('/api/components',componentsRouter);
app.use('/api/compState',componentStateRouter);
app.use('/api/groups',groupRouter);
app.use('/api/systems',systemRouter)
app.use('/api/taskModels',taskModelRouter);
app.use('/api/taskStates',taskStateRouter);
app.use('/api/taskThemes',taskThemeRouter);
app.use('/api/users',userRouter);
app.use('/api/weeks',weekRouter);
app.get('/', (req, res) => {
  res.send('Server is ready');
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});