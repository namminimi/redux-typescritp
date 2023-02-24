import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import GithubForm from '../components/GithubForm';
import GithubUser from '../components/GithubUser';
import { rootState } from '../modules';
import { getUserProfileThunk } from '../modules/github-typesafe';

const GithubContainer = () => {
    const {loading, data, error} = useSelector((state:rootState)=>state.github.userProfile)
    const dispatch = useDispatch();

    const onClickUsername = (username: string) => {
        dispatch(getUserProfileThunk(username))
    }
    return (
        <div>
            <GithubForm onSubmitUser={onClickUsername}/>
            {loading && <div>로딩중....</div>}
            {error && <div>에러발생</div>}
            {data && <GithubUser bio={data.bio} blog ={data.blog}
            name={data.name} thumbnail={data.avatar_url}/>}
        </div>
    );
};

export default GithubContainer;