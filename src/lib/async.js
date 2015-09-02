import Promise from 'bluebird';

const REQ_BEGIN = 'REQ_BEGIN';
const REQ_GOING = 'REQ_GOING';
const REQ_ERROR = 'REQ_ERROR';
const REQ_OK = 'REQ_OK';

const progressInterval = 500;
const startProgress = dispatch => setInterval(
  () => dispatch({ type: REQ_GOING }), progressInterval);
const clearProgressCreator = progressTimer =>
  () => progressTimer && clearInterval(progressTimer);
const errorHandlerCreator = dispatch =>
  e => dispatch({ type: REQ_ERROR, e });

/**
 * Async action with inner lifecycle actions
 * (REQ_BEGIN, REQ_GOING, REQ_ERROR, REQ_OK).
 * @param {function} doneActionCreator
 * @param {function} promiseCreator
 * @returns {function}
 */
export
function asyncActionCreator(doneActionCreator, promiseCreator) {
  return (dispatch, getState) => {
    dispatch({ type: REQ_BEGIN });
    const progressTimer = startProgress(dispatch);
    return promiseCreator(getState())
      .finally(clearProgressCreator(progressTimer))
      .error(errorHandlerCreator(dispatch))
      .then(result => {
        dispatch(doneActionCreator(result));
        dispatch({ type: REQ_OK });
      });
  };
}

export
function asyncStateReducer(state = { loading: 0 }, action) {
  switch (action.type) {
  case REQ_BEGIN:
    return { loading: 3 };
  case REQ_GOING:
    return { loading: 1 + state.loading % 3 };
  case REQ_ERROR:
    return { loading: 0, message: Object.toString(action.error) };
  case REQ_OK:
    return { loading: 0 };
  default:
    return state;
  }
}
