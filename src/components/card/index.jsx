function Card(props) {
  const { extra, children, ...rest } = props;
  return (
    <div
      className={`!z-5 ${extra}`}
      {...rest}
    >
      {children}
    </div>
  );
}

export default Card;
