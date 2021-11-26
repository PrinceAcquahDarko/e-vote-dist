"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var pino_1 = __importDefault(require("pino"));
var baseError_1 = require("./error/baseError");
var server_1 = require("./server");
var url = process.env.URL;
var logger = (0, pino_1.default)();
var PORT = process.env.PORT || 3000;
mongoose_1.default.connect(url).then(function (data) {
    logger.info({ success: 'connected to database' });
});
server_1.app.use(baseError_1.logError);
server_1.app.use(baseError_1.returnError);
process.on('unhandledRejection', function (err) {
    throw err;
});
process.on('uncaughtException', function (err) {
    (0, baseError_1.logError)(err);
    if (!(0, baseError_1.isOperationalError)(err)) {
        process.exit(1);
    }
});
server_1.app.listen(PORT, function () { return logger.info({ connected: 'we connected to server' }); });
//# sourceMappingURL=app.js.map
