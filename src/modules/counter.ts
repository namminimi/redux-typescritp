//액션타입, 액션생성함수, 리듀서
//1. 액션타입
//action.type 이 string으로 추론되지 않고 'counter/INCREASE' 와 같이
//실제 문자열을 추론되도록 as const 붙임
const INCREASE = "counter/INCREASE" as const;
const DECREASE = "counter/DECREASE" as const;


//2. 액션 생성 함수 // 말그대로 액션생성함수를 리턴해줌 return {type: INCREASE, payload: diff}  //액션객체 반환
/* const increase = () => {
    return {type: INCREASE}
} */ //생략해서 밑에꺼
export const increase = () => ({type: INCREASE})


/* const decrease = () => {
    return {type: DECREASE}
} */ //리턴해주는 얘가 객체일때 소괄호 작성

export const decrease = () => ({type: DECREASE})


//액션객체에 대한 타입 (ReturnType<typeof 메모장 확인)
type CounterAction = ReturnType<typeof increase> | ReturnType<typeof decrease>

//상태에 대한 타입 설정하고 초기상태 설정
type CounterState = {count: number}

//초기상태
const initialState: CounterState = {count: 0}

//3.리듀서 (state,action 타입 지정 해줘야함)
function counter(state:CounterState = initialState, action:CounterAction){
    switch(action.type){
        case INCREASE:
            return {count: state.count + 1};
        case DECREASE:
            return {count: state.count - 1};    
        default:
            return state;    
    }
}

export default counter
