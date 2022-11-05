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
require("dotenv").config();
(() => __awaiter(void 0, void 0, void 0, function* () {
    const CN = new Cloudflare_1.default("81d917f3ed537338a2ef9e1622e40c25", process.env.CLOUDFLARE_TOKEN, () => __awaiter(void 0, void 0, void 0, function* () {
        console.log(yield CN.createZone("test.com"));
        // console.log(await CN.getAccounts())
    }));
}))();
