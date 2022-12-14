import { Router } from 'express';
import LeaderboardController from '../Controller/leaderBoard.controller';

const router = Router();

const leaderboardController = new LeaderboardController();

router.get('/home', (req, res) => leaderboardController.getAllHome(req, res));

router.get('/away', (req, res) => leaderboardController.getAllAway(req, res));

export default router;
