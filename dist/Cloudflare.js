"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class CloudFlare {
    constructor(account_id, token = "", callback = () => { }) {
        this.endpoint = "https://api.cloudflare.com/client";
        this.id = "";
        this.id = account_id;
        this.token = token;
        this.checkToken().then((result) => {
            if (!result) {
                throw "token ผิดพลาด";
            }
            callback();
        });
    }
    checkToken() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.token) {
                return false;
            }
            try {
                const resp = yield axios_1.default.get(this.endpoint + "/v4/user/tokens/verify", {
                    headers: {
                        "Authorization": "Bearer " + this.token
                    }
                });
                if (resp.data.success) {
                    // this.id = resp.data.result.id
                    console.log(resp.data);
                    return true;
                }
                return false;
            }
            catch (err) {
                return false;
            }
        });
    }
    createZone(domain) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield axios_1.default.post(this.endpoint + "/v4/zones", {
                    name: domain,
                    account: {
                        // id: this.id
                        id: "81d917f3ed537338a2ef9e1622e40c25"
                    }
                }, {
                    headers: {
                        // 'X-Auth-Email': 'Spprtpdev@gmail.com',
                        "Authorization": "Bearer " + this.token,
                        'Content-Type': "application/json"
                    }
                });
                return resp.data;
            }
            catch (err) {
                if (!((_a = err === null || err === void 0 ? void 0 : err.response) === null || _a === void 0 ? void 0 : _a.data)) {
                    throw err;
                }
                return err.response.data;
            }
        });
    }
    getZones() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield axios_1.default.get(this.endpoint + "/v4/zones", {
                    headers: {
                        "Authorization": "Bearer " + this.token,
                        'Content-Type': "application/json"
                    }
                });
                return resp.data;
            }
            catch (err) {
                if (!((_a = err === null || err === void 0 ? void 0 : err.response) === null || _a === void 0 ? void 0 : _a.data)) {
                    throw err;
                }
                return err.response.data;
            }
        });
    }
    getPermissions() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield axios_1.default.get(this.endpoint + "/v4/user/tokens/permission_groups", {
                    headers: {
                        "Authorization": "Bearer " + this.token,
                        'Content-Type': "application/json"
                    }
                });
                return resp.data;
            }
            catch (err) {
                if (!((_a = err === null || err === void 0 ? void 0 : err.response) === null || _a === void 0 ? void 0 : _a.data)) {
                    throw err;
                }
                return err.response.data;
            }
        });
    }
    getAccounts() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield axios_1.default.get(this.endpoint + "/v4/accounts", {
                    headers: {
                        "Authorization": "Bearer " + this.token,
                        'Content-Type': "application/json"
                    }
                });
                return resp.data;
            }
            catch (err) {
                if (!((_a = err === null || err === void 0 ? void 0 : err.response) === null || _a === void 0 ? void 0 : _a.data)) {
                    throw err;
                }
                return err.response.data;
            }
        });
    }
}
exports.default = CloudFlare;
