import bcrypt from 'bcryptjs';

const data = {
  systems:[
    {
       name: 'sys1',
       description: 'froce1',
       deleted:false,

    }
  ],
  taskStates:[
    {
       name: 'b',
       description: 'stat01',
       deleted:false,

    }
  ],
  weeks:[
     {name: 'week01',
      startDate:'01/01/2022' ,
      endDate: '07/01/2022',
      description: 'hello',
      deleted: false,
    },
  ],
  users: [
    {
      firstName: 'marwa',
      lastName:'guerfel',
      email: 'superadmin@example.com',
      password: bcrypt.hashSync('1234', 8),
      isSuperAdmin:true,
      isAdmin:false,
      isDispatcher:false,

    },
    {
      firstName: 'eya',
      lastName:'fetni',
      email: 'admin@example.com',
      password: bcrypt.hashSync('1234', 8),
      isSuperAdmin:false,
      isAdmin:true,
      isDispatcher:false,
    },
       {
      firstName: 'eya',
      lastName:'fetni',
      email: 'user@example.com',
      password: bcrypt.hashSync('1234', 8),
      isSuperAdmin:false,
      isAdmin:false,
      isDispatcher:true,
    },
  ],
    taskTheme: [
      {
        name: 'check activity',
        description: 'check activity desc',
        deleted:false,
      },
      {
         name: 'routine activity',
        description: 'routine activity desc',
        deleted:false,
      },
      {
        name: 'training',
        description: 'training desc',
        deleted:false,
      },
    ],
    taskModel: [
      {
        name: 'check model',
        description: 'check activity desc',
        deleted:false,
      },
      {
         name: 'routine model',
        description: 'routine activity desc',
        deleted:false,
      },
      {
        name: 'training model',
        description: 'training desc',
        deleted:false,
      },
    ],
    tasks: [
      { 

        
      name:"task200",
      description:"task",
      week:"6286acff424ad69c4e28d9bd",
      user:"62729a6a6a07db478043af2a",
      startDate:'01/01/2022',
      endDate:'07/01/2022',
      taskModel:"626323a3f87f1f01aaf98437",
      component: "628611d8d2f33a3d47472692",
      taskState:"6252ca7a1251be5bc988d6af"
  }
    ],
  };
  export default data;