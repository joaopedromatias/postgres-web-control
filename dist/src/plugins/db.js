"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
async function db(fastify, _) {
    fastify.decorate('method', function () {
        return 'value';
    });
}
exports.db = db;
//# sourceMappingURL=db.js.map