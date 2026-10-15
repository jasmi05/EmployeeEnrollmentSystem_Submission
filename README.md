#### &#x20;Employee Enrollment System:

###### 

###### &#x20;1. Project Overview

###### 

###### The Employee Enrollment System is a responsive web application developed to simplify employee enrollment and employee record management. It allows authorized users to register employees, view and search employee records, update employee information, and manage employee status.

###### 

###### &#x20;2. Technology Stack

###### 

* ###### Frontend: React.js, JavaScript, Tailwind CSS
* ###### Backend: Java, Spring Boot
* ###### Database: MySQL
* ###### API Testing: Postman and Thunder Client
* ###### Frontend Development: Visual Studio Code
* ###### Backend Development: Eclipse IDE
* ###### Database Management: MySQL Workbench
* ###### Frontend Deployment: Vercel
* ###### Backend Deployment: Railway
* ###### Version Control: Git,Github

###### 

###### &#x20;3. Features

###### 

###### &#x20;   Authentication and Access

* ###### User login and logout.
* ###### Access to employee management pages for authorized users.

###### 

###### &#x20;   Employee Enrollment

* ###### Employee enrollment form with required-field validation.
* ###### Employee ID generation and uniqueness checks.
* ###### Employee information fields:

###### &#x20; - Full name

###### &#x20; - Email address

###### &#x20; - Phone number

###### &#x20; - Date of birth

###### &#x20; - Address

###### &#x20; - Department

###### &#x20; - Job title

###### &#x20; - Joining date

###### &#x20; - Employment type

###### &#x20; - Emergency contact

* ###### Validation of required fields and supported input formats.
* ###### Duplicate employee ID and email handling.

###### 

###### &#x20;   Employee Record Management

* ###### View employee records.
* ###### Search employee records.
* ###### Pagination of employee records.
* ###### Open and view individual employee details.
* ###### Edit existing employee information.
* ###### Change employee status between Active and Inactive.
* ###### Retain inactive employee records instead of permanently deleting them.

###### 

###### &#x20;   Dashboard and Reporting

* ###### Dashboard displaying employee statistics.
* ###### Employee totals and status-based counts.
* ###### CSV export of employee records.

###### 

###### &#x20;   User Interface

* ###### Responsive interface for desktop and mobile devices.
* ###### Form validation messages.
* ###### Success and error feedback for supported operations.
* ###### Integration between the React frontend, Spring Boot backend, and MySQL database.

###### 

###### &#x20;4. Project Structure

###### 

###### &#x20;   EmployeeEnrollmentSystem\_Submission/

###### &#x20;   ├── frontend/

###### &#x20;   ├── backend/

###### &#x20;   ├── database/

###### &#x20;   └── README.md

###### 

* ###### frontend/ contains the React application and configuration files.
* ###### backend/ contains the Spring Boot application, Java source code, Maven configuration, and application properties.
* ###### database/ contains the exported MySQL database files.
* ###### README.md contains project documentation and setup instructions.

###### 

###### &#x20;5. Prerequisites

###### 

###### Install the following software before running the application:

###### 

* ###### Node.js and npm
* ###### Java Development Kit (JDK)
* ###### Eclipse IDE or another compatible Java IDE
* ###### MySQL Server
* ###### MySQL Workbench
* ###### Visual Studio Code or another code editor

###### 

###### &#x20;6. Database Setup

###### 

###### 1\. Start MySQL Server.

###### 2\. Open MySQL Workbench and connect to your local MySQL instance.

###### 3\. Import the database files provided in the database folder.

###### 4\. If the files are in MySQL Workbench dump-project format, use \*\*Server → Data Import → Import from Dump Project Folder\*\*.

###### 5\. Verify that the `employee` database and required tables are available.

###### 6\. Configure the database connection before starting the backend.

###### 

###### &#x20;Database name: employee

###### 

###### Use sample employee records for testing and demonstration. Do not include real or sensitive employee information in the submission.

###### 

###### &#x20;7. Backend Setup and Execution

###### 

###### 1\. Open Eclipse.

###### 2\. Import the `backend` folder as an existing Maven project.

###### 3\. Ensure that MySQL Server is running and the database is configured.

###### 4\. Configure the database connection in src/main/resources/application.properties.

###### 5\. Set the required environment variables.

###### 6\. Run the Spring Boot application and check the Eclipse console for startup or database connection errors.

###### 

###### &#x20;  Database Configuration

###### 

###### Database credentials should be provided through environment variables rather than exposed in source code.

###### 

###### &#x20;   DB\_URL=jdbc:mysql://localhost:3306/employee

###### &#x20;   DB\_USERNAME=your\_mysql\_username

###### &#x20;   DB\_PASSWORD=your\_mysql\_password

###### 

###### Replace the example values with your own database credentials. 

###### Do not include real database passwords in this README or in the submitted source code.

###### 

###### Backend local URL: http://localhost:8080

###### 

###### &#x20;8. Frontend Setup and Execution

###### 

###### 1\. Open the frontend folder in Visual Studio Code.

###### 2\. Open a terminal inside that folder.

###### 3\. Install the required dependencies:

###### 

###### &#x20;  npm install

###### 

###### 4\. Start the Vite development server:

###### 

###### &#x20;  npm run dev

###### 

###### 5\. Open the local URL displayed in the terminal.

###### 

###### The frontend is configured to use port 5176.

###### 

###### Frontend local URL: http://localhost:5176

###### 

###### If Vite selects a different port, use the URL displayed in the terminal.

###### 

###### &#x20;9. API Testing

###### 

###### Postman or Thunder Client can be used to test the backend REST APIs.

###### 

###### 1\. Start the Spring Boot backend.

###### 2\. Send requests to the API endpoints implemented in the application.

###### 3\. Verify response status codes and returned data.

###### 4\. Test employee creation, listing, viewing, updating, status changes, and authentication.

###### 

###### &#x20;10. Security

###### 

* ###### Keep database credentials private and out of GitHub.
* ###### Use environment variables for database configuration.
* ###### Use sample accounts and non-sensitive employee data for demonstrations.
* ###### Validate user inputs on both the frontend and backend.
* ###### Restrict protected operations to authorized users according to the implemented authentication and authorization configuration.
* ###### Avoid logging or publishing sensitive employee information.

###### 

###### &#x20;11. Known Limitations and Future Enhancements

###### 

###### &#x20;   Employee Document Upload

###### 

###### Document upload is deferred in the current MVP, as permitted by the project requirements when time or hosting limitations prevent safe file storage.

###### 

###### Future enhancements may include:

###### 

###### \- Optional PDF, JPG, and PNG uploads.

###### \- File type and size validation.

###### \- Secure document storage associated with employee records.

###### \- Appropriate access controls for uploaded documents.

###### 

###### &#x20;12. Deployment

###### Live Deployment :-
* ###### Frontend : https://employee-enrollment-system-submissi.vercel.app/
* ###### Backend : https://employeeenrollmentsystemsubmission-production.up.railway.app

###### Local Deployment :-
* ###### Frontend: http://localhost:5176
* ###### Backend: http://localhost:8080
* ###### Database: MySQL

###### The frontend is deployed on Vercel, and the Spring Boot backend is deployed on Railway. The deployed backend connects to the Railway MySQL database.
###### For local development, configure the backend to connect to your local MySQL instance and run the frontend and backend separately.

######

###### &#x20;13. Author

###### 

###### Jasmine Nayak 

