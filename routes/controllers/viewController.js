const hello = ({render}) => {
  render('rootView.ejs')
};

const register = ({render}) => {
  render('registerView.ejs')
};

const login = ({render}) => {
  render('loginView.ejs')
};

const logout = ({response}) => {
  response.body = 'This is the logout page!';
};

const behavior = ({render}) => {
  render('reportView.ejs')
};

const summary = ({render}) => {
  render('summaryView.ejs')
};

const morning = ({render}) => {
  render('morningView.ejs')
};

const evening = ({render}) => {
  render('eveningView.ejs')
};


export { hello, register, login, logout, behavior, summary, morning, evening };