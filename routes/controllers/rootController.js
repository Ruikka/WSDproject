import { getMood } from '../../services/summaryService.js'

const getRoot = async({render, session}) => {
  const user = await session.get('user');
  const user_id = user.id

  var d = new Date()
  const today = await getMood(user_id, d.getFullYear(), d.getMonth()+1, d.getDate())
  d.setDate(d.getDate() - 1);
  const yesterday = await getMood(user_id, d.getFullYear(), d.getMonth()+1, d.getDate())

  const msg = await session.get('msg');
  await session.set('msg', '')

  render('rootView.ejs', {msg: msg, average_mood_today: today, average_mood_yesterday: yesterday});
};
 
export { getRoot };