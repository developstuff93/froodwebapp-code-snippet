const getActions = [];
const postActions = [];
const putActions = [];
const deleteActions = [];
const autocompleteActions = [];
const parallelActions = [];

export default (actions) => {
  actions.forEach((action) => {
    switch (true) {
      case action.REQUEST.includes('GET_PARALLEL'):
        parallelActions.push(action.REQUEST);
        break;
      case action.REQUEST.includes('GET_WITH_FILTER'):
        postActions.push(action.REQUEST);
        break;
      case action.REQUEST.includes('GET'):
        getActions.push(action.REQUEST);
        break;
      case action.REQUEST.includes('SAVE'):
        postActions.push(action.REQUEST);
        break;
      case action.REQUEST.includes('UPDATE'):
        putActions.push(action.REQUEST);
        break;
      case action.REQUEST.includes('DELETE'):
        deleteActions.push(action.REQUEST);
        break;
      case action.REQUEST.includes('SEARCH'):
        autocompleteActions.push(action.REQUEST);
        break;
      default:
        break;
    }
  });
};

export const loadGetActions = () => getActions;
export const loadPostActions = () => postActions;
export const loadPutActions = () => putActions;
export const loadDeleteActions = () => deleteActions;
export const loadAutocompleteActions = () => autocompleteActions;
export const loadParallelActions = () => parallelActions;
