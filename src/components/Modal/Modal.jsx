import "./style.css";
import ReactDOM from "react-dom";

export const Modal = (props) => {
  const body = document.querySelector("body");
  const Modal = (
    <div className="modal">
      <span>Добро пожаловать</span>
      <span> Логин: {props.login}</span>
      <span>Пароль: {props.password}</span>
      <button type="button" onClick={props.onClick} onClose={props.onClose}>
        OK
      </button>
    </div>
  );
  return ReactDOM.createPortal(Modal, body);
};
