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
const Cloudflare_1 = __importDefault(require("./Cloudflare"));
const fs_1 = __importDefault(require("fs"));
require("dotenv").config();
(() => __awaiter(void 0, void 0, void 0, function* () {
    const CN = new Cloudflare_1.default(process.env.CLOUDFLARE_ACCOUNT_ID, process.env.CLOUDFLARE_EMAIL, process.env.CLOUDFLARE_KEY, () => __awaiter(void 0, void 0, void 0, function* () {
    }));
    const readData = fs_1.default.readFileSync("./data.txt", "utf8");
    const split_list = readData.split("\n");
    split_list.forEach((val) => __awaiter(void 0, void 0, void 0, function* () {
        const t_split = val.split("\t");
        const domain = t_split[0].trim();
        const ip = t_split[1].trim();
        console.log({ domain });
        const create_zone = yield CN.createZone(domain);
        // console.log(create_zone)
        if (create_zone.success) {
            const { name_servers, id: zone_id } = create_zone.result;
            console.log({ name_servers });
            const dns_records = yield CN.getDnsRecordsList(zone_id);
            if (dns_records.success) {
                const dns_records_list = dns_records.result;
                dns_records_list.forEach((record) => __awaiter(void 0, void 0, void 0, function* () {
                    const record_id = record.id;
                    yield CN.delDnsRecord(zone_id, record_id);
                }));
            }
            yield CN.createDnsRecords(zone_id, "@", ip);
            yield CN.createDnsRecords(zone_id, "www", ip);
            yield CN.createDnsRecords(zone_id, "admin", ip);
            yield CN.setAlwaysUseHTTPS(zone_id);
            yield CN.setSSL_TLS(zone_id);
            // console.log(create_zone)
        }
        else if (create_zone.success === false) {
            const { errors } = create_zone;
            errors.forEach((val) => {
                console.log(val.message);
            });
        }
    }));
}))();
