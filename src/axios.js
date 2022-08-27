import axios from "axios";
const instance=axios.create({
    baseURL:"https://bsbhuvicred.herokuapp.com/"
})
export default instance