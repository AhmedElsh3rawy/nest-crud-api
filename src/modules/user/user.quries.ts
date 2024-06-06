export const GetUsers = 'SELECT * FROM users';

export const GetUserById = 'SELECT * FROM users WHERE id = $1';

export const CheckEmailExists = 'SELECT u FROM users u WHERE u.email = $1';

export const AddUser =
  'INSERT INTO users (first_name, last_name, email, dob) VALUES ($1, $2, $3, $4) RETURNING *';

export const RemoveUser = 'DELETE FROM users WHERE id = $1';
