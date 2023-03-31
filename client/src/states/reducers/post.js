export default (state = {posts:[]}, action) => {
    switch (action.type) {
      // case 'FETCH':
      //   return action.payload
      case 'CREATE':
        return {...state,posts:[action.payload,...state.posts]}
      case 'UPDATE':
        return (
          {...state, posts: state.posts.map((element)=>{
            return element._id === action.payload._id ? action.payload : element
          })
        }
        )
      case 'DELETE':
        return (
          {...state,posts:state.posts.filter((element)=>{
          return element._id !== action.payload._id
      })}
      )
      case "GET_PPP":
        console.log(action.payload)
        return action.payload

      case "SEARCHED_POSTS":
        return {...state,posts:action.payload}
      default:
        return state
    }
  }

