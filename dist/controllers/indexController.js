"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sayHello(req, res) {
    return res.status(200).json({ message: `Hey ${req.hostname} User` });
}
function renderIndex(req, res) {
    let context = {
        hostName: req.hostname,
        message: "Wow Stupid Typescript & Express"
    };
    return res.status(200).json(context);
}
function showPostData(req, res) {
    let requestData = req.body;
    return res.status(200).json({ data: requestData });
}
const ControllerMethods = {
    indexMethod: sayHello,
    renderIndexPage: renderIndex,
    handlePost: showPostData
};
exports.default = ControllerMethods;
//# sourceMappingURL=indexController.js.map