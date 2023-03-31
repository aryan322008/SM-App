export default (details = { title: null }, action) => {
  switch (action.type) {
    case 'GET':
      return action.payload
    case 'ADD_COMMENT':
      return action.payload
    default:
      return details
  }
}
