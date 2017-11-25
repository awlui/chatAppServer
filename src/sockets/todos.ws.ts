import { todosDB } from './todos.db';
export let todosWs = function(io) {
    let todos = io.of('/todos');
    todos.on('connection', function(socket) {
        socket.on('getAllTodos', function() {
            dispatchAll(socket);
        });
        socket.on('saveTodo', function({data: todo}) {
            todosDB.saveTodo(todo, function(err, {data}) {
                if (err) throw err;
                dispatchAll(socket);
            });
        });
        socket.on('updateTodo', function({data}) {
            todosDB.updateTodo(data, function(err, data) {
                if (err) throw err;
                dispatchAll(socket);
            });
        });
        socket.on('deleteTodo', function({data}) {
            todosDB.deleteTodo(data.id, function(err, data) {
                if (err) throw err;
                dispatchAll(socket);
            });
        });
        dispatchAll(socket);
    });

function dispatchAll(socket) {

    todosDB.getAllTodos(function(err, data) {
        if (err) throw err;
        io.of('/todos').emit('allTodos', data);
    });
}

    return todos;
}
