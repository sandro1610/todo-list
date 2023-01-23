import express from 'express';
import * as Activities from "../controllers/ActivitiesController.js";

const  router = express.Router();

router.get('/activity-groups', Activities.getActivities);
router.get('/activity-groups/:activity_id', Activities.getActivityById);
router.post('/activity-groups', Activities.createActivity);
router.patch('/activity-groups/:activity_id', Activities.updateActivity);
router.delete('/activity-groups/:activity_id', Activities.deleteActivity);

export default router;