import { createReducer } from "typesafe-actions"
import { GithubState } from "../github-typesafe"
import { GET_USER_PROFILE, GET_USER_PROFILE_SUCCESS, GET_USER_PROFILE_ERROR } from "./actions"
import { GithubAction } from "./types"

//초기상태
const initialState: GithubState = {
    userProfile: {
        loading: false,
        data: null,
        error: null
    }
}

//4. 리듀서 생성 - state타입, action타입 지정해줘야함
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