import { Router } from 'express';
import User from './user.router';
import Team from './team.router';
import Matches from './matches.router';
import LeaderBoard from './leaderBoard.router';

const router = Router();

router.use('/login', User);
router.use('/teams', Team);
router.use('/matches', Matches);
router.use('/leaderboard', LeaderBoard);

export default router;
