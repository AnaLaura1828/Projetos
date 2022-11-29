import { Router } from 'express';
import TeamController from '../Controller/team.controller';

const router = Router();

const teamController = new TeamController();

router.get('/', (req, res) => teamController.getAllController(req, res));
router.get('/:id', (req, res) => teamController.getByIdController(req, res));

export default router;
