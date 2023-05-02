const MessagesBlock = () => {
  // нужно обходить каналы и добавлять сюда

  return (
    <div className="col-8 border border-primary">
      <div className="row h-100">
        <div className="col-12 text-primary">Сообщения</div>
        <div className="col-12 h-75 m-auto text-primary">
          Место для сообщений
        </div>
        <div className="col-12 text-primary align-items-end">
          Место для инпута
        </div>
      </div>
    </div>
  );
};

export default MessagesBlock;
