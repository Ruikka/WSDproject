import { executeQuery } from '../../database/database.js'
import { bcrypt } from '../../deps.js'
import { validate, required, isEmail, minLength} from '../../deps.js'

const getLogin = async({render}) => {
    render('loginView.ejs')
};

const postLogin = async({request, response, render, session}) => {
  const body = request.body();
  const params = await body.value;

  const email = params.get('email');
  const password = params.get('password');

  // check if the user with the given email exists in the database
  const exists = await executeQuery("SELECT * FROM users WHERE email = $1;", email);
  if (exists.rowCount === 0) {
    render('/loginView.ejs', {errors: "Invalid email or password"})
    return;
  }

  // take the first row from the results
  const userO = exists.rowsOfObjects()[0];

  const hash = userO.password;

  const CorrectPassword = await bcrypt.compare(password, hash);
  if (!CorrectPassword) {
    render('/loginView.ejs', {errors: "Invalid email or password"})
    return;
  }

  await session.set('authenticated', true);
  await session.set('user', {
    id: userO.id,
    email: userO.email
  });
  await session.set('msg', 'Login successful')
  response.redirect('/')
};

const postLogout = async({response, session}) => {
  await session.set('authenticated', false);
  await session.set('user', undefined);
  response.redirect('/auth/login')
};


const getRegistration = async({render}) => {
    render('registerView.ejs')
};

 const postRegistration = async({request, response, render}) => {
    const body = request.body();
    const params = await body.value;

    const email = params.get('email');
    const password = params.get('password');
    const verification = params.get('verification');
    
    //data is for validation
    const data = {}
    data.email = email
    data.password = password
    data.verification = verification
  
    const validationRules = {
      email: [required, isEmail],
      password: [required, minLength(4)],
      verification: [required]
    }
  
    //var instead of const, otherwise errors happen
    var [passes, errors] = await validate(data, validationRules)
  
    const existingUsers = await executeQuery("SELECT * FROM users WHERE email = $1",email);
    if (existingUsers.rowCount > 0) {
      passes = false
      if (errors.email){
        errors.email = errors.email
      } else {
        errors.email = {}
      }     
      errors.email.exists = 'The email is already in use';
    }

    //validationRules's match function won't give neat output on not matching passwords so we verify manually
    if (password !== verification) {
      passes = false
      errors.verification = errors.verification ? errors.verification : {}
      errors.verification.match = 'The entered passwords did not match';
    }
  
    console.log(passes)
    console.log(errors)
  
    if (!passes) {
      render('registerview.ejs', {email: email, errors: errors});
      return
    }
    //must not store the plaintext password, hence hash
    const hash = await bcrypt.hash(password);
    await executeQuery("INSERT INTO users (email, password) VALUES ($1, $2);", email, hash);
    response.redirect('/auth/registrationSuccessful')
};

const registrationSuccessful = async({render}) => {
  render('registrationSuccessView.ejs');
};

export {getLogin, getRegistration, postRegistration, postLogin, postLogout, registrationSuccessful}