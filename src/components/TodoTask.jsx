import React from "react";
import axios from "axios";
import pencil from "../image/pencil.png";
import eraser from "../image/eraser.png";

// 컴포넌트
const TodoTask = (props) => {
  // 버튼 클릭 시 모달 출력
  const clickModal = (type, id, text) => {
    props.setModalId(id);
    props.setModal(true);
    props.setModalType(type);
    return type === "edit" ? props.setEditModalText(text) : null;
  };

  const list_length = Object.keys(props.resultList).length;

  const get_list = Object.values(props.resultList).map((list, index) => {
    const checked = list.status === "1" ? true : false;

    const idx = list_length - index;

    return (
      <tr className="todo-task" key={list.id}>
          <th>{idx}</th>
          <th>{list.todo}</th>
          <th>
            {/* <label className="checkbox_label"></label> */}
            <input type="checkbox" className="status_checkbox" defaultChecked={checked} onChange={() => checkbox_change(list.id, !checked)}/>
          </th>
          <th onClick={() => clickModal("edit", list.id, list.todo)}>
            <img className="task-icon" src={pencil} alt="edit"/>
          </th>
          <th onClick={() => clickModal("remove", list.id, "")}>
            <img className="task-icon" src={eraser} alt="remove"/>
          </th>
        </tr>
    )
  });

  
  // 투두 리스트의 상태 변경
  const checkbox_change = (todo_id, checked) => {
    axios({
      method: "post",
      url:"http://localhost/project/todo-status-update.php",
      data: {
        id: todo_id,
        status: checked
      }
    })
    .then((res) => {
      return
    })
    .catch(error => {
      console.log("error");
      console.log(error);
    });
  } 

  return(
    <tbody className="todo-tbody">
    {get_list}
    {/* {removemodal === true ? <RemoveModal/> : null} */}
    </tbody>
  );
};

export default TodoTask;