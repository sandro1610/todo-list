import express from 'express';
import * as Activities from "../controllers/ActivitiesController.mjs";

const  router = express.Router();

router.get('/activity-groups', Activities.getActivities);
router.get('/activity-groups/:id', Activities.getActivityById);
router.post('/activity-groups', Activities.createActivity);
router.patch('/activity-groups/:id', Activities.updateActivity);
router.delete('/activity-groups/:id', Activities.deleteActivity);

export default router;