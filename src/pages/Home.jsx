import AddTask from '../components/AddTask';
import Task from '../components/Task';
import { useSelector, useDispatch } from 'react-redux';

function Home() {
  const { tasks } = useSelector((state) => state.tasks);

  return (
    <div>
      <div className="tasks">
        <div className="tasks__container">
          <AddTask />
          {tasks.some((task) => task.completed === false) ? (
            tasks.map((task) => (
              <>{!task.completed ? <Task task={task} key={task.id} /> : ''}</>
            ))
          ) : (
            <p key="msg_1">No due tasks.</p>
          )}
          {/* <h3 className="showHiddenTasks">Completed tasks</h3> */}
          <hr />
          {tasks.some((task) => task.completed === true) ? (
            tasks.map((task) => (
              <>{task.completed ? <Task task={task} key={task.id} /> : ''}</>
            ))
          ) : (
            <p key="msg_2">No completed tasks.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
