<h1>Restful Booker - Playwright Automation</h1>

<p>Automation project developed as part of a technical assessment for SQA Technology.</p>

<p>The purpose of this project is to implement API and UI automated tests using Playwright and TypeScript, applying reusable components, Page Object Model, test fixtures, dynamic test data and parallel execution.</p>

<h2>1. Technologies</h2>

<ul>
  <li>Node.js</li>
  <li>TypeScript</li>
  <li>Playwright Test</li>
  <li>REST API Testing</li>
  <li>Page Object Model (POM)</li>
  <li>Playwright Fixtures</li>
  <li>HTML Reporter</li>
  <li>dotenv</li>
</ul>

<h2>2. Project Structure</h2>

<pre>
restful-booker-automation/
|
|-- docs/
|   |-- aplicacion-skills.md
|   |-- diagnostico-skill.md
|
|-- scripts/
|   |-- validate-booking-data.ts
|
|-- skills/
|   |-- api-contract-validator/
|   |   |-- SKILL.md
|   |-- failure-analyzer/
|   |   |-- SKILL.md
|   |-- playwright-test-implementer/
|   |   |-- SKILL.md
|   |-- test-data-management/
|       |-- SKILL.md
|
|-- src/
|   |-- api/
|   |   |-- clients/
|   |   |-- models/
|   |-- config/
|   |-- data/
|   |-- fixtures/
|   |-- pages/
|   |-- utils/
|
|-- tests/
|   |-- api/
|   |-- ui/
|
|-- SKILL.md
|-- playwright.config.ts
|-- package.json
|-- package-lock.json
|-- tsconfig.json
|-- .env.example
</pre>

<h2>3. Installation</h2>

<h3>Prerequisites</h3>

<ul>
  <li>Node.js</li>
  <li>npm</li>
  <li>Git</li>
</ul>

<p>Clone the repository:</p>

<pre>
git clone https://github.com/hmalave17/restful-booker-playwright-automation.git
</pre>

<p>Navigate to the project directory:</p>

<pre>
cd restful-booker-playwright-automation
</pre>

<p>Install dependencies:</p>

<pre>
npm ci
</pre>

<p>Install Playwright browsers:</p>

<pre>
npx playwright install
</pre>

<h2>4. Environment Configuration</h2>

<p>The project uses environment variables to configure the application URL and API authentication.</p>

<p>Create a local environment file using the example provided:</p>

<pre>
Copy-Item .env.example .env
</pre>

<p>Configure the following variables in the .env file:</p>

<pre>
BASE_URL=https://automationintesting.online
API_USERNAME=admin
API_PASSWORD=password
</pre>

<p>Environment variables are loaded through dotenv and centralized in:</p>

<pre>
src/config/environment.ts
</pre>

<p>The application validates the required variables during initialization and throws an error when a required value is missing.</p>

<p><b>Note:</b> The .env file is excluded from Git. Do not commit credentials or sensitive configuration.</p>

<h2>5. Test Architecture</h2>

<h3>5.1 API Automation</h3>

<p>API automation is organized using independent clients for each resource.</p>

<ul>
  <li>AuthApiClient: authentication operations.</li>
  <li>RoomApiClient: room operations.</li>
  <li>BookingApiClient: booking operations.</li>
</ul>

<p>Request and response models are maintained separately under src/api/models.</p>

<p>Fixtures provide reusable API clients and authentication setup.</p>

<h4>Positive Scenarios</h4>

<p>File: tests/api/booking-create.spec.ts</p>

<ol>
  <li>Generate a unique room description.</li>
  <li>Create a room using the real API.</li>
  <li>Retrieve the created room and validate its information.</li>
  <li>Generate booking data using the real room ID.</li>
  <li>Create a booking using the real API.</li>
  <li>Retrieve bookings associated with the room.</li>
  <li>Validate the booking ID and persisted information.</li>
</ol>

<h4>Negative Scenarios</h4>

<p>File: tests/api/booking-negative.spec.ts</p>

<ol>
  <li>Create a room using the real API.</li>
  <li>Retrieve the generated room ID.</li>
  <li>Generate valid booking information.</li>
  <li>Remove the mandatory check-in date.</li>
  <li>Attempt to create the invalid booking.</li>
  <li>Verify that the API returns an HTTP error.</li>
  <li>Verify that the invalid booking was not persisted.</li>
</ol>

<p>Both API scenarios interact with the real backend.</p>

<h3>5.2 UI Automation</h3>

<p>File: tests/ui/booking-ui-mocked.spec.ts</p>

<p>The UI scenario uses the actual application interface and Playwright network interception capabilities.</p>

<p>The test covers:</p>

<ul>
  <li>Navigation to the reservation page.</li>
  <li>Room information validation.</li>
  <li>Opening the reservation form.</li>
  <li>Filling guest information.</li>
  <li>Validating the entered information.</li>
  <li>Submitting the reservation.</li>
  <li>Validating the confirmation displayed by the application.</li>
  <li>Capturing and validating the booking request payload.</li>
</ul>

<p>The following backend requests are intercepted:</p>

<ul>
  <li>GET /api/room/{roomId}</li>
  <li>GET /api/report/room/{roomId}</li>
  <li>POST /api/booking</li>
</ul>

<p>Mocked responses are provided using route.fulfill().</p>

<p><b>Technical decision:</b> The UI test uses a mocked backend to isolate frontend behavior and validate the outgoing booking request independently of backend availability.</p>

