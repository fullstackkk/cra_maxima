import { useState } from "react";
import { timeList } from "./utils";
import "./todoList.css";

const Select = ({ value, setSelect }) => {
  return (
    <select
      onChange={(e) => setSelect(e.target.value)}
      value={value}
      className="select"
    >
      {timeList.map((record) => {
        return (
          <option key={record.time} value={record.time}>
            {record.time}.00
          </option>
        );
      })}
    </select>
  );
};
const Input = ({ setInput }) => {
  return (
    <input
      className="record-input"
      placeholder="Ведите задачу!"
      type="text"
      onChange={(e) => setInput(e.target.value)}
    />
  );
};
const Button = ({ addTask }) => {
  return (
    <button onClick={() => addTask()} className="record-btn-add">
      Добавить!
    </button>
  );
};
const List = ({ recordList, setRecordList, deleteRecord }) => {
  console.log(recordList);
  let newRecordlist = [];
  if (recordList !== []) {
    newRecordlist = recordList.map((record) => {
      return (
        <div className="record" key={record.time}>
          <div className="time">{record.time}</div>
          <div className="notice">{record.notice}</div>
          <button className="delete">x</button>
        </div>
      );
    });
  }

  return <div className="list">{newRecordlist} </div>;
};

function TodoListFunc(props) {
  const [select, setSelect] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [recordList, setRecordList] = useState([]);

  function addTask() {
    if (inputValue !== "" && select !== "") {
      setRecordList([...recordList, { time: select, notice: inputValue }]);
    }
    return;
  }
  function deleteRecord(time) {
    recordList.forEach((record, i) => {
      if (record.time == time) {
        const startArr = recordList.slice(0, i - 1);
        const endArr = recordList.slice(i + 1);
        setRecordList(...startArr, ...endArr);
      }
    });
  }
  return (
    <div className="todo-list">
      <Select value={select} setSelect={setSelect} />
      <Input value={inputValue} setInput={setInputValue} />
      <Button addTask={addTask} />
      <List
        recordList={recordList}
        setRecordList={setRecordList}
        deleteRecord={deleteRecord}
      />
    </div>
  );
}

export default TodoListFunc;
