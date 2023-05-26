import DeleteChannel from '../modalWindows/channel_delete';

const RemovableChannel = (props) => {
  // both buttons belong to the same channel
  // that reason they have same id

  return (
    <div className="btn-group d-flex" role="group">
      <button
        id={props.id}
        type="button"
        className={props.classes1}
        name={props.name}>
        <span className="me-1">#</span>
        {props.name}
      </button>

      <button
        id={props.id}
        type="button"
        className={props.classes2}
        data-bs-toggle="dropdown"
        aria-expanded="false">
        <span className="visually-hidden">
          Переключатель выпадающего списка
        </span>
      </button>
      <ul className="dropdown-menu">
        <li>
          <DeleteChannel id={props.id} />
        </li>
        <li>
          <button className="dropdown-item">Изменить</button>
        </li>
      </ul>
    </div>
  );
};

export default RemovableChannel;
