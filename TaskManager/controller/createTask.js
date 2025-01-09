const {
  httpErrorResponseHandler,
  httpSuccessResponseHandler,
} = require("../utils/common");
const { bodyValidtion } = require("../utils/bodyValidation");
const { Task } = require("../models/task");
async function createTask(req, res) {
  try {
    let { user } = req;
    let userId = user._id;
    const regSchema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      assignee: Joi.string().required(),
    });
    const { valid, data, error } = await bodyValidtion(
      res,
      regSchema,
      req.body
    );

    if (!valid) {
      return httpErrorResponseHandler(res, 400, error);
    }

    const {  title, description, assignee } = data;

    let createTask = await Task.create({
      title: title,
      description: description,
      assignee: assignee,
      createdBy: userId,
    });

    if (createTask && createTask._id) {
      return httpSuccessResponseHandler(res, 200, "Task Created succesfully");
    } else {
      return httpErrorResponseHandler(res, 400, "Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports.createTask = createTask;
