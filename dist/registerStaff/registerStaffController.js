"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterStaffController = void 0;
var joi_1 = __importDefault(require("joi"));
var errors_1 = require("../error/errors");
var model_1 = __importDefault(require("./model"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
var RegisterStaffController = /** @class */ (function () {
    function RegisterStaffController() {
        this.secret = process.env.SECRET;
        this.registerStaff = this.registerStaff.bind(this);
        this.createUser = this.createUser.bind(this);
    }
    RegisterStaffController.prototype.registerStaff = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var data, validData, token, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        data = __assign({}, req.body);
                        validData = this.validate(data);
                        if (validData.error) {
                            throw new errors_1.ApiBadRequest((_a = validData.error) === null || _a === void 0 ? void 0 : _a.details[0].message);
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.createUser(data)];
                    case 2:
                        token = _b.sent();
                        if (token)
                            return [2 /*return*/, res
                                    .status(200)
                                    .json({ message: "registered successfully", token: token })];
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        next(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    RegisterStaffController.prototype.createUser = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var formatedData, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.validate(data);
                        formatedData = this.formatData(data);
                        return [4 /*yield*/, this.addToDb(formatedData)];
                    case 1:
                        token = _a.sent();
                        return [2 /*return*/, token];
                }
            });
        });
    };
    RegisterStaffController.prototype.addToDb = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var user, User, token, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        user = new model_1.default(data);
                        return [4 /*yield*/, user.save()];
                    case 1:
                        User = _a.sent();
                        token = jsonwebtoken_1.default.sign({ id: User._id }, this.secret);
                        return [2 /*return*/, token];
                    case 2:
                        error_2 = _a.sent();
                        throw error_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RegisterStaffController.prototype.validate = function (data) {
        var schema = joi_1.default.object({
            fullname: joi_1.default.string().required(),
            email: joi_1.default.string().required().email(),
            password: joi_1.default.string().min(6).required(),
        });
        var validData = schema.validate(data);
        return validData;
    };
    RegisterStaffController.prototype.formatData = function (data) {
        return {
            fullname: data.fullname,
            email: data.email,
            password: bcryptjs_1.default.hashSync(data.password, 8),
        };
    };
    RegisterStaffController.prototype.update = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, data, filter, updated, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.query.id;
                        data = req.body;
                        if (data.password) {
                            data.password = bcryptjs_1.default.hashSync(data.password, 8);
                        }
                        filter = { _id: id };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, model_1.default.findOneAndUpdate(filter, data, {
                                new: true
                            })];
                    case 2:
                        updated = _a.sent();
                        return [2 /*return*/, res.status(200).send({ message: 'updated successfully' })];
                    case 3:
                        error_3 = _a.sent();
                        throw (error_3);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    RegisterStaffController.prototype.getUser = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, org, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.query.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, model_1.default.findOne({ _id: id })];
                    case 2:
                        org = _a.sent();
                        return [2 /*return*/, res.status(200).send(org)];
                    case 3:
                        error_4 = _a.sent();
                        next(error_4);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return RegisterStaffController;
}());
exports.RegisterStaffController = RegisterStaffController;
//# sourceMappingURL=registerStaffController.js.map