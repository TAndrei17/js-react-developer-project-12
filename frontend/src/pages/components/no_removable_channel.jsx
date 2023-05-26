// нужно продумать, как класс active устанавливать
// здесь установить пропс на класс, а в списке использовать cn и устанавливать active?

const NoRemovableChannel = (props) => {
  return (
    <>
      <button
        id={props.id}
        type="button"
        className="btn w-100 rounded-0 text-start"
        name={props.name}>
        <span className="me-1">#</span>
        {props.name}
      </button>
    </>
  );
};

export default NoRemovableChannel;
