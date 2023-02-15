import Button from "./Button";
import styles from "./App.module.css";
import { useState, useEffect } from "react";

function App() {
  const [counter, setValue] = useState(0);
  const [keyword, setKeyword] = useState("");
  const onClick = () => setValue((prev) => prev + 1);
  const onChange = (event) => setKeyword(event.target.value);
  console.log("i run all the time");

  useEffect(() => {
    console.log("I run only once.");
  }, []); // 코드가 한 번만 실행 하도록 보호 해줌

  useEffect(() => {
    console.log("I run when 'keyword' chnages.");
  }, [keyword]); // 'keyword'가 변화할 때 코드를 실행할 거라고 react.js에게 알려주는역할

  useEffect(() => {
    console.log("I run when 'counter' chnages.");
  }, [counter]);

  useEffect(() => {
    console.log("I run when keyword & conuter change");
  }, [keyword, counter]);

  return (
    <div>
      <input
        value={keyword}
        onChange={onChange}
        type="text"
        placeholder="Search here"
      />
      <h1>{counter}</h1>
      <button onClick={onClick}>Click me</button>
    </div>
  );
}

export default App;
