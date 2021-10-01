import axios from 'axios';

//movie/now_playing&language=pt-BR&page=1

export const key = '460c92e61f580f4be7875c0fb969b3af';
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
})

export default api