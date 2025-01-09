const { httpErrorResponseHandler, httpSuccessResponseHandler } = require('../utils/common');
const { Task } = require('../models/task');

async function getTask(req, res) {
    try {
        const { user } = req;
        const userId = user._id;
        let getAllTask = await Task.find({
            assignee: userId ,
            isDeleted: "N"
        });

        if (getAllTask.length === 0) {
            return httpErrorResponseHandler(res, 400, "No data found");
        }

        return httpSuccessResponseHandler(res, 200, "Success", getAllTask);

    } catch (err) {
        console.log(err);
        return httpErrorResponseHandler(res, 500, "Internal server error");
    }
}

module.exports.getTask = getTask;
