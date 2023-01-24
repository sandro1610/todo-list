import Activities from  "../models/Activities.js";

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
        const activity_id = req.params.activity_id
        const activity = await Activities.findOne({where: {activity_id: activity_id}});
        if (activity == null ) {
            res.status(404).json({
                "status": "Not Found",
                "message": `Activity with ID ${activity_id} Not Found`
            });
        }else {
            res.status(200).json({
                "status": "Success",
                "message": "Success",
                "data": activity
            })
        };
    } catch (error) {
        res.status(500).json(error);
    }
}

export const createActivity = async (req, res) => {
    try {
        const title = req.body.title;
        const email = req.body.email;
        if (title == null || title == undefined) {
            res.status(400).json({
                "status": "bad Request",
                "message": "title cannot be null"
            });
        } else {
            const createActivity = await Activities.create({
                title : title,
                email: email
            });
            res.status(201).json({
                "status": "Success",
                "message": "Success",
                "data": createActivity
            });
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

export const updateActivity = async (req, res) => {
    const activity_id = req.params.activity_id;
    const title = req.body.title;
    const activity = await Activities.findOne({where: {activity_id: activity_id}});
    if (activity == null) {
        res.status(404).json({
            "status": "Not Found",
            "message": `Activity with ID ${activity_id} Not Found`
        });
    } else if (title == null || title == undefined) {
        res.status(400).json({
            "status": "Bad Request",
            "message": "Title cannot be null"
        });
    } else {
        await Activities.update({
            title : title
        },{
            where: {activity_id: activity_id}
        });
        const activityUpdate = await Activities.findOne({where: {activity_id: activity_id}});
        res.status(200).json({
            "status": "Success",
            "message": "Success",
            "data": activityUpdate
        });
    }
}

export const deleteActivity = async (req, res) => {
    const activity_id = req.params.activity_id
    const activity = await Activities.findOne({where: {activity_id: activity_id}});
    if (activity == null ) {
        res.status(404).json({
            "status": "Not Found",
            "message": `Activity with ID ${activity_id} Not Found`
        });
    }else {
        await Activities.destroy({where: {activity_id: activity_id}});
        res.status(200).json({
            "status": "Success",
            "message": "Success"
        })
    };
}
