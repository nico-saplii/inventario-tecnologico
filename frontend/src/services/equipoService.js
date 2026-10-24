import axios from 'axios';

const API_URL = 'http://localhost:3000/equipos';

export default {
  getAll() {
    return axios.get(API_URL);
  },
  getById(id) {
    return axios.get(`${API_URL}/${id}`);
  },
  create(equipo) {
    return axios.post(API_URL, equipo);
  },
  update(id, equipo) {
    return axios.patch(`${API_URL}/${id}`, equipo);
  },
  delete(id) {
    return axios.delete(`${API_URL}/${id}`);
  }
};