<p>This scenario validates the frontend flow and request payload, but it does not verify actual booking persistence in the backend. Backend persistence is validated separately through API tests.</p>

<h2>6. Running Tests</h2>

<p>The following npm scripts are available:</p>

<h3>Run all tests</h3>

<pre>
npm test
</pre>

<h3>Run API tests</h3>

<pre>
npm run test:api
</pre>

<h3>Run UI tests</h3>

<pre>
npm run test:ui
</pre>

<h3>Run tests using two workers</h3>

<pre>
npm run test:parallel
</pre>

<h3>Run a specific test file</h3>

<pre>
npx playwright test tests/api/booking-create.spec.ts
</pre>

<h2>7. Playwright Configuration</h2>

<p>The main configuration is located in playwright.config.ts.</p>

<p>Current configuration:</p>

<ul>
  <li>Test directory: ./tests</li>
  <li>Parallel execution: enabled</li>
  <li>Workers: 2</li>
  <li>Test timeout: 30 seconds</li>
  <li>Expect timeout: 5 seconds</li>
  <li>HTML reporter: enabled</li>
  <li>Screenshot: only on failure</li>
  <li>Video: retained on failure</li>
  <li>Trace: retained on failure</li>
  <li>CI retries: 1</li>
</ul>

<p>Parallel execution is configured using:</p>

<pre>
fullyParallel: true,
workers: 2
</pre>

<p>Unique identifiers are generated when necessary to reduce conflicts between parallel test executions.</p>

<h2>8. Reports and Test Evidence</h2>

<p>Playwright generates HTML reports and execution artifacts.</p>

<p>Open the HTML report:</p>

<pre>
npm run report
</pre>

<p>Open a trace:</p>

<pre>
npx playwright show-trace test-results/&lt;test-folder&gt;/trace.zip
</pre>

<p>The UI test also attaches additional evidence to the Playwright report:</p>

<ul>
  <li>booking-payload.json</li>
  <li>mocked-backend-evidence.txt</li>
  <li>Reservation confirmation screenshot.</li>
</ul>

<p>Generated reports and test results are stored in:</p>

<ul>
  <li>playwright-report/</li>
  <li>test-results/</li>
</ul>

<p>These directories are excluded from Git through .gitignore.</p>

<h2>9. Skills and AI-Assisted Development</h2>

<p>The project includes a main skill and four specialized skills created to support test automation development and maintenance.</p>

<h3>Main Skill</h3>

<p><b>SKILL.md</b></p>

<p>Defines the project architecture, coding conventions, testing strategy, execution guidelines and instructions for AI-assisted development.</p>

<h3>Specialized Skills</h3>

<ul>
  <li><b>API Contract Validator:</b> Reviews API request and response structures, expected status codes and data types.</li>
  <li><b>Failure Analyzer:</b> Helps investigate automation failures using error messages, HTTP responses and execution evidence.</li>
  <li><b>Playwright Test Implementer:</b> Provides guidelines for implementing and maintaining Playwright tests.</li>
  <li><b>Test Data Management:</b> Defines practices for generating, organizing and reusing test data.</li>
</ul>

<p>Additional documentation:</p>

<ul>
  <li>docs/aplicacion-skills.md: documents how the skills were applied during the project.</li>
  <li>docs/diagnostico-skill.md: contains the skill diagnostic documentation.</li>
</ul>

<p>The objective is to use these skills as reusable instructions to improve consistency and support development activities with AI tools.</p>

<h2>10. Test Data Management</h2>

<p>Test data is maintained separately from test implementation.</p>

<p>The project uses:</p>

<ul>
  <li>Centralized booking datasets.</li>
  <li>Room test data.</li>
  <li>Dynamic booking data generation.</li>
  <li>Unique identifiers for room creation.</li>
  <li>Reusable data factories.</li>
</ul>

<p>This approach helps reduce duplicated data and avoid conflicts during parallel execution.</p>

<h2>11. Design Considerations</h2>

<ul>
  <li>API clients are separated by resource.</li>
  <li>Request and response models are maintained independently.</li>
  <li>Fixtures are used to share reusable dependencies.</li>
  <li>Page Object Model is used for UI interactions.</li>
  <li>Environment configuration is centralized.</li>
  <li>Dynamic test data is generated when necessary.</li>
  <li>API and UI testing responsibilities remain separated.</li>
  <li>UI mocks are intentionally maintained to isolate frontend behavior.</li>
</ul>

<h2>12. Future Improvements</h2>

<p>Potential improvements for future iterations include:</p>

<ul>
  <li>Expanding API negative test coverage.</li>
  <li>Adding more UI scenarios.</li>
  <li>Improving test data cleanup.</li>
  <li>Adding CI pipeline integration.</li>
  <li>Extending API contract validations.</li>
  <li>Improving test execution and reporting.</li>
</ul>

<h2>13. Final Notes</h2>

<p>This project was developed as a technical assessment to demonstrate practical automation testing skills using Playwright and TypeScript.</p>

<p>The implementation focuses on maintainability, reusable components, API and UI testing, parallel execution and the use of AI-assisted skills during the development process.</p>

<p><b>Project:</b> Restful Booker - Playwright Automation</p>
<p><b>Assessment:</b> SQA Technology</p>
<p><b>Testing Framework:</b> Playwright Test</p>
<p><b>Language:</b> TypeScript</p>
