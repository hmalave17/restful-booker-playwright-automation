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

<h2>3. Installation and Environment Setup</h2>

<h3>3.1 Prerequisites</h3>

<p>Make sure the following tools are installed:</p>

<ul>
  <li>Node.js (LTS version recommended).</li>
  <li>npm (included with Node.js).</li>
  <li>Git.</li>
</ul>

<p>Verify the installations using:</p>

<pre><code>node --version
npm --version
git --version</code></pre>

<h3>3.2 Clone the repository</h3>

<p>Open a terminal and clone the repository:</p>

<pre><code>git clone https://github.com/hmalave17/restful-booker-playwright-automation.git</code></pre>

<p>Navigate to the project directory:</p>

<pre><code>cd restful-booker-playwright-automation</code></pre>

<h3>3.3 Install dependencies</h3>

<p>Install the project dependencies using the package-lock.json file:</p>

<pre><code>npm ci</code></pre>

<p>Install the browser binaries required by Playwright:</p>

<pre><code>npx playwright install</code></pre>

<p>These commands install the project dependencies and the browser binaries required to execute the automated tests.</p>

<h3>3.4 Environment Variables Configuration</h3>

<p>The project uses environment variables to configure the application and API connection.</p>

<p>First, create your local environment configuration file from the provided template.</p>

<h4>Windows PowerShell</h4>

<pre><code>Copy-Item .env.example .env</code></pre>

<h4>Linux / macOS</h4>

<pre><code>cp .env.example .env</code></pre>

<p>Once the file has been created, configure the following variables:</p>

<pre><code>BASE_URL=https://automationintesting.online
API_USERNAME=admin
API_PASSWORD=password</code></pre>

<h4>Option 1: Using your preferred IDE or text editor</h4>

<ol>
  <li>Open the project folder in your preferred IDE or text editor (Visual Studio Code, IntelliJ IDEA, WebStorm, Notepad, etc.).</li>
  <li>Locate and open the <code>.env</code> file in the project root directory.</li>
  <li>Add or update the variables using the values shown above.</li>
  <li>Save the file.</li>
</ol>

<h4>Option 2: Using Windows PowerShell</h4>

<p>From the project root directory, run the following command:</p>

<pre><code>@"
BASE_URL=https://automationintesting.online
API_USERNAME=admin
API_PASSWORD=password
"@ | Set-Content -Encoding ascii .env</code></pre>

<p>This command creates or overwrites the <code>.env</code> file with the required configuration.</p>

<h4>Environment Variables Description</h4>

<table>
  <thead>
    <tr>
      <th>Variable</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>BASE_URL</code></td>
      <td>Base URL of the application and API.</td>
    </tr>
    <tr>
      <td><code>API_USERNAME</code></td>
      <td>Username used for API authentication.</td>
    </tr>
    <tr>
      <td><code>API_PASSWORD</code></td>
      <td>Password used for API authentication.</td>
    </tr>
  </tbody>
</table>

<h4>Important Notes</h4>

<ul>
  <li>Keep each variable on a separate line using the <code>KEY=VALUE</code> format.</li>
  <li>Do not add brackets or quotation marks around the values.</li>
  <li>The project loads these variables through <code>dotenv</code> and <code>src/config/environment.ts</code>.</li>
  <li>The <code>.env</code> file is excluded from Git to prevent credentials from being committed.</li>
  <li>Never commit real credentials or sensitive environment configuration to the repository.</li>
  <li>The PowerShell command overwrites the existing <code>.env</code> file, if present.</li>
</ul>

<h2>4. Running Tests</h2>

<p>Once the repository has been cloned, dependencies installed, Playwright browsers installed and environment variables configured, the project is ready for test execution.</p>

<p>The following npm scripts are available from the project root directory:</p>

<h3>4.1 Run all tests</h3>

<pre><code>npm test</code></pre>

<h3>4.2 Run API tests</h3>

<pre><code>npm run test:api</code></pre>

<h3>4.3 Run UI tests</h3>

<pre><code>npm run test:ui</code></pre>

<h3>4.4 Run tests using two workers</h3>

<pre><code>npm run test:parallel</code></pre>

<h3>4.5 Run a specific test file</h3>

<p>Example:</p>

<pre><code>npx playwright test tests/api/booking-create.spec.ts</code></pre>

<h3>4.6 TypeScript validation</h3>

<p>To validate TypeScript compilation without executing the tests:</p>

<pre><code>npx tsc --noEmit</code></pre>

