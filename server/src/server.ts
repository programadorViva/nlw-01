import express from 'express';
import cors from 'cors';
import routes from './routes';
import path from 'path';
import { errors } from 'celebrate';

const app = express();

app.use(cors())
app.use(express.json());

const users = [
'Diego',  // 0
'Sergio', // 1
'Paçoca',
'Daniel'
];

app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.use(errors());

// app.get('/users', (request, response) => {    
//     const search = String(request.query.search);
    
//     const filteredUsers = search ? users.filter(user=> user.includes(search)) : users;

//     response.json(filteredUsers);
// });

// app.get('/users/:id', (request, response) => {

//     const id = Number(request.params.id);

//     const user = users[id];

//     response.json(user);
// });

// app.post('/users', (request,response) => {
//     const data = request.body;

//     const user = {
//         name: data.name,
//         email: data.email
//     }
    
//     return response.json(user);    
// });

app.listen(3333);