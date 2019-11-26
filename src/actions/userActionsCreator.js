import {signOut, logIn} from './users'
import auth from '../helper/AUTH'
import {handleReceiveIssues} from './issueActionsCreator'



export function handleLogout (user) {
  return dispatch => {
    auth.logout(user.email).then(user => dispatch(signOut(user))).catch(error => console.log(error))
  }
}

export function handleLogin (user) {
  return dispatch => {
    auth.login(user).then(data => {
      dispatch(logIn({...user, ...data}))
      dispatch(handleReceiveIssues( user)) 
    }
      )
  }
}