<p><b>Platform compatibility:</b> The npm and npx commands documented in this section can be executed on Windows, Linux and macOS, provided Node.js and the required dependencies are installed.</p>

<h2>5. Test Architecture</h2>

<h3>5.1 API Automation</h3>

<p>API automation is organized using independent clients for each resource.</p>

<ul>
  <li>AuthApiClient: authentication operations.</li>
  <li>RoomApiClient: room operations.</li>
  <li>BookingApiClient: booking operations.</li>
</ul>

<p>Request and response models are maintained separately under <code>src/api/models</code>.</p>

<p>Fixtures provide reusable API clients and authentication setup.</p>

<h4>Positive Scenarios</h4>

<p>File: <code>tests/api/booking-create.spec.ts</code></p>

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

<p>File: <code>tests/api/booking-negative.spec.ts</code></p>

<ol>
  <li>Create a room using the real API.</li>
  <li>Retrieve the generated room ID.</li>
  <li>Generate valid booking information.</li>
  <li>Remove the mandatory check-in date.</li>
  <li>Attempt to create the invalid booking.</li>
  <li>Verify that the API returns an HTTP error.</li>
  <li>Verify that the invalid booking was not persisted.</li>
</ol>

<p>Both API test suites interact with the real backend.</p>

<h3>5.2 UI Automation</h3>

<p>File: <code>tests/ui/booking-ui-mocked.spec.ts</code></p>

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
  <li><code>GET /api/room/{roomId}</code></li>
  <li><code>GET /api/report/room/{roomId}</code></li>
  <li><code>POST /api/booking</code></li>
</ul>

<p>Mocked responses are provided using <code>route.fulfill()</code>.</p>

<p><b>Technical decision:</b> The UI test uses a mocked backend to isolate frontend behavior and validate the outgoing booking request independently of backend availability.</p>

<p>This scenario validates the frontend flow and request payload, but it does not verify actual booking persistence in the backend. Backend persistence is validated separately through API tests.</p>

<h2>6. Playwright Configuration</h2>

<p>The main configuration is located in <code>playwright.config.ts</code>.</p>

<p>Current configuration:</p>

<ul>
  <li>Test directory: <code>./tests</code></li>
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

<pre><code>fullyParallel: true,
workers: 2</code></pre>

<p>Unique identifiers are generated when necessary to reduce conflicts between parallel test executions.</p>

<h2>7. Reports and Test Evidence</h2>

<p>Playwright generates HTML reports and execution artifacts.</p>

<p>Open the HTML report:</p>

<pre><code>npm run report</code></pre>

<p>View an execution trace:</p>

<pre><code>npx playwright show-trace test-results/&lt;test-folder&gt;/trace.zip</code></pre>

<p>The UI test also attaches additional evidence to the Playwright report:</p>

<ul>
  <li><code>booking-payload.json</code></li>
  <li><code>mocked-backend-evidence.txt</code></li>
  <li>Reservation confirmation screenshot.</li>
</ul>

<p>Generated reports and test results are stored in:</p>

<ul>
  <li><code>playwright-report/</code></li>
  <li><code>test-results/</code></li>
</ul>

<p>These directories are excluded from Git through <code>.gitignore</code>.</p>

<h2>8. Skills and AI-Assisted Development</h2>

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
  <li><code>docs/aplicacion-skills.md</code>: documents how the skills were applied during the project.</li>
  <li><code>docs/diagnostico-skill.md</code>: contains the skill diagnostic documentation.</li>
</ul>

<p>The objective is to use these skills as reusable instructions to improve consistency and support development activities with AI tools.</p>

<h2>9. Test Data Management</h2>

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

<h2>10. Design Considerations</h2>

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

<h2>11. Future Improvements</h2>

<p>Potential improvements for future iterations include:</p>

<ul>
  <li>Expanding API negative test coverage.</li>
  <li>Adding more UI scenarios.</li>
  <li>Improving test data cleanup.</li>
  <li>Adding CI pipeline integration.</li>
  <li>Extending API contract validations.</li>
  <li>Improving test execution and reporting.</li>
</ul>

<h2>12. Final Notes</h2>

<p>This project was developed as a technical assessment to demonstrate practical automation testing skills using Playwright and TypeScript.</p>

<p>The implementation focuses on maintainability, reusable components, API and UI testing, parallel execution and the use of AI-assisted skills during the development process.</p>

<p><b>Project:</b> Restful Booker - Playwright Automation</p>
<p><b>Assessment:</b> SQA Technology</p>
<p><b>Testing Framework:</b> Playwright Test</p>
<p><b>Language:</b> TypeScript</p>