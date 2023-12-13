const client = require('../connection');
const queries = require('../models/queries')
const redis = require('redis');
const redisClient = redis.createClient();
const DEFAULT_EXP = 3600;
const itemsPerPage = 5;


exports.getAllTodo = async (req, res, next) =>{
    const page = req.query.page;
    const offset = ( page - 1 ) * itemsPerPage;
    await redisClient.connect()
    redisClient.get("todos", (err, todos)=>{
        if (err) console.err(err)
        // if (todos != null){
        //     return res.json(JSON.parse(todos))
        // }
        client.query( 'SELECT * FROM todo LIMIT $1 OFFSET $2', [itemsPerPage, offset],(err, results)=>{
            if (err){
                throw err;
            }
            redisClient.on('error', err => console.log('Redis Client Error', err));
            redisClient.setEx("todos", DEFAULT_EXP, JSON.stringify(results.rows))
            res.status(200).json({ results: results.rows})
            
        })
    })
}

exports.postTodo = (req, res, next) =>{
    const { title, description, isCompleted, duedate } = req.body;
    client.query( queries.addTodo, [ title, description, isCompleted, duedate], (err, results)=>{
        if (err) throw err
        res.status(201).json({ msg: 'todo created successfully'})
    })
}

exports.getTodo = (req, res, next) =>{
    const id = parseInt(req.params.id)
    client.query( queries.getTodosById, [id], (err, results)=>{
        if (err) throw err
        res.status(200).json({ todo: results.rows})
    })
}

exports.updateTodoStatus = (req, res, next) =>{
    const id = parseInt(req.params.id);
    const { isCompleted } = req.body;

    client.query( queries.getTodoById, [id], (err, results)=>{
        // const noTodoFound = !results.rows.length;
        if (!results.rows.length){
            res.json('todo does not exist in database')
        }
        client.query(queries.updateTodoStatus, [isCompleted, id], (err, results)=>{
            if (err) throw err;
            res.status(200).json({ msg: 'todo updated successfully'})
        })
        
    })
}

exports.deleteTodo = (req, res, next) =>{
    const id = parseInt(req.params.id)

    client.query( queries.getTodoById, [id], (err, results)=>{
        const noTodoFound = !results.rows.length;
        if (noTodoFound){
            res.json('todo does not exist in database')
        }
        client.query(queries.deleteTodo, [id], (err, results)=>{
            if (err) throw err;
            res.status(200).json({ msg: 'Student removed successfully'})
        })
        
    })
}