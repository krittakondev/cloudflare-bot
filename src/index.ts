import axios from 'axios';
import CloudFlare from './Cloudflare';
import fs from "fs";

require("dotenv").config();



(async () => {
    const CN = new CloudFlare(process.env.CLOUDFLARE_ACCOUNT_ID || "", process.env.CLOUDFLARE_EMAIL || "", process.env.CLOUDFLARE_KEY || "",async ()=>{
    })
    const readData:string = fs.readFileSync("./data.txt", "utf8")
    const split_list: string[] = readData.split("\n")
    split_list.forEach(async (val: string)=>{
        const t_split = val.split("\t")
        const domain: string = t_split[0].trim()
        const ip: string = t_split[1].trim()

        const create_zone = await CN.createZone(domain)
        // console.log(create_zone)
        if(create_zone.success){
            const { name_servers, id: zone_id } = create_zone.result;
            console.log({domain})
            console.log({name_servers})
            const dns_records = await CN.getDnsRecordsList(zone_id)
            if(dns_records.success){
                const dns_records_list: any[] = dns_records.result
                dns_records_list.forEach(async (record: any)=>{
                    const record_id = record.id
                    await CN.delDnsRecord(zone_id, record_id)
                })
            }
            await CN.createDnsRecords(zone_id, "@", ip)
            await CN.createDnsRecords(zone_id, "www", ip)
            await CN.createDnsRecords(zone_id, "admin", ip)
            await CN.setAlwaysUseHTTPS(zone_id)
            await CN.setSSL_TLS(zone_id)
           
            // console.log(create_zone)
            
        }else if(create_zone.success === false){
            const { errors } = create_zone
            errors.forEach((val: any)=>{
                console.log({domain})
                console.log(val.message)
            })

        }
        

    })
})()



