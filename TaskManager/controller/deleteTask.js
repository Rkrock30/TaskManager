const {
    httpErrorResponseHandler,
    httpSuccessResponseHandler,
  } = require("../utils/common");
  const { Task } = require("../models/task");
  async function deleteTask(req, res) {
    try {

      const {taskId} =req.params ;
  
      let updateTask = await Task.findOneAndUpdate(
        { _id: taskId },  
        { isDeleted: 'Y' }, 
        { new: true }  
    );
  
      if (updateTask && updateTask._id) {
        return httpSuccessResponseHandler(res, 200, "Task Deleted succesfully");
      } else {
        return httpErrorResponseHandler(res, 400, "Something Went Wrong");
      }
    } catch (err) {
      console.log(err);
    }
  }
  
  module.exports.deleteTask=deleteTask
  