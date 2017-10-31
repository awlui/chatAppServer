"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todos_db_1 = require("./todos.db");
exports.todosWs = function (io) {
    let todos = io.of('/todos');
    todos.on('connection', function (socket) {
        socket.on('getAllTodos', function () {
            dispatchAll(socket);
        });
        socket.on('saveTodo', function (todo) {
            todos_db_1.todosDB.saveTodo(todo, function (err, data) {
                if (err)
                    throw err;
                dispatchAll(socket);
            });
        });
        socket.on('updateTodo', function (data) {
            todos_db_1.todosDB.updateTodo(data, function (err, data) {
                if (err)
                    throw err;
                dispatchAll(socket);
            });
        });
        socket.on('deleteTodo', function (data) {
            todos_db_1.todosDB.deleteTodo(data.id, function (err, data) {
                if (err)
                    throw err;
                dispatchAll(socket);
            });
        });
        dispatchAll(socket);
    });
    function dispatchAll(socket) {
        todos_db_1.todosDB.getAllTodos(function (err, data) {
            if (err)
                throw err;
            io.of('/todos').emit('allTodos', data);
        });
    }
    return todos;
};
