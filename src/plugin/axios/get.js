import axios from 'axios'
import serverConfig from "@/plugin/axios/serverConfig";
export function get(url, params={}) {
    return  axios.post(serverConfig.BASE_API + url, params)
      .then((res)=>{
        console.log(res)
        return res.data
      }).catch(e=>{
        console.log(e);
      })
}
