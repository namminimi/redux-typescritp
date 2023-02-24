import { ActionType } from "typesafe-actions";
import { GithubProfile } from "../../api/github";
import { getUserAsync } from "../github-typesafe";


//3. 액션타입, 상태타입, 초기상태
export type GithubAction = ActionType<typeof getUserAsync>

//상태타입
export type GithubState = {
    userProfile: {
        loading: boolean;
        error: null | Error;
        data: null | GithubProfile;
    }
}