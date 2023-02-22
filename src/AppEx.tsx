import React from 'react';
import logo from './logo.svg';
import './App.css';

interface Person {
  name: string
}

const person1:Person = {  //타입체크가 되서 에러 발생
  name: "green",
  //age: 30
}

const person2 = {name:"blue", age: 30} as Person  //에러 무시해줌 이거는 타입이 Person이라 지정

function App() {
  return (
    <div className="App">
      
    </div>
  );
}

export default App;