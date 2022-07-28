const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { version } = require("joi");

const userSchema = Schema({}, { versionKey: false });
