import axios from 'axios';

export const fetchCounter = () => axios.get('http://www.json-generator.com/api/json/get/cevPJOgFyW?indent=2')
  .then((response) => response.data);
