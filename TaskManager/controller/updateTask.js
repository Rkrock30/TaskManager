const {
  httpErrorResponseHandler,
  httpSuccessResponseHandler,
} = require("../utils/common");
const { bodyValidtion } = require("../utils/bodyValidation");
const { Task } = require("../models/task");
async function updateTask(req, res) {
  try {
    const regSchema = Joi.object({
      title: Joi.string(),
      description: Joi.string(),
      status: Joi.string(),
      assignee: Joi.string()
    });
    const { valid, data, error } = await bodyValidtion(
      res,
      regSchema,
      req.body
    );

    if (!valid) {
      return httpErrorResponseHandler(res, 400, error);
    }

    let {taskId}=req.params

    let updateTask = await Task.findOneAndUpdate(
      {
        _id: taskId,
        isDeleted:"N"
      },
      data
    );

    if (updateTask && updateTask._id) {
      return httpSuccessResponseHandler(res, 200, "Task Updated succesfully");
    } else {
      return httpErrorResponseHandler(res, 400, "Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports.updateTask = updateTask;
