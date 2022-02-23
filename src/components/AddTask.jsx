import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createTask } from '../features/tasks/taskSlice';
import { v4 as uuid } from 'uuid';

function AddTask() {
  const [formData, setFormData] = useState({
    id: null,
    taskName: '',
    completed: false,
  });

  const { taskName } = formData;

  const dispatch = useDispatch();

  const { tasks, task, isLoading, isSuccess, message } = useSelector(
    (state) => state.tasks
  );

  // update the state
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // reset the state
  const resetForm = () => {
    setFormData({
      id: null,
      taskName: '',
      completed: false,
    });
  };

  // dispatch createTask on submit
  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      id: uuid(),
      name: taskName,
      completed: false,
    };
    if (taskName) {
      dispatch(createTask(data));
      resetForm();
    }
  };

  return (
    <div className="addTask mb-3">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="string"
            className="form-control"
            id="taskName"
            name="taskName"
            value={taskName}
            onChange={onChange}
            placeholder="What do you want to do?"
            required
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block">Add Task</button>
        </div>
      </form>
    </div>
  );
}

export default AddTask;
