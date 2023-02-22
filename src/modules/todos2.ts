//액션 생성, 액션 생성함수, 리듀서
import { ActionType, createReducer, deprecated  } from "typesafe-actions";
const {createStandardAction, createAction} = deprecated;

//1.액션타입
const ADD_TODO = "todos/ADD_TODO" 
const REMOVE_TODO = "todos/REMOVE_TODO" 
const TOGGLE_TODO = "todos/TOGGLE_TODO" 


//t새로운 항목 추가할때 사용할 id값
let nextId = 1;


//2.액션 생성 함수
export const addTodo = createAction(ADD_TODO, action => (text:string)=>
    action({
        id: nextId++,
        text: text
    })
)
export const toggleTodo = createStandardAction(TOGGLE_TODO)<number>();
export const removeTodo = createStandardAction(REMOVE_TODO)<number>();

const actions = {addTodo, toggleTodo, removeTodo}
type TodoAction = ActionType<typeof actions>



//상태에서 사용할 할일 항목의 타입정의
export type Todo ={
    id: number;
    text: string;
    isDone: boolean;
}

//상태에 대한 타입
export type TodoState = Todo[]

// 초기상태 선언
const initialState: TodoState = [];

//3. 리듀서 함수 - state타입 action타입지정
const todos = createReducer<TodoState, TodoAction>(initialState, {
    [ADD_TODO]: (state, action) =>
    [...state, {...action.payload, isDone:false}],
    [TOGGLE_TODO]: (state, {payload: id}) => state.map(todo=>todo.id === id ? 
        {...todo, isDone: !todo.isDone}: todo),
    [REMOVE_TODO]: (state, {payload: id}) => state.filter(todo=> todo.id !== id)     
})
export default todos;