# Backend Delivery App

This project is the backend of a delivery app built using **Fastify** and **Node.js**. It manages various delivery services, including user and delivery partner management. Additionally, **AdminJS** is integrated to provide an admin panel for managing users and delivery operations.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Admin Panel](#admin-panel)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Management**: Register, login, and manage customers and delivery partners.
- **Delivery Management**: Track and manage delivery orders.
- **Admin Panel**: Manage data using a user-friendly admin interface via **AdminJS**.
- **High Performance**: Built with **Fastify** for fast and low-latency responses.
- **MongoDB**: Database to store user, delivery partner, and order data.

## Technologies

- **Node.js**: Backend runtime.
- **Fastify**: High-performance web framework.
- **AdminJS**: Admin panel interface.
- **MongoDB**: NoSQL database for data persistence.
- **Fastify Plugins**: Additional plugins for routing, validation, and performance optimization.
  
## Installation

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v16 or above)
- **MongoDB** (Local or cloud-based)

### Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/whyareyr/backend-delivery-app.git
    ```

2. Navigate to the project directory:
    ```bash
    cd backend-delivery-app
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

4. Set up environment variables (see [Environment Variables](#environment-variables) section).

5. Start the server:
    ```bash
    npm start
    ```

## Usage

The backend server will run at `http://localhost:3000` by default. The admin panel is accessible at `/admin`.

### Running in Development Mode

To run the server with live reloads:
```bash
npm run dev
