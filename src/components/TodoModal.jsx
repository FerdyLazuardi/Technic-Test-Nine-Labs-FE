import React, { useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import { addTodo, updateTodo } from "../redux/reducer/todoSlice";
import styles from "../styles/modules/modal.module.scss";
import Button from "./Button";
import { format } from "date-fns";

const dropIn = {
  hidden: {
    opacity: 0,
    transform: "scale(0.9)",
  },
  visible: {
    transform: "scale(1)",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    transform: "scale(0.9)",
    opacity: 0,
  },
};

function TodoModal({ type, modalOpen, setModalOpen, todo }) {
  const dispatch = useDispatch();
  const [tittle, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("incomplete");

  useEffect(() => {
    if (type === "update" && todo) {
      setTitle(todo.tittle);
      setDeadline(todo.deadline);
    } else {
      setTitle("");
      setDeadline("");
    }
  }, [type, todo, modalOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (tittle === "") {
      toast.error("Please enter a title");
      return;
    }
    if (deadline === "") {
      toast.error("Please enter a deadline");
      return;
    }

    const taskData = {
      tittle,
      deadline,
      status: "incomplete",
    };

    try {
      if (type === "add") {
        await dispatch(addTodo(taskData)); // Use the addTodo thunk
        toast.success("Task added successfully");
      }

      if (type === "update") {
        if (todo.title !== title || todo.status !== status) {
          await dispatch(updateTodo({ ...todo, ...taskData })); // Use the updateTodo thunk
          toast.success("Task updated successfully");
        }
      }

      setModalOpen(false);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred");
    }
  };

  return (
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          className={styles.wrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.container}
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className={styles.closeButton}
              onKeyDown={() => setModalOpen(false)}
              onClick={() => setModalOpen(false)}
              role="button"
              tabIndex={0}
              // animation
              initial={{ top: 40, opacity: 0 }}
              animate={{ top: -10, opacity: 1 }}
              exit={{ top: 40, opacity: 0 }}
            >
              <MdOutlineClose />
            </motion.div>

            <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
              <h1 className={styles.formTitle}>
                {type === "add" ? "Add" : "Update"} TODO
              </h1>
              <label htmlFor="tittle">
                Title
                <input
                  type="text"
                  id="title"
                  value={tittle}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <label htmlFor="date">
                Deadline
                <input
                  type="date"
                  id="deadline"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </label>
              {/* <label htmlFor="type">
                Status
                <select
                  id="type"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="incomplete">Incomplete</option>
                  <option value="complete">Completed</option>
                </select>
              </label> */}
              <div className={styles.buttonContainer}>
                <Button type="submit" variant="primary">
                  {type === "add" ? "Add Task" : "Update Task"}
                </Button>
                <Button variant="secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TodoModal;
