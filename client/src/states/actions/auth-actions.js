import * as api from "../../api/index.js";


const register = (formData) => async (dispatch) => {
    try {
        
        const {data} = await api.register(formData) 

        console.log(formData, data)

        dispatch({type:"AUTH", data: data})

   

    } catch (error) {
        console.log(error)
    }
}

const login = (formData) => async (dispatch) => {
    try {
        const {data} = await api.login(formData) 

        dispatch({type:"AUTH", data: data})

    } catch (error) {
        console.log(error)
    }
}



export {register, login}