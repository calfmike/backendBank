# Banking Application

# Demo
A little go trhough on the user final application reviewn the postman collection and seeing a hint of the BO yet to pulish

[![Check the demo](https://github.com/user-attachments/assets/549cfa36-dad1-43e7-aaf5-cc296fdca50c)](https://www.youtube.com/watch?v=iG6coQoRhbs)

## Introduction
This repository is part of a comprehensive banking application that consists of three main components: **userApp**, **backOffice**, and **backendBank**. Together, these repositories provide a full-featured banking system, enabling both users and administrators to manage accounts, perform transactions, and monitor system activity.

## System Architecture

### Frontend (userApp)
- **Technology:** React.js, Material UI
- **Purpose:** A user-facing interface for individual users to manage their accounts, view transactions, and perform banking operations.
- **Key Features:**
  - User dashboard with account balance and recent transactions.
  - Interfaces for performing transfers, deposits, and withdrawals.
  - Detailed views of each account, including transaction history and current balance.

### Frontend (backOffice)
- **Technology:** React.js, Material UI
- **Purpose:** An administrative interface for managing users, accounts, transactions, and audit logs.
- **Key Features:**
  - User management with role-based access control.
  - Account creation and management.
  - Viewing and filtering of audit logs.

### Backend (backendBank)
- **Technology:** Node.js, Express, MongoDB
- **Purpose:** Handles API requests, user authentication, transaction processing, and data storage for both **userApp** and **backOffice**.
- **Key Components:**
  - JWT-based authentication.
  - API endpoints for managing users, accounts, transactions, and audit logs.
  - MongoDB models for Users, Accounts, Transactions, and AuditLogs.

## Key Features

### User Management
- Registration, login, and profile management for users.
- Role-based access control (Admins vs. Regular Users).

### Account Management
- Account creation, viewing, and management.
- Display of account balances and transaction history.

### Transaction Management
- Perform deposits, withdrawals, and transfers between accounts.
- View transaction history and revert transactions (admin feature).

### Audit Logging
- Record and view significant actions performed in the system.
- Filter logs by date, user, or action type.

## Use Cases

### User Actions (userApp)
- **Dashboard Access:** Users log in and access their personalized dashboard.
- **View Account Details:** Users can view detailed information about their accounts.
- **Perform Transactions:** Users can initiate transfers, deposits, and withdrawals.
- **Update Profile:** Users can update their personal information and change their password.

### Admin Actions (backOffice)
- **Manage Users:** Admins can manage user roles and permissions.
- **Manage Accounts:** Admins can create and manage user accounts.
- **View Audit Logs:** Admins can view detailed logs of system actions.

## API Endpoints

### User Management
- **POST /auth/register:** Register a new user.
- **POST /auth/login:** Authenticate user and generate JWT token.
- **GET /users/profile:** Retrieve the authenticated user’s profile.
- **PUT /users/profile:** Update user profile.

### Account Management
- **POST /accounts/create:** Create a new account.
- **GET /accounts/user/:userId:** Get all accounts for a specific user.
- **GET /accounts/:accountId:** Get details of a specific account.

### Transaction Management
- **POST /transactions/deposit:** Perform a deposit.
- **POST /transactions/withdraw:** Perform a withdrawal.
- **POST /transactions/transfer:** Transfer funds between accounts.
- **GET /transactions/account/:accountId:** Get all transactions for a specific account.

### Audit Logs
- **GET /audit/logs:** Retrieve all audit logs.
- **GET /audit/filter:** Filter audit logs by criteria.

## Security Considerations
- **Authentication:** JWT-based authentication for securing API endpoints.
- **Authorization:** Role-based access control to restrict actions based on user roles.
- **Input Validation:** Ensuring all user inputs are validated and sanitized.

## Error Handling
- Comprehensive error handling across all API endpoints.
- Use of standardized error messages for client-side handling.

## Conclusion
This banking application offers a robust solution for managing user accounts, performing financial transactions, and maintaining system integrity through audit logging. The integration of **userApp**, **backOffice**, and **backendBank** ensures a seamless experience for both users and administrators.


