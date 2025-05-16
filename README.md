Leave Management System Setup Guide
This guide provides a step-by-step process to set up the Leave Management System project, covering
dependency installation, environment configuration, database setup, and application execution in both
development and production environments.

Table of Contents are here

1. Prerequisites
Ensure you have the following installed and configured:

2. Directory Structure Overview
Pages Directory
Defines application routing, with each file corresponding to a route:
Admin Pages

User Pages
1. Prerequisites
2. Directory Structure Overview
Pages Directory
Src Directory
3. Installing Dependencies
4. Environment Configuration
5. Setting Up Database Files
6. Data Import Script
7. Running the Application
Development Mode
Production Mode

Node.js (Version 14 or higher)
MongoDB (Local or a cloud instance via MongoDB Atlas)

adminpage.jsx : Dashboard for leave statistics and employee attendance.
attendanceOverview.jsx : Attendance management page.

userpage.jsx : User dashboard for leave requests.

API Routes

Src Directory
Components and Styles

App, Contexts, and Utilities

Server Directory

3. Installing Dependencies

4. Environment Configuration
history.jsx : Personal attendance records page.

admin/ : API handlers for admin operations.
user/ : API handlers for user operations.

components/ : Reusable React components for:
Admin ( admin/ )
User ( user/ )
Shared ( common/ )
styles/ : CSS files for:
Admin ( admin/ )
User ( user/ )
Shared ( common/ )

app/ : Main application logic and layout components.
contexts/ : Global state management providers.
utils/ : Common utility functions.

config/ : Database connection settings.
models/ : Mongoose models defining schemas.
database/ : Scripts and files for database management.
importData.js : Script for importing CSV data into MongoDB.

1. Clone the repository:
git clone https://github.com/aanushkaguptaa/LeaveManagementSystem
cd leave-management-system
2. Install required packages:
npm install

5. Setting Up Database Files
Update the CSV files ( employee.csv and request.csv ) in the src/server/database directory.
Example Formats
employee.csv
SAPID,name,password,role 12345678,John Doe,password123,employee 87654321,Jane
Smith,password456,admin
request.csv
ID,type,from,to,takenOn,SAPID,reason,cancel 1,Full Day,2023-01-01,2023-01-01,2023-01-
01,12345678,Personal,0 2,Half Day,2023-01-02,2023-01-02,2023-01-02,87654321,Medical,0
Ensure correct formatting for smooth data import.

6. Data Import Script
Run the script to populate MongoDB with CSV data:
npm run import-data
This will transfer data from employee.csv and request.csv into MongoDB collections.

7. Running the Application
Development Mode
1. Create a .env file in the root directory.
2. Add the following variables:
MONGODB_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>

- Replace `<your_mongodb_connection_string>` with your MongoDB URI.
- Replace `<your_jwt_secret>` with a secure JWT secret key.

1. Start the application in development mode:
npm run dev
2. Open http://localhost:3000 in your browser.

Production Mode
1. Build the application:
npm run build
2. Start the production server:
npm start
3. Access the application at http://localhost:3000.

package-lock.json
├── package.json
├── pages
│   ├── admin
│   │   ├── adminpage.jsx
│   │   └── attendanceOverview.jsx
│   ├── login.jsx
│   ├── loginForm.jsx
│   └── user
│       ├── history.jsx
│       └── userpage.jsx
├── public
│   ├── attendance-overview-icon-active.svg
│   ├── attendance-overview-icon.svg
│   ├── comp-off-icon.svg
│   ├── dashboard-icon-active.svg
│   ├── dashboard-icon.svg
│   ├── employees-icon.svg
│   ├── file.svg
│   ├── full-leave-icon.svg
│   ├── globe.svg
│   ├── half-leave-icon.svg
│   ├── hcl-logo.png
│   ├── history-icon-active.svg
│   ├── history-icon.svg
│   ├── logOut.svg
│   ├── next.svg
│   ├── profile.png
│   ├── rh-icon.svg
│   ├── separator.svg
│   ├── vercel.svg
│   └── window.svg
├── server
│   ├── apis
│   │   └── user
│   │       ├── controllers
│   │       │   ├── calendarController.js
│   │       │   ├── historyController.js
│   │       │   ├── leavecontroller.js
│   │       │   ├── requestbuttonController.js
│   │       │   ├── tableController.js
│   │       │   └── userpageTableController.js
│   │       └── routes
│   │           ├── calendar.js
│   │           ├── history.js
│   │           ├── leave.js
│   │           ├── requestbutton.js
│   │           ├── table.js
│   │           └── userpageTable.js
│   ├── database
│   │   ├── employee.csv
│   │   ├── employee.jsonl
│   │   ├── request.csv
│   │   └── request.jsonl
│   ├── importData.js
│   ├── index.js
│   └── models
│       ├── Employee.js
│       └── LeaveRequest.js
└── src
    ├── app
    │   ├── favicon.ico
    │   ├── fonts
    │   │   ├── GeistMonoVF.woff
    │   │   └── GeistVF.woff
    │   ├── globals.css
    │   ├── layout.js
    │   ├── page.js
    │   └── page.module.css
    ├── components
    │   ├── BootstrapClient.js
    │   ├── TopNavBar.jsx
    │   ├── admin
    │   │   ├── Card.jsx
    │   │   └── SideNavBar.jsx
    │   └── user
    │       ├── LeaveCard.jsx
    │       ├── LeaveCardGrid.jsx
    │       ├── LeaveRequestsTable.jsx
    │       ├── Pagination.jsx
    │       └── SideNavBar.jsx
    ├── config
    │   └── config.js
    ├── styles
    │   ├── Home.module.css
    │   ├── TopNavBar.module.css
    │   ├── admin
    │   │   ├── SideNavBar.module.css
    │   │   ├── index.module.css
    │   │   └── overview.module.css
    │   └── user
    │       ├── LeaveCard.module.css
    │       ├── LeaveCardGrid.module.css
    │       ├── LeaveRequestsTable.module.css
    │       ├── Pagination.module.css
    │       ├── SideNavBar.module.css
    │       ├── history.module.css
    │       └── userpage.module.css
    └── utils
        ├── Exportexcel.js
        ├── axios.js
        └── dateFormatter.js
