const service = require("../../service/auth/register");
const {responseHandler,clientHandler} = require("../../middleware/response-handler");
const {useErrorHandler} = require("../../middleware/error-handler");
exports.register= async (req, res, next) => {
    try {
        const body = req.body;
        const user = await service.registerUser(body);
          if (user.status === 400) {
      return clientHandler({}, res,user.message, user.status); 
    // const error = new Error(user.message);
    //   error.status = user.status; // optional
    //   return useErrorHandler(error, req, res, next);
    }
        responseHandler(user.data, res, user.message, 200);
      } catch (err) {
          console.error(err);
        next(err);
      }
}