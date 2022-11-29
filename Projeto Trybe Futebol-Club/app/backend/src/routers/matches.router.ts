import { Router } from 'express';
import tokenValidate from '../middleware/tokenValidate';
import MatchesController from '../Controller/matches.controller';

const router = Router();

const matchesController = new MatchesController();

router.get('/', (req, res) => matchesController.getSearchController(req, res));
router.post('/', tokenValidate, matchesController.createMatchesController.bind(matchesController));
router.patch('/:id/finish', (req, res) => matchesController.patchMatchesController(req, res));
router.patch('/:id', (req, res) => matchesController.upDateMatchesController(req, res));
export default router;
