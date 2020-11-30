import { executeQuery } from "../database/database.js";

const registerUser = async({request, response}) => {
    const body = request.body();
    const params = await body.value;
    
    const email = params.get('email');
    const password = params.get('password');
    const verification = params.get('verification');
  
    if (password !== verification) {
      response.body = 'The entered passwords did not match';
      return;
    }

    const existingUsers = await executeQuery("SELECT * FROM users WHERE email = $1", email);
    if (existingUsers.rowCount > 0) {
      response.body = 'The email is already reserved.';
      return;
    }
  
    const hash = await bcrypt.hash(password);
    await executeQuery("INSERT INTO users (email, password) VALUES ($1, $2);", email, hash);
    response.body = 'Registration successful!';
}

export { registerUser };