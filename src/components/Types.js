import "./Types.scss";
const Types = (props) => {
  return (
    <div
      className={`rounded-circle p-3 ${props.type} type-icon d-flex align-items-center justify-content-center`}
    />
  );
};

export default Types;
