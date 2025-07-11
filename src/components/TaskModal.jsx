import React, { useState } from "react";
import axios from "axios";

const TaskModal = (props) => {
  const [todoText, setTodoText] = useState(props.editModalText);
  const type = props.modal;
  
  // 추가, 수정 시 작성한 input 값 가져오기
  const onChange = event => {
    setTodoText(event.target.value);
  }

  // DB에 추가, 수정, 삭제하고 변경된 리스트를 다시 가져오기
  const todo_edit = (id, todo, action) => {
    axios({
      method: "post",
      url:"http://localhost/project/todo-edit.php",
      data: {
        id: id,
        todo: todo,
        action: action
      }
    })
    .then((res) => {
      props.setResultList(res.data);
    })
    .catch(error => {
      console.log(error.res);
    });
  }
  
  // 추가, 수정, 삭제 별 버튼 클릭 시 input의 입력 값을 받아 넘기기
  const setModal = (action) => {
    let set_false = -1;

    switch(action){
      case "add":
      case "edit":
        todoText.length > 0 ? todo_edit(props.modalId, todoText, action) : alert("enter a value");
        set_false = todoText.length;
        break;
      case "remove":
        todo_edit(props.modalId, todoText, action);
        break;
      default:
        break;
    }
    return set_false === 0 ? null : props.setModal(false);
  };


  return(
    <div id="TaskModal">
      <div>
        {
          type === "add" ? "add" : 
          type === "edit" ? "edit" :
          null
        }
      </div>
      {
        (type === "add" || type === "edit") ? 
          <div className="input-wrapper">
            <input type="text" name="task-name" id="input" value={todoText} onChange={onChange} required autoComplete="off"/>
            <label htmlFor="input">To Do</label>
          </div> : "Do you want delete?"
      }
      <hr/>
      {
        type === "add" ? 
          <div>
            <button className="todo-btn todo-cancel-btn" onClick={() => setModal("cancel")}>cancel</button>
            <button className="todo-btn todo-done-btn" onClick={() => setModal("add")}>add</button>
          </div>:
        type === "edit" ? 
          <div>
            <button className="todo-btn todo-cancel-btn" onClick={() => setModal("cancel")}>cancel</button>
            <button className="todo-btn todo-done-btn" onClick={() => setModal("edit")}>edit</button> 
          </div> :
          <div>
             <button className="todo-btn todo-cancel-btn" onClick={() => setModal("cancel")}>cancel</button>
            <button className="todo-btn todo-done-btn" onClick={() => setModal("remove")}>delete</button> 
          </div>
      }
    </div>
  )
}

export default TaskModal;