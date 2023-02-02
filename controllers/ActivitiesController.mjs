import Activities from  "../models/Activities.mjs";

export const getActivities = async (req, res) => {
    try {
        const activities = await Activities.findAll();
        res.status(200).json({
            "status": "Success",
            "message": "Success",
            "data": activities
        })
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getActivityById = async (req, res) => {
    try {
        const id = req.params.id
        const activity = await Activities.findOne({where: {id: id}});
        if (activity == null ) {
            return res.status(404).json({
                "status": "Not Found",
                "message": `Activity with ID ${id} Not Found`
            });
        }
        res.status(200).json({
            "status": "Success",
            "message": "Success",
            "data": activity
        })
    } catch (error) {
        res.status(500).json(error);
    }
}

export const createActivity = async (req, res) => {
    try {
        const title = req.body.title;
        const email = req.body.email;
        if (title == null) {
            return res.status(400).json({
                "status": "Bad Request",
                "message": "title cannot be null"
            });
        } 
        const createActivity = await Activities.create({
            title : title,
            email: email
        });
        res.status(201).json({
            "status": "Success",
            "message": "Success",
            "data": createActivity
        });
    } catch (error) {
        res.status(500).json(error);
    }
}

export const updateActivity = async (req, res) => {
    const id = req.params.id;
    const title = req.body.title;
    const activity = await Activities.findOne({where: {id: id}});
    if (activity == null) {
        return res.status(404).json({
            "status": "Not Found",
            "message": `Activity with ID ${id} Not Found`
        });
    } else if (title == null || title == undefined) {
        return res.status(400).json({
            "status": "Bad Request",
            "message": "Title cannot be null"
        });
    }
    await Activities.update({
        title : title
    },{
        where: {id: id}
    });
    const activityUpdate = await Activities.findOne({where: {id: id}});
    res.status(200).json({
        "status": "Success",
        "message": "Success",
        "data": activityUpdate
    });
}

export const deleteActivity = async (req, res) => {
    const id = req.params.id
    const activity = await Activities.findOne({where: {id: id}});
    if (activity == null ) {
        return res.status(404).json({
            "status": "Not Found",
            "message": `Activity with ID ${id} Not Found`
        });
    }
    await Activities.destroy({where: {id: id}});
    res.status(200).json({
        "status": "Success",
        "message": "Success"
    })
}
