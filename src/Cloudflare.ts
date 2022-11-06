import axios, {AxiosHeaders, AxiosRequestHeaders, AxiosError} from 'axios'


interface iHeaders {
    'Authorization'?: string,
    'X-Auth-Email'?: string,
    'X-Auth-Key'?: string,
    'Content-Type'?: string
}


class CloudFlare {

    token: string;
    endpoint: string = "https://api.cloudflare.com/client";
    id: string = "";



    constructor(account_id: string, token: string = "", callback=()=>{}){

        this.id = account_id
        this.token = token
        this.checkToken().then((result)=>{
            if(!result){
                throw "token ผิดพลาด";
            }
            callback()
        })
    }

    
    
    async checkToken(): Promise<boolean>{
        if(!this.token){
            return false;
        }
        try{
            const resp = await axios.get(this.endpoint+"/v4/user/tokens/verify", {
                headers: {
                    "Authorization": "Bearer "+this.token
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
                    id: this.id
                    // id: "81d917f3ed537338a2ef9e1622e40c25"

                },
            },{
                headers: {
                    // 'X-Auth-Email': 'Spprtpdev@gmail.com',
                    "Authorization": "Bearer "+this.token,
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
                    "Authorization": "Bearer "+this.token,
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
                    "Authorization": "Bearer "+this.token,
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
                    "Authorization": "Bearer "+this.token,
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