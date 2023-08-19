import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button, { SelectButton } from "./Button";
import styles from "../styles/modules/app.module.scss";
import TodoModal from "./TodoModal";
import { updateFilterStatus } from "../redux/reducer/todoSlice";

function AppHeader() {
  const [modalOpen, setModalOpen] = useState(false);
  const filterStatus = useSelector((state) => state.todo.filterStatus);
  const dispatch = useDispatch();
  const updateFilter = (e) => {
    const newFilterStatus = e.target.value;
    dispatch(updateFilterStatus(newFilterStatus));
  };

  return (
    <div className={styles.appHeader}>
      <Button variant="primary" onClick={() => setModalOpen(true)}>
        Add Task
      </Button>
      <SelectButton
        id="status"
        onChange={(e) => updateFilter(e)}
        value={filterStatus}
      >
        <option value="all">All</option>
        <option value="incomplete">Incomplete</option>
        <option value="complete">Completed</option>
      </SelectButton>
      <TodoModal type="add" modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  );
}

export default AppHeader;
