import React from 'react';


//prop타입 지정
type GithubUserProps = {
    name: string;
    thumbnail: string;
    bio: string | null;
    blog: string;
}
const GithubUser = ({name, thumbnail, bio, blog}: GithubUserProps) => {
    return (
        <div>
            <div>
                <img src={thumbnail} alt="userimg"/>
                <div>{name}</div>
            </div>
            <p>{bio}</p>
            <div>{blog !== '' && <a href={blog}>블로그</a>}</div>
        </div>
    );
};

export default GithubUser;