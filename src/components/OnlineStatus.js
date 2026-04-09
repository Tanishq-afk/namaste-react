import useOnlineStatus from "../utils/useOnlineStatus";

const OnlineStatus = () => {
  const isOnline = useOnlineStatus();

  return (
    <span className={`online-status ${isOnline ? "is-online" : "is-offline"}`}>
      {isOnline ? "Online" : "Offline"}
    </span>
  );
};

export default OnlineStatus;
