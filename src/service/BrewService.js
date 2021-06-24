import axios from 'axios';

class BrewService {
  
  constructor() {
    let service = axios.create({});
    if (null != localStorage.getItem('user-token')) {
        service.interceptors.request.use((config) => {
            config.headers.common['Authorization'] = localStorage.getItem('user-token')
            return config
          })
    }
    this.service = service;
  }

  login(username, password) {
    this.service
    .post(process.env.VUE_APP_API_BREW + '/login', {username: username, password: password})
    .then((response) => {
      if (response.status === 200) {
        
        localStorage.setItem('user-token', response.headers.token);
        
        // update token?
        this.service.interceptors.request.use((config) => {
            config.headers.common['Authorization'] = localStorage.getItem('user-token')
            return config
          })

        console.log("set token")
        window.location.href = '/home'; 

      } else {
        alert(response)
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }
  
  get(path) {
    return this.service.get(path)
  }

  post(path, payload) {
    return this.service.request({
      method: 'POST',
      url: path,
      responseType: 'json',
      data: payload
    })
  }

  delete(path) {
      return this.service.delete(path)
  }
}

export default new BrewService;