import Todos from  "../models/Todos.js";

export const getTodos = async (req, res) => {
    try {
        const activity_group_id = req.query.activity_group_id;
        let todos;
        if (activity_group_id == null || activity_group_id == undefined) {
            todos = await Todos.findAll();
        } else {
            todos = await Todos.findAll({where: {activity_group_id: activity_group_id}});
        }
        res.status(200).json({
            "status": "Success",
            "message": "Success",
            "data": todos
        })
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getTodoById = async (req, res) => {
    try {
        const todo_id = req.params.todo_id
        const todo = await Todos.findOne({where: {todo_id: todo_id}});
        if (todo == null ) {
            res.status(404).json({
                "status": "Not Found",
                "message": `Todo with ID ${todo_id} Not Found`
            });
        }else {
            res.status(200).json({
                "status": "Success",
                "message": "Success",
                "data": todo
            })
        };
    } catch (error) {
        res.status(500).json(error);
    }
}

export const createTodo = async (req, res) => {
    try {
        const title = req.body.title;
        const activity_group_id = req.body.activity_group_id;
        const priority = req.body.priority;
        if (title == null ) {
            res.status(400).json({
                "status": "bad Request",
                "message": "title cannot be null"
            });
        } else if (activity_group_id == null || activity_group_id == undefined) {
            res.status(400).json({
                "status": "bad Request",
                "message": "activity_group_id cannot be null"
            });
        } else {
            const todoCreate = await Todos.create({
                title : title,
                activity_group_id : activity_group_id,
                priority : priority
            });
            res.status(201).json({
                "status": "Success",
                "message": "Success",
                "data": todoCreate
            });
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

export const updateTodo = async (req, res) => {
    const todo_id = req.params.todo_id;
    const title = req.body.title;
    const todo = await Todos.findOne({where: {todo_id: todo_id}});
    if (todo == null) {
        res.status(404).json({
            "status": "Not Found",
            "message": `Todo with ID ${todo_id} Not Found`
        });
    } else if (title == null || title == undefined) {
        res.status(400).json({
            "status": "Bad Request",
            "message": "Title cannot be null"
        });
    } else {
        await Todos.update({
            title : title
        },{
            where: {todo_id: todo_id}
        });
        const todoUpdate = await Todos.findOne({where: {todo_id: todo_id}});
        res.status(200).json({
            "status": "Success",
            "message": "Success",
            "data": todoUpdate
        });
    }
}

export const deleteTodo = async (req, res) => {
    const todo_id = req.params.todo_id
    const todo = await Todos.findOne({where: {todo_id: todo_id}});
    if (todo == null) {
        res.status(404).json({
            "status": "Not Found",
            "message": `Todo with ID ${todo_id} Not Found`
        });
    }else {
        await Todos.destroy({where: {todo_id: todo_id}});
        res.status(200).json({
            "status": "Success",
            "message": "Success"
        })
    };
}
