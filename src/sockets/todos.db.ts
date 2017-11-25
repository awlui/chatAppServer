import * as mongojs from 'mongojs';
import * as dotenv from 'dotenv';
dotenv.config();
let mongoHOST = process.env.MONGOHOST;
let mongoPORT = process.env.MONGOPORT;

const db = mongojs(`mongodb://${mongoHOST}:${mongoPORT}/newDB`);


export let todosDB = {
    getAllTodos: function(callback) {
        db.todos.find(callback);
    },
    saveTodo: function(todo, callback) {
        console.log(todo);
        db.todos.insert(todo, callback);
    },
    updateTodo: function(todo, callback) {
        db.todos.update({
            id: todo.id
        }, todo, {}, callback);
    },
    deleteTodo: function(id, callback) {
        db.todos.remove({
            id: id
        }, '', callback);
    }
}
