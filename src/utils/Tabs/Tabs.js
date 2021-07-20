import { cloneElement } from "react";
import "./Tabs.scss";
export const Tab = ({ label, active, onClick, color }) => {
  return (
    <li className="nav-item">
      <button
        onClick={onClick}
        className={`${color} fw-bold rounded-pill nav-link${
          active ? " active" : ""
        }`}
      >
        {label}
      </button>
    </li>
  );
};

export const Tabs = ({ selectedTab, onChange, children }) => {
  const tabs = children.map((child) => {
    const handleClick = (e) => {
      onChange(e, child.props.value);
    };
    return cloneElement(child, {
      key: child.props.value,
      active: child.props.value === selectedTab,
      onClick: handleClick,
    });
  });
  return (
    <>
      <ul className="nav nav-pills">{tabs}</ul>
    </>
  );
};

export const Panel = ({ children, value, selectedIndex }) => {
  const hidden = value !== selectedIndex;
  return (
    <div className={`tab-pane fade${hidden ? "" : " show active"}`}>
      {children}
    </div>
  );
};
