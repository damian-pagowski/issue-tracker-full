import { addIssue, receiveIssues } from './issues'
import { update } from './users'
import api from '../helper/IssuesAPI'

export function handleAddIssue (issue) {
  return (dispatch, getState) => {
    api
      .createIssue(issue, getState().user.accessToken)
      .then(data => dispatch(addIssue(data)))
      .catch(error => console.log(JSON.stringify(error)))
  }
}

export function handleRetrieveAvailableProjects () {
  return (dispatch, getState) => {
    const user = getState().user;
    api
      .getProjects(user.accessToken)
      .then(projects => {
        user.availableProjects = projects
        dispatch(update(user))
      })
      .catch(error => console.log(error))
  }
}

export function handleReceiveIssues () {
  return (dispatch, getState) => {
    const user = getState().user;
    api
      .getIssues(user.defaultProject || 'test', user.accessToken)
      .then(data => dispatch(receiveIssues(data)))
      .catch(error => console.log(JSON.stringify(error)))
  }
}
