import axios from 'axios';
import CloudFlare from './Cloudflare';

require("dotenv").config();



(async () => {
    const CN = new CloudFlare("81d917f3ed537338a2ef9e1622e40c25", process.env.CLOUDFLARE_TOKEN,async ()=>{
        const create_zone = await CN.createZone("test.com")
        if(create_zone.success){
            const domain = create_zone.result.name;
            const name_servers = create_zone.result.name_servers;

            console.log({domain})
            console.log({name_servers})
            // console.log(create_zone)
            
        }
        // console.log(await CN.getAccounts())
    })
})()



