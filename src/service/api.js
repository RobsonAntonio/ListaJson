import axios from "axios";

const api = axios.create({
    baseURL: 'https://gorest.co.in/',
    headers: {
    
      'Authorization': 'Bearer 5891c36c58be58568cfedb1fa5580cb3f74e3b112d9999c79aaa1fc93987419c'        
    }

});

export default api;