"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helmet_1 = __importDefault(require("@fastify/helmet"));
const fastify_1 = __importDefault(require("fastify"));
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const static_1 = __importDefault(require("@fastify/static"));
const path_1 = __importDefault(require("path"));
const db_1 = require("./plugins/db");
const fastify = (0, fastify_1.default)({ ignoreTrailingSlash: true });
const app = async () => {
    await fastify.register(helmet_1.default);
    await fastify.register((0, fastify_plugin_1.default)(db_1.db));
    await fastify.register(static_1.default, {
        root: path_1.default.join(process.cwd(), 'frontend', 'dist')
    });
    fastify.setErrorHandler(function (error, _, reply) {
        console.error(error);
        reply.send(error);
    });
    return fastify;
};
exports.default = app;
//# sourceMappingURL=app.js.map