import  React , { useEffect, useState } from "react";
import axios from "axios";
import TodoTask from "./TodoTask";
import TaskModal from './TaskModal';

const TodoList = () => {
  // 모달을 위한 state
  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [modalId, setModalId] = useState(0);
  const [editModalText, setEditModalText] = useState("");

  // DB에서 가져온 todo list를 담는 state
  const [resultList, setResultList] = useState([]);

  // post 통신으로 php에서 todo 리스트 가져오기
  useEffect(() => {
    axios.post('http://localhost/project/todo-list.php')
      .then((res) => setResultList(res.data))
      .catch((err) => {
        console.log(err, "초기 화면 돌아가기");
      });
  }, []);

  return (
    <div id="ToDoList">
      <h1>To Do List</h1>
      <button className="todo-btn add-btn" onClick={() => {setModal(true); setModalType("add"); setModalId(0); setEditModalText("");}}>To Do Add</button>
      <table className="todo-table">
        <thead className="todo-thead">
          <tr>
            <th>No.</th>
            <th>To Do</th>
            <th>State</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        {/* todo 리스트 테이블 */}
        <TodoTask setModal={setModal} setModalType={setModalType} setModalId={setModalId} resultList={resultList} setResultList={setResultList} setEditModalText={setEditModalText}/>
      </table>
      {/* 추가, 수정, 삭제 모달 */}
      {
        modal === true ? <TaskModal modal={modalType} setModal={setModal} modalId={modalId} resultList={resultList} setResultList={setResultList} editModalText={editModalText}/> : null
      }
    </div>
  );
};

export default TodoList;