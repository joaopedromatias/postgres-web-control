"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadRouter = void 0;
const upload_1 = require("../controller/upload/upload");
async function uploadRouter(app) {
    app.get('/', {
        schema: {}
    }, upload_1.uploadController);
}
exports.uploadRouter = uploadRouter;
//# sourceMappingURL=upload.js.map