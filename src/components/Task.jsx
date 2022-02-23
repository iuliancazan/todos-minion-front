import { AiOutlineCheckCircle } from 'react-icons/ai';
import { BsCircle, BsCheckCircle } from 'react-icons/bs';
import { FiCircle, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { deleteTask, toggleCompleteTask } from '../features/tasks/taskSlice';

function Task({ task }) {
  // const { id, complete, name } = task;
  // console.log(task);

  const dispatch = useDispatch();

  const onDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const onComplete = (id) => {
    dispatch(toggleCompleteTask(id));
  };

  return (
    <div className="task">
      <div className="task__left">
        <div className="checkTask">
          {task.completed === true ? (
            <FiCheckCircle
              onClick={() => onComplete(task.id)}
              className="task__completed"
            />
          ) : (
            <FiCircle onClick={() => onComplete(task.id)} />
          )}
        </div>
        <span className={task.completed === true ? 'task__completed' : ''}>
          {task.name}
        </span>
      </div>
      <div className="task__right">
        <FiXCircle
          onClick={() => onDelete(task.id)}
          className={
            task.completed === true ? 'task__completed' : 'task_right_button'
          }
        />
      </div>
    </div>
  );
}

export default Task;
