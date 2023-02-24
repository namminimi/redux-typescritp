import { getUserProfile, GithubProfile } from "../api/github";
import {AxiosError} from 'axios'
import { Dispatch } from "redux";

//1.액션타입 - 서버로 데이터 요청, 데이터 전송 성공, 데이터 전송에러
const GET_USER_PROFILE = 'github/GET_USER_PROFILE' as const;
const GET_USER_PROFILE_SUCCESS = 'github/GET_USER_PROFILE_SUCCESS' as const;
const GET_USER_PROFILE_ERROR = 'github/GET_USER_PROFILE_ERROR' as const;
//2. 액션 생성 함수
export const getUserProfilere = () => ({type:GET_USER_PROFILE})
export const getUserProfilereSuccess = (data: GithubProfile) => ({type:GET_USER_PROFILE_SUCCESS, payload: data})  //data타입은 api만들어논 githubprofile
export const getUserProfilereError = (error: AxiosError) => ({type: GET_USER_PROFILE_ERROR, payload: error})
//3. 액션타입, 상태타입, 초기상태
type GithubAction = ReturnType<typeof getUserProfilere>
| ReturnType<typeof getUserProfilereSuccess>
| ReturnType<typeof getUserProfilereError>
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
function github2(state:GithubState=initialState, action: GithubAction){
    switch(action.type){
        case GET_USER_PROFILE:
            return {
                userProfile : {
                    loading: true,
                    data: null,
                    error: null
                }
            }
        case GET_USER_PROFILE_SUCCESS:
        return {
            userProfile : {
                loading: false,
                data: action.payload,
                error: null
            }
        }
        case GET_USER_PROFILE_ERROR:
        return {
            userProfile : {
                loading: false,
                data: null,
                error: action.payload
            }
        }
        default:
            return state;
    }
}

export default github2;