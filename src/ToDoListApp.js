import Button from "./Button";
import styles from "./App.module.css";
import { useState, useEffect } from "react";

function Hello() {
  function byFn() {
    console.log("bye :(");
  }

  function hiFn() {
    console.log("created :)");
    return byFn;
  }

  useEffect(hiFn, []);
  return <h1>Hello</h1>;
}

function App() {
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]);
  const onChange = (event) => setToDo(event.target.value);
  const onSubmit = (event) => {
    // form은 submit 이벤트를 갖고 있다.
    // 그러므로 event.preventDefault() 함수를 통해 기본 동작을 막자
    event.preventDefault();
    if (toDo === "") {
      return;
    }
    // function a(currentArray) { } | toDo, ...arr -> ...arr는 배열 안에 객체 가져옴
    setToDos((currentArray) => [toDo, ...currentArray]);

    // state는 직접적으로 수정 불가능(예: toDo = "") XX
    setToDo("");
  };
  return (
    <div>
      <h1>My To Dos ({toDos.length})</h1>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={toDo}
          type="text"
          placeholder="Write your to do..."
        />
        <button>Add To Do</button>
      </form>
      <hr />
      <ul>
        {toDos.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
