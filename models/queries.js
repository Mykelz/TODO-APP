const getTodoById = "SELECT * FROM todo WHERE id = $1";
const addTodo = "INSERT INTO todo (title, description, isCompleted, duedate) VALUES ($1, $2, $3, $4)";
const deleteTodo = "DELETE FROM todo WHERE id= $1";
const updateTodoStatus = "UPDATE todo SET isCompleted = $1 WHERE id =$2 "


module.exports = {
    getTodoById,
    addTodo,
    deleteTodo,
    updateTodoStatus

}