import { executeQuery } from "../database/database.js";

const getSleepDur = async() => {
  const res = await executeQuery("SELECT sleepDuration FROM morning_reports");
  if (res && res.rowCount > 0) {
    return res.rowsOfObjects()[0];
  }

  return 'No messages available';
}

const setHello = async(newMessage) => {
  await executeQuery("INSERT INTO messages (message, sender) VALUES ($1, 'API');", newMessage);
}

export { getHello, setHello };