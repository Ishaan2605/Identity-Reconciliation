"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const identifyControllers_1 = require("../controllers/identifyControllers");
const router = (0, express_1.Router)();
router.post('/', identifyControllers_1.identifyContact);
exports.default = router;
