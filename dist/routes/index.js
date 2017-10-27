"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
exports.router = express_1.Router();
exports.router.get('/', function (req, res) {
    // res.render('index');
    res.send("HI");
});
