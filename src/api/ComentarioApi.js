import Axios from "axios";

class ComentarioApi {
    static baseUrl = "http://localhost:8888";


    static getAll(codigo) {
        return Axios.get(`${this.baseUrl}/commentspost/${codigo}`);
    }

    static add(comment) {
        return Axios.post(`${this.baseUrl}/addcomment`, comment);
    }
}

export default ComentarioApi;
