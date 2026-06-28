# Aplicación Bancaria — Demo Full-Stack

Un sistema bancario completo construido como proyecto personal para demostrar desarrollo full-stack y lógica de dominio de core bancario, de punta a punta.

🎥 **[Ver la demo](https://www.youtube.com/watch?v=iG6coQoRhbs)** — un recorrido por la app de usuario final, la colección de Postman y un adelanto del back office.

## Visión general

El sistema se divide en tres repositorios que trabajan en conjunto:

| Componente | Repositorio | Stack | Propósito |
|-----------|-------------|-------|-----------|
| **userApp** | `userApp` | React, Material UI | App de usuario final para gestionar cuentas y operar |
| **backOffice** | `backOffice` | React, Material UI | Interfaz administrativa de usuarios, cuentas, transacciones y audit logs |
| **backendBank** | `backendBank` | Node.js, Express, MongoDB | API REST, autenticación, procesamiento de transacciones y almacenamiento |

## Arquitectura

```
┌─────────────┐     ┌──────────────┐
│   userApp   │     │  backOffice  │
│  (React)    │     │   (React)    │
└──────┬──────┘     └──────┬───────┘
       │                   │
       └─────────┬─────────┘
                 │  API REST (JWT)
          ┌──────▼───────┐
          │  backendBank │
          │ Node/Express │
          └──────┬───────┘
                 │
          ┌──────▼───────┐
          │   MongoDB    │
          └──────────────┘
```

## Funcionalidades principales

### App de usuario
- Dashboard con saldo de cuenta y transacciones recientes
- Transferencias, depósitos y extracciones
- Vistas de detalle por cuenta con historial completo de transacciones

### Back office (admin)
- Gestión de usuarios con control de acceso basado en roles
- Creación y administración de cuentas
- Visualización y filtrado de audit logs

### API backend
- Autenticación basada en JWT
- Endpoints REST para usuarios, cuentas, transacciones y audit logs
- Modelos de MongoDB: Users, Accounts, Transactions, AuditLogs

## Stack tecnológico

**Frontend:** React, Material UI
**Backend:** Node.js, Express, MongoDB
**Auth:** JWT
**Testing de API:** colección de Postman incluida

## Cómo arrancarlo

```bash
# Backend (backendBank)
npm install
npm start

# Frontend (userApp / backOffice)
npm install
npm start
```

> Configurá la URL base de la API y el connection string de MongoDB en el archivo de entorno antes de ejecutar.

## Sobre este proyecto

Construido para practicar desarrollo full-stack con un dominio bancario — cuentas, transacciones, acceso por roles y trazas de auditoría — reflejando el tipo de sistemas que valido profesionalmente como QA Analyst especializado en core bancario y plataformas financieras.
