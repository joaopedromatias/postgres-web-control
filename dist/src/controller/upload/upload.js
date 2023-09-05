"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadController = void 0;
async function uploadController(request, reply) {
    try {
    }
    catch (err) {
        console.error(err);
        reply.status(500);
        reply.send({
            message: err.message,
            sucess: false
        });
    }
}
exports.uploadController = uploadController;
//# sourceMappingURL=upload.js.map