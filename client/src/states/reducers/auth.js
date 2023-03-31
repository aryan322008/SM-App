export default (auth = {data:null}, action) => {
    switch (action.type) {
      case 'AUTH':
        action.data && localStorage.setItem("user",JSON.stringify(action.data))
         return action.data 
         case 'LOGOUT':
          localStorage.clear()
        return auth
      default:
        return auth
    }
  }
