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
    constructor(account_id, email = "", auth_key, callback = () => { }) {
        this.endpoint = "https://api.cloudflare.com/client";
        this.account_id = account_id;
        this.email = email;
        this.auth_key = auth_key;
        callback();
    }
    checkToken() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.auth_key || !this.email) {
                return false;
            }
            try {
                const resp = yield axios_1.default.get(this.endpoint + "/v4/user/tokens/verify", {
                    headers: {
                        // "Authorization": "Bearer "+this.token
                        "X-Auth-Email": this.email,
                        "X-Auth-Key": this.auth_key
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
                        id: this.account_id
                        // id: "81d917f3ed537338a2ef9e1622e40c25"
                    },
                }, {
                    headers: {
                        // "Authorization": "Bearer "+this.token,
                        "X-Auth-Email": this.email,
                        "X-Auth-Key": this.auth_key,
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
                        "X-Auth-Email": this.email,
                        "X-Auth-Key": this.auth_key,
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
                        "X-Auth-Email": this.email,
                        "X-Auth-Key": this.auth_key,
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
                        "X-Auth-Email": this.email,
                        "X-Auth-Key": this.auth_key,
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
    updateDnsRecords(zone_id, record_id, name = "@", ip) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield axios_1.default.put(this.endpoint + `/v4/zones/${zone_id}/dns_records/${record_id}`, {
                    "type": "A",
                    "name": name,
                    "content": ip,
                    "ttl": 3600,
                    "proxied": true
                }, {
                    headers: {
                        "X-Auth-Email": this.email,
                        "X-Auth-Key": this.auth_key,
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
    getDnsRecordsList(zone_id) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield axios_1.default.get(this.endpoint + `/v4/zones/${zone_id}/dns_records`, {
                    headers: {
                        "X-Auth-Email": this.email,
                        "X-Auth-Key": this.auth_key,
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
    delDnsRecord(zone_id, id_record) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield axios_1.default.delete(this.endpoint + `/v4/zones/${zone_id}/dns_records/${id_record}`, {
                    headers: {
                        "X-Auth-Email": this.email,
                        "X-Auth-Key": this.auth_key,
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
    createDnsRecords(zone_id, name = "@", ip) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield axios_1.default.post(this.endpoint + `/v4/zones/${zone_id}/dns_records`, {
                    "type": "A",
                    "name": name,
                    "content": ip,
                    // "ttl":3600,
                    // "priority":10,
                    "proxied": true
                }, {
                    headers: {
                        "X-Auth-Email": this.email,
                        "X-Auth-Key": this.auth_key,
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
    setSSL_TLS(zone_id, value = "flexible") {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield axios_1.default.patch(this.endpoint + `/v4/zones/${zone_id}/settings/ssl`, {
                    value
                }, {
                    headers: {
                        "X-Auth-Email": this.email,
                        "X-Auth-Key": this.auth_key,
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
    setAlwaysUseHTTPS(zone_id, value = "on") {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield axios_1.default.patch(this.endpoint + `/v4/zones/${zone_id}/settings/always_use_https`, {
                    value
                }, {
                    headers: {
                        "X-Auth-Email": this.email,
                        "X-Auth-Key": this.auth_key,
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
