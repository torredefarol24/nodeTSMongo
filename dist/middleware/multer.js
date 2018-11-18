"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Multer = require("multer");
let fileUploadOptions = {
    dest: "storage"
};
const fileUpload = Multer(fileUploadOptions);
exports.default = fileUpload;
//# sourceMappingURL=multer.js.map