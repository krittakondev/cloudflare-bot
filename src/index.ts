import axios from 'axios';
import CloudFlare from './Cloudflare';

require("dotenv").config();



(async () => {
    const CN = new CloudFlare("81d917f3ed537338a2ef9e1622e40c25", process.env.CLOUDFLARE_TOKEN,async ()=>{
        console.log(await CN.createZone("test.com"))
        // console.log(await CN.getAccounts())
    })
})()



