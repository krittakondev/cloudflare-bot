import axios, {AxiosHeaders, AxiosRequestHeaders, AxiosError} from 'axios'


interface iHeaders {
    'Authorization'?: string,
    'X-Auth-Email'?: string,
    'X-Auth-Key'?: string,
    'Content-Type'?: string
}


class CloudFlare {

    endpoint: string = "https://api.cloudflare.com/client";
    email: string;
    auth_key: string;
    account_id: string;
    



    constructor(account_id: string, email: string = "", auth_key: string, callback=()=>{}){
        this.account_id = account_id
        this.email = email
        this.auth_key = auth_key
        callback()
    }

    
    
    async checkToken(): Promise<boolean>{
        if(!this.auth_key || !this.email){
            return false;
        }
        try{
            const resp = await axios.get(this.endpoint+"/v4/user/tokens/verify", {
                headers: {
                    // "Authorization": "Bearer "+this.token
                    "X-Auth-Email": this.email,
                    "X-Auth-Key": this.auth_key
                }
            })
        
            if(resp.data.success){
                // this.id = resp.data.result.id
                console.log(resp.data)
                return true
            }
        
            return false;

        }catch(err){
            
            return false;
        }
    }


    async createZone(domain: string){

        try{
            const resp = await axios.post(this.endpoint+"/v4/zones", {
                name: domain,
                account:{
                    id: this.account_id
                    // id: "81d917f3ed537338a2ef9e1622e40c25"

                },
            },{
                headers: {
                    // "Authorization": "Bearer "+this.token,
                    "X-Auth-Email": this.email,
                    "X-Auth-Key": this.auth_key,
                    'Content-Type': "application/json"
                }
            })
            return resp.data
        }catch(err: any){
            if(!err?.response?.data){
                throw err
            }
            return err.response.data
        }
        
        

    }
    
    async getZones(){

        try{
            const resp = await axios.get(this.endpoint+"/v4/zones",{
                headers: {
                    "X-Auth-Email": this.email,
                    "X-Auth-Key": this.auth_key,
                    'Content-Type': "application/json"
                }
            })
            return resp.data
        }catch(err: any){
            if(!err?.response?.data){
                throw err
            }
            return err.response.data
        }
        
    }
    async getPermissions(){

        try{
            const resp = await axios.get(this.endpoint+"/v4/user/tokens/permission_groups",{
                headers: {
                    "X-Auth-Email": this.email,
                    "X-Auth-Key": this.auth_key,
                    'Content-Type': "application/json"
                }
            })
            return resp.data
        }catch(err: any){
            if(!err?.response?.data){
                throw err
            }
            return err.response.data
        }
        
    }
    async getAccounts(){

        try{
            const resp = await axios.get(this.endpoint+"/v4/accounts",{
                headers: {
                    "X-Auth-Email": this.email,
                    "X-Auth-Key": this.auth_key,
                    'Content-Type': "application/json"
                }
            })
            return resp.data
        }catch(err: any){
            if(!err?.response?.data){
                throw err
            }
            return err.response.data
        }
        
    }
    async updateDnsRecords(zone_id: string, record_id: string, name:string = "@", ip: string){

        try{
            const resp = await axios.put(this.endpoint+`/v4/zones/${zone_id}/dns_records/${record_id}`, {
                "type":"A",
                "name": name,
                "content": ip,
                "ttl":3600,
                "proxied": true
            },{
                headers: {
                    "X-Auth-Email": this.email,
                    "X-Auth-Key": this.auth_key,
                    'Content-Type': "application/json"
                }
            })
            return resp.data
        }catch(err: any){
            if(!err?.response?.data){
                throw err
            }
            return err.response.data
        }
        
    }
    async getDnsRecordsList(zone_id: string){

        try{
            const resp = await axios.get(this.endpoint+`/v4/zones/${zone_id}/dns_records`,{
                headers: {
                    "X-Auth-Email": this.email,
                    "X-Auth-Key": this.auth_key,
                    'Content-Type': "application/json"
                }
            })
            return resp.data
        }catch(err: any){
            if(!err?.response?.data){
                throw err
            }
            return err.response.data
        }
        
    }
    async delDnsRecord(zone_id: string, id_record: string){

        try{
            const resp = await axios.delete(this.endpoint+`/v4/zones/${zone_id}/dns_records/${id_record}`,{
                headers: {
                    "X-Auth-Email": this.email,
                    "X-Auth-Key": this.auth_key,
                    'Content-Type': "application/json"
                }
            })
            return resp.data
        }catch(err: any){
            if(!err?.response?.data){
                throw err
            }
            return err.response.data
        }
        
    }
    async createDnsRecords(zone_id: string, name: string="@", ip: string){

        try{
            const resp = await axios.post(this.endpoint+`/v4/zones/${zone_id}/dns_records`,{
                "type":"A",
                "name": name,
                "content": ip,
                // "ttl":3600,
                // "priority":10,
                "proxied": true
            },{
                headers: {
                    "X-Auth-Email": this.email,
                    "X-Auth-Key": this.auth_key,
                    'Content-Type': "application/json"
                }
            })
            return resp.data
        }catch(err: any){
            if(!err?.response?.data){
                throw err
            }
            return err.response.data
        }
        
    }
    async setSSL_TLS(zone_id: string, value:string="flexible"){

        try{
            const resp = await axios.patch(this.endpoint+`/v4/zones/${zone_id}/settings/ssl`,{
                value
            },{
                headers: {
                    "X-Auth-Email": this.email,
                    "X-Auth-Key": this.auth_key,
                    'Content-Type': "application/json"
                }
            })
            return resp.data
        }catch(err: any){
            if(!err?.response?.data){
                throw err
            }
            return err.response.data
        }
        
    }
    async setAlwaysUseHTTPS(zone_id: string, value:string="on"){

        try{
            const resp = await axios.patch(this.endpoint+`/v4/zones/${zone_id}/settings/always_use_https`,{
                value
            },{
                headers: {
                    "X-Auth-Email": this.email,
                    "X-Auth-Key": this.auth_key,
                    'Content-Type': "application/json"
                }
            })
            return resp.data
        }catch(err: any){
            if(!err?.response?.data){
                throw err
            }
            return err.response.data
        }
        
    }
    


}

export default CloudFlare;