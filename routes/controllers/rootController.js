const USER_ID = 1 // TODO replace

const getRoot = async({render, session}) => {
 /**  const user = await session.get('user');
  const user_id = user.id

  var d = new Date()
  const today = await getUserMood(user_id, d.getFullYear(), d.getMonth()+1, d.getDate())
  d.setDate(d.getDate() - 1);
  const yesterday = await getUserMood(user_id, d.getFullYear(), d.getMonth()+1, d.getDate()) */

  const msg = await session.get('msg');
  await session.set('msg', '')

  render('rootView.ejs', {msg: msg});
};
 
export { getRoot };