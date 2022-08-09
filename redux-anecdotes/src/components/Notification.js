import { useDispatch, useSelector } from "react-redux";
import { resetMessage } from "../reducers/notificationReducer";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  if (notification) {
    clearTimeout();
    setTimeout(() => dispatch(resetMessage()), 5000);
  }

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return notification ? <div style={style}>{notification}</div> : <></>;
};

export default Notification;
