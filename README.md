# ParkFlow - Frontend

A web application for university parking management built with React.

## Technologies

- React 18
- Vite
- Tailwind CSS
- React Router
- Axios

## Features

- User authentication (login/register)
- Real-time parking spot availability
- Reservation management
- QR code generation for parking access
- Admin dashboard
- Responsive design

## Installation

Clone the repository:

    git clone https://github.com/yasser-ms/park_Flow_Web_App.git

Navigate to project directory:

    cd park_Flow_Web_App

Install dependencies:

    npm install

Start development server:

    npm run dev

## Configuration

Create a `.env` file in the root directory:

    VITE_API_URL=http://localhost:8080/api

## Project Structure

    src/
    ├── Pages/         # Page components
    ├── QrCode/        # QR code generation
    ├── api/           # API calls and services
    ├── assets/        # Images and static files
    ├── components/    # Reusable UI components
    ├── context/       # React context providers
    ├── sections/      # Page sections
    ├── utils/         # Utility functions
    ├── App.jsx        # Main app component
    ├── index.css      # Global styles
    └── main.jsx       # Entry point

## Related Repositories

- ParkFlow Backend (Microservices): https://github.com/yasser-ms/parking_managment_APIs

## Author

Yasser - CY Tech Computer Science Student

## License

This project is part of a university SAE project.
