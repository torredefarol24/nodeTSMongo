"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function indexPage(req, res) {
    let context = {
        hostName: req.hostname,
        message: "Wow Typescript & Node",
    };
    res.render("index/home.pug", context);
}
function aboutPage(req, res) {
    let context = {
        hostName: req.hostname,
        message: "About Us",
    };
    res.render("index/about.pug", context);
}
const ControllerMethods = {
    renderIndexPage: indexPage,
    renderAboutPage: aboutPage
};
exports.default = ControllerMethods;
//# sourceMappingURL=index.js.map