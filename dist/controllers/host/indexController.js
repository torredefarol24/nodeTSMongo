"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function welcome(req, res) {
    return res.status(200).json({ message: `Hey ${req.hostname} User` });
}
function indexPage(req, res) {
    let context = {
        hostName: req.hostname,
        message: "Wow Typescript & Express",
    };
    res.render("index/index.pug", context);
}
const ControllerMethods = {
    indexMethod: welcome,
    renderIndexPage: indexPage,
};
exports.default = ControllerMethods;
//# sourceMappingURL=indexController.js.map