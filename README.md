EzyMetrics Dashboard
A responsive dashboard for managing sales, leads, analytics visualizations, and report generation using React, Ant Design, and Chart.js. The application provides customizable widgets and supports export functionality in CSV and PDF formats.

Features
Sidebar Navigation: Allows navigation to different sections like Dashboard, Leads, Analytics, and Reports.
Dynamic Widgets: Users can select and display various widgets such as sales charts, lead overviews, and revenue graphs.
Lead Management: View and manage leads with detailed information.
Analytics Visualizations: Visualize data using different chart types (Line, Bar, Pie) powered by Chart.js.
Report Generation: Export lead data into PDF and CSV formats with a single click.
Tech Stack
React: Frontend framework for building the UI.
Ant Design: UI components for consistent and responsive design.
Chart.js: For creating various types of charts (Line, Bar, Pie).
jsPDF: For generating downloadable PDF reports.
react-csv: For exporting CSV files.

Installation
1.Clone the repository:
(git clone https://github.com/your-username/ezymetrics-dashboard.git)

2.Navigate to the project directory:
(cd ezymetrics-dashboard)

3.Install the required dependencies:
(npm install)

4.Start the development server:
(npm start)

5.Open your browser and go to:
(http://localhost:3000)

Project Structure

├── src
│   ├── components
│   │   ├── Dashboard.js   # Main dashboard component
│   │   └── Sidebar.js     # Sidebar navigation
│   ├── assets             # Static assets like images, icons
│   ├── App.js             # Main app entry
│   └── index.js           # Entry point for React
├── public                 # Public folder
├── README.md              # Project documentation
└── package.json           # Project configuration and dependencies



Usage
Sidebar Navigation: Use the sidebar to navigate between different sections of the dashboard.

Customizable Widgets: Select widgets from the dropdown to customize the dashboard view.

Lead Management: View lead data and click on individual leads for detailed information.

Report Generation:

To generate a PDF report, go to the Reports section and click on the Generate PDF button.
To download the data in CSV format, click the Download CSV button.

License
This project is licensed under the MIT License - see the LICENSE file for details.






