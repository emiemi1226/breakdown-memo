// redux.js
import {  
  combineReducers,
  createStore,
} from 'redux';
import * as preference from './realm';
const UP_COUNT = "UP_COUNT";
const DOWN_COUNT = "DOWN_COUNT";
const ADD_CARD =  "ADD_CARD";
const DEL_TIMER = "DEL_TIMER";
const DEL_TIMER_ALL = "DEL_TIMER_ALL";
const CHANGE_TITLE = "CHANGE_TITLE";
const TOGGLE_CONFIRM = "TOGGLE_CONFIRM";
const TOGGLE_DEL_ALL_CONFIRM = "TOGGLE_DEL_ALL_CONFIRM";

// カードの合計を増やす
export const upCount = id => ({
  type: UP_COUNT,
  id,
});

// カードの合計を減らす
export const downCount = id => ({
  type: DOWN_COUNT,
  id,
});

// カード自体を増やす
export const addCard = () => ({
  type: ADD_CARD,
});

// 特定のタイマーを削除する
export const delTimer = (id) => ({
  type: DEL_TIMER,
  id,
});

// カードを全消しする
export const delTimerAll = () => ({
  type: DEL_TIMER_ALL,
});

// カードタイトルを変更する(未実装)
export const changeTitle = (id,title) => ({
  type: CHANGE_TITLE,
  id,
  title,
});

// 確認メッセージの表示
export const toggleConfrim = (bool) => ({
  type: TOGGLE_CONFIRM,
  bool
});

export const toggleDelAllConfrim = (bool) => ({
  type: TOGGLE_DEL_ALL_CONFIRM,
  bool
});

INITIAL_STATE = {
  sum: 10,
  cards: preference.getTimers(),//モデルを作成して配列として扱う
  dialogVisible: false,
  dialogVisibleDelAll: false,
}

const reducer = (state = INITIAL_STATE, action) => {  
  switch (action.type) {
    case UP_COUNT:
      preference.countUp(action.id);
      return {...state, cards: preference.getTimers()}
    case DOWN_COUNT:
      preference.countDown(action.id);
      return {...state, cards: preference.getTimers()}
    case ADD_CARD:
      preference.addTimer();
      return {...state, cards: preference.getTimers()}
    case DEL_TIMER:
      preference.delTimer(action.id);
      return {...state, cards: preference.getTimers(), dialogVisible: false}
    case DEL_TIMER_ALL:
      preference.delTimerAll();
      return {...state, cards: preference.getTimers(), dialogVisibleDelAll: false}
    case TOGGLE_CONFIRM:
      return {...state, dialogVisible: action.bool}
    case TOGGLE_DEL_ALL_CONFIRM:
      return {...state, dialogVisibleDelAll: action.bool}
    default:
      return state;
  }
}

export const reducers = combineReducers({  
  list: reducer
})

// store.js
export const store = createStore(reducers)