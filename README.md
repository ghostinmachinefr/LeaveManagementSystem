Leave Management System using NextJS, Node.JS, Express.JS, MongoDB and CSS


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