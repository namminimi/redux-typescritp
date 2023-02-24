import { getUserProfile, GithubProfile } from "../api/github";
import {AxiosError} from 'axios'
import { Dispatch } from "redux";
import { ActionType, createAsyncAction, createReducer, deprecated } from "typesafe-actions";
const {createStandardAction} = deprecated 

//1.액션타입 - 서버로 데이터 요청, 데이터 전송 성공, 데이터 전송에러
const GET_USER_PROFILE = 'github/GET_USER_PROFILE' ;
const GET_USER_PROFILE_SUCCESS = 'github/GET_USER_PROFILE_SUCCESS' ;
const GET_USER_PROFILE_ERROR = 'github/GET_USER_PROFILE_ERROR' ;
//2. 액션 생성 함수 createStandardAction(액션타입)<payload타입>()
export const getUserAsync = createAsyncAction(
    GET_USER_PROFILE, GET_USER_PROFILE_SUCCESS, GET_USER_PROFILE_ERROR
)<undefined, GithubProfile, AxiosError>()

type GithubAction = ActionType<typeof getUserAsync>
//export const getUserProfilere = () => createStandardAction(GET_USER_PROFILE)()
//export const getUserProfilereSuccess = (data: GithubProfile) => createStandardAction(GET_USER_PROFILE_SUCCESS)<GithubProfile>()  
//data타입은 api만들어논 githubprofile
//export const getUserProfilereError = (error: AxiosError) => createStandardAction(GET_USER_PROFILE_ERROR)<AxiosError>()
//3. 액션타입, 상태타입, 초기상태
/* type GithubAction = ReturnType<typeof getUserProfilere>
| ReturnType<typeof getUserProfilereSuccess>
| ReturnType<typeof getUserProfilereError> */


//const actions = {getUserProfilere, getUserProfilereSuccess, getUserProfilereError}

//상태타입
export type GithubState = {
    userProfile: {
        loading: boolean;
        error: null | Error;
        data: null | GithubProfile;
    }
}
//초기상태
const initialState: GithubState = {
    userProfile: {
        loading: false,
        data: null,
        error: null
    }
}
//thunk함수 
export const getUserProfileThunk = (username:string):any => async (dispatch: Dispatch) => {
    dispatch({type: GET_USER_PROFILE})
    try{
        const userProfile = await getUserProfile(username)
        dispatch({type: GET_USER_PROFILE_SUCCESS, payload: userProfile})
    }
    catch(e){
        dispatch({type: GET_USER_PROFILE_ERROR, payload: e})
    }
} 

//4. 리듀서 생성 - state타입, action타입 지정해줘야함
//createReducer<상태타입, 액션타입>(초기상태값, {
//[액션타입]: state => 새로운상태
//})
const github = createReducer<GithubState, GithubAction>(initialState,{
    [GET_USER_PROFILE]: state =>({userProfile:
    {
        loading: true, data: null, error:null
    }
}),
    [GET_USER_PROFILE_SUCCESS]: (state, action) => ({ userProfile:
    {loading:false, data: action.payload, error: null}
}),
    [GET_USER_PROFILE_ERROR]: (state, action) => ({ userProfile:
    {loading:false, data: null , error: action.payload}
})
    
})

export default github;