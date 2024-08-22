  # anotherBackend API Collection

This API collection provides various endpoints for user management, account handling, transaction processing, and audit logging. The collection is designed to handle typical backend operations required in a financial or account management system.

## Endpoints

### Users

- **Create User**
  - **Method:** `POST`
  - **Endpoint:** `/api/auth/register`
  - **Description:** Creates a new user with a specified role (user or admin).
  - **Request Body:**
    ```json
    {
      "username": "example",
      "email": "example@example.com",
      "password": "password",
      "role": "user" // Optional: 'user' or 'admin'
    }
    ```

- **Login User**
  - **Method:** `POST`
  - **Endpoint:** `/api/auth/login`
  - **Description:** Authenticates a user and returns a JWT token.
  - **Request Body:**
    ```json
    {
      "username": "example",
      "password": "password"
    }
    ```

- **User Profile**
  - **Method:** `GET`
  - **Endpoint:** `/api/users/profile`
  - **Description:** Retrieves the profile of the authenticated user.

- **Get All Users**
  - **Method:** `GET`
  - **Endpoint:** `/api/users/profile`
  - **Description:** Retrieves a list of all users.

- **Get User by ID or Username**
  - **Method:** `GET`
  - **Endpoint:** `/api/users/search`
  - **Description:** Retrieves a user by their ID or username.
  - **Query Parameters:**
    - `id`: User ID

- **Change Password**
  - **Method:** `PUT`
  - **Endpoint:** `/api/users/change-password`
  - **Description:** Changes the password for the authenticated user.
  - **Request Body:**
    ```json
    {
      "oldPassword": "old_password",
      "newPassword": "new_password"
    }
    ```

- **Modify User**
  - **Method:** `PUT`
  - **Endpoint:** `/api/users/change-password`
  - **Description:** Modifies user details, specifically the password in this case.
  - **Request Body:**
    ```json
    {
      "oldPassword": "old_password",
      "newPassword": "new_password"
    }
    ```

### Accounts

- **User Accounts**
  - **Method:** `GET`
  - **Endpoint:** `/api/accounts/user-accounts`
  - **Description:** Retrieves all accounts associated with the authenticated user.

- **Create Account**
  - **Method:** `POST`
  - **Endpoint:** `/api/accounts/create`
  - **Description:** Creates a new account for the authenticated user.
  - **Request Body:**
    ```json
    {
      "accountType": "savings" // Options: 'checking' or 'savings'
    }
    ```

- **Delete Account by ID**
  - **Method:** `DELETE`
  - **Endpoint:** `/api/accounts/:id`
  - **Description:** Deletes an account by its ID.

### Transfers

- **Deposit to Account**
  - **Method:** `POST`
  - **Endpoint:** `/api/transactions/deposit`
  - **Description:** Deposits a specified amount into an account.
  - **Request Body:**
    ```json
    {
      "accountId": "account_id",
      "amount": 1000
    }
    ```

- **Withdraw from Account**
  - **Method:** `POST`
  - **Endpoint:** `/api/transactions/withdraw`
  - **Description:** Withdraws a specified amount from an account.
  - **Request Body:**
    ```json
    {
      "accountId": "account_id",
      "amount": 500
    }
    ```

- **Transfer Between Accounts**
  - **Method:** `POST`
  - **Endpoint:** `/api/transactions/transfer`
  - **Description:** Transfers a specified amount from one account to another.
  - **Request Body:**
    ```json
    {
      "fromAccountId": "from_account_id",
      "toAccountId": "to_account_id",
      "amount": 300
    }
    ```

- **Revert Transaction**
  - **Method:** `POST`
  - **Endpoint:** `/api/transactions/transfer`
  - **Description:** Reverts a previously made transaction between accounts.
  - **Request Body:**
    ```json
    {
      "fromAccountId": "from_account_id",
      "toAccountId": "to_account_id",
      "amount": 300
    }
    ```

### Audit Logs

- **Get Audit Logs**
  - **Method:** `GET`
  - **Endpoint:** `/api/audit/logs`
  - **Description:** Retrieves a list of audit logs for review.

## Postman Collection

You can import the `anotherBackend.postman_collection.json` file into Postman to easily test these endpoints. Make sure to set up the necessary environment variables in Postman.

