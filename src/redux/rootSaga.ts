import {all} from 'redux-saga/effects';
import {
  watchCreateTodoRequests,
  watchDeleteTodoRequests,
  watchUpdateTodoRequests,
  watchClearCompletedRequests,
} from './sagas/todo-saga';




export default function* rootSaga() {
  yield all([
    watchCreateTodoRequests(),
    watchUpdateTodoRequests(),
    watchDeleteTodoRequests(),
    watchClearCompletedRequests()
  ]);
}
