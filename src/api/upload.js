import axios from 'axios'

export function getUploadUrl() {
  return axios.get('http://192.168.1.136:8094/config',{
    headers:{
      "Content-type":"multipart/form-data",
      "token": localStorage.getItem('token')
    },
    withCredentials: false
  })
}
