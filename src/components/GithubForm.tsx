import React, { ChangeEvent, useState } from 'react';


type GithubFormProps = {
    onSubmitUser: (username: string)=>void
}

const GithubForm = ({onSubmitUser}: GithubFormProps) => {
    const [input, setInput] = useState("")
    const onChange = (e:ChangeEvent<HTMLInputElement>) =>{
        setInput(e.target.value)
    }
    const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onSubmitUser(input)
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} value={input}/>
                <button type="submit">조회</button>
            </form>
        </div>
    );
};

export default GithubForm;