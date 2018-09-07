import { endpoint } from '../config.json';

export default path => (
    fetch(endpoint + path)
    .then(response => {
      if(!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
)