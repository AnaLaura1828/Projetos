import { Router } from 'express';
import LeaderboardController from '../Controller/leaderBoard.controller';

const router = Router();

const leaderboardController = new LeaderboardController();

router.get('/home', (req, res) => leaderboardController.getAll(req, res));

export default router;
