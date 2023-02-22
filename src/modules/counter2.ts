//액션타입, 액션생성함수, 리듀서
//1. 액션타입
import { ActionType, createReducer, deprecated  } from "typesafe-actions";
const {createStandardAction} = deprecated;


const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";

//2. 액션 생성 함수 // 말그대로 액션생성함수를 리턴해줌 return {type: INCREASE, payload: diff}  //액션객체 반환
//액션객체에 type속성만 있는 경우
export const increase = createStandardAction(INCREASE)();
export const decrease = createStandardAction(DECREASE)();


const actions = {increase, decrease};//액션생성함수
//ActionType을 사용하여 모든 액션 객체들의 타입을 지정
type CounterAction = ActionType<typeof actions>


//상태에 대한 타입 설정하고 초기상태 설정
type CounterState = {count: number}

//초기상태
const initialState: CounterState = {count: 0}

//리듀서1
const counter = createReducer<CounterState, CounterAction>(initialState, {
    [INCREASE] : state => ({count: state.count + 1}),
    [DECREASE] : state => ({count: state.count - 1})
})
//리듀서2
/* const counter = createReducer<CounterState, CounterAction>(initialState)
.handleAction(INCREASE, state => ({count: state.count + 1}))
.handleAction(DECREASE, state => ({count: state.count + 1})) */

export default counter