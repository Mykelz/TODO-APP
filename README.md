# SIMPLE TODO APP.
This is a simple todo rest api built with nodeJS and Postgresql that allow users to create and manage their various task in an organized manner.
It allows users to perform all the basic CRUD operations.

## EndPoints
#### Create Task - Users can create a tasks by sending a POST request to /todo after filling out their task details.
#### Get all Task- To see all tasks that has been created you send a GET request to /todos.
#### Get a Task- To get a particular task, you send a GET request with the id of the specific task as a param in the endpoint "/todo/:id".
#### Update a Task Status- To update a task status, you send a PUT request to /todo/:id/status with the id of the specific task as a param in the endpoint.
#### Delete Task- To delete a specific task, you send a delete request to /todo/:id with the id of the specific task as a param in the endpoint
