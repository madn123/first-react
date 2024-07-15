import { Store } from 'react-notifications-component';

const setNotification = ({message, type}) => {
    Store.addNotification({
        title: "",
        message: message,
        type: type,
        insert: "top",
        container: "bottom-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true,
          showIcon: true
        }
    });
}

export default setNotification;