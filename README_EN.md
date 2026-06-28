# Banking Application — Full-Stack Demo

A full-featured banking system built as a personal project to demonstrate full-stack development and core banking domain logic, end to end.

🎥 **[Watch the demo](https://www.youtube.com/watch?v=iG6coQoRhbs)** — a walkthrough of the user-facing app, the Postman collection, and a preview of the back office.

## Overview

The system is split across three repositories that work together:

| Component | Repository | Stack | Purpose |
|-----------|-----------|-------|---------|
| **userApp** | `userApp` | React, Material UI | User-facing app to manage accounts and perform transactions |
| **backOffice** | `backOffice` | React, Material UI | Admin interface for users, accounts, transactions, and audit logs |
| **backendBank** | `backendBank` | Node.js, Express, MongoDB | REST API, authentication, transaction processing, and data storage |

## Architecture

```
┌─────────────┐     ┌──────────────┐
│   userApp   │     │  backOffice  │
│  (React)    │     │   (React)    │
└──────┬──────┘     └──────┬───────┘
       │                   │
       └─────────┬─────────┘
                 │  REST API (JWT)
          ┌──────▼───────┐
          │  backendBank │
          │ Node/Express │
          └──────┬───────┘
                 │
          ┌──────▼───────┐
          │   MongoDB    │
          └──────────────┘
```

## Key Features

### User app
- Dashboard with account balance and recent transactions
- Transfers, deposits, and withdrawals
- Per-account detail views with full transaction history

### Back office (admin)
- User management with role-based access control
- Account creation and management
- Audit log viewing and filtering

### Backend API
- JWT-based authentication
- REST endpoints for users, accounts, transactions, and audit logs
- MongoDB models: Users, Accounts, Transactions, AuditLogs

## Tech stack

**Frontend:** React, Material UI
**Backend:** Node.js, Express, MongoDB
**Auth:** JWT
**API testing:** Postman collection included

## Getting started

```bash
# Backend (backendBank)
npm install
npm start

# Frontend (userApp / backOffice)
npm install
npm start
```

> Configure the API base URL and MongoDB connection string in the environment file before running.

## About this project

Built to practice full-stack development with a banking domain — accounts, transactions, role-based access, and audit trails — mirroring the kind of systems I validate professionally as a QA Analyst specialized in core banking and financial platforms.
