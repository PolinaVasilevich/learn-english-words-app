import { useToasts } from "react-toast-notifications";

const ShowMessage = ({ type = "success", message = "" }) => {
  const { addToast } = useToasts();

  return addToast(message, {
    appearance: type,
    autoDismiss: true,
  });
};

export default ShowMessage;
