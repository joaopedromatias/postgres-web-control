"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
async function startApp() {
    try {
        const server = await (0, app_1.default)();
        server.listen({ port: Number(process.env.PORT) || 3000, host: '127.0.0.1' }, (error, address) => {
            if (error) {
                throw error;
            }
            console.log(`server is listening on ${address}`);
        });
    }
    catch (error) {
        console.error(error);
    }
}
startApp();
//# sourceMappingURL=index.js.map