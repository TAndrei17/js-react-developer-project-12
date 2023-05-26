const NoRemovableChannel = (props) => {
  return (
    <>
      <button
        id={props.id}
        type="button"
        className={props.classes1}
        name={props.name}>
        <span className="me-1">#</span>
        {props.name}
      </button>
    </>
  );
};

export default NoRemovableChannel;
