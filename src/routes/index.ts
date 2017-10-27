import { Router } from 'express';

export let router = Router();

router.get('/', function(req, res) {
    // res.render('index');
    res.send("HI")
});

