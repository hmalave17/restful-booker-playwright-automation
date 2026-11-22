<h1>Failure Analyzer</h1>

<h2>1. Objetivo</h2>

<p>Esta skill proporciona una guía para analizar fallos durante la ejecución de pruebas automatizadas en Restful Booker.</p>

<h2>2. Responsabilidades</h2>

<ul>
  <li>Analizar mensajes de error de Playwright.</li>
  <li>Identificar fallos relacionados con HTTP.</li>
  <li>Revisar request y response de las operaciones API.</li>
  <li>Analizar traces y evidencias de ejecución.</li>
  <li>Identificar problemas de datos de prueba.</li>
  <li>Detectar posibles conflictos entre workers.</li>
  <li>Proponer correcciones basadas en evidencias.</li>
</ul>

<h2>3. Procedimiento de diagnóstico</h2>

<ol>
  <li>Identificar el escenario que presenta el fallo.</li>
  <li>Revisar el mensaje de error completo.</li>
  <li>Identificar el endpoint y método HTTP involucrados.</li>
  <li>Inspeccionar el request y response cuando corresponda.</li>
  <li>Revisar los datos utilizados por el escenario.</li>
  <li>Consultar el trace de Playwright si está disponible.</li>
  <li>Determinar si el problema está en la automatización, los datos o el backend.</li>
  <li>Proponer una corrección y justificarla.</li>
  <li>Ejecutar nuevamente las pruebas afectadas.</li>
</ol>

<h2>4. Herramientas de diagnóstico</h2>

<ul>
  <li>Playwright HTML Reporter.</li>
  <li>Playwright Trace Viewer.</li>
  <li>Mensajes de consola.</li>
  <li>Logs de peticiones HTTP.</li>
  <li>Capturas de pantalla.</li>
  <li>PowerShell para consultar archivos y resultados.</li>
</ul>

<h2>5. Buenas prácticas</h2>

<ul>
  <li>No modificar código sin identificar primero la causa del fallo.</li>
  <li>No ocultar errores mediante esperas fijas o reintentos innecesarios.</li>
  <li>Diferenciar errores funcionales de problemas de infraestructura.</li>
  <li>Conservar las evidencias de ejecución.</li>
  <li>Evitar cambios que afecten escenarios que ya funcionan.</li>
  <li>Verificar que las correcciones no generen dependencias entre pruebas.</li>
</ul>

<h2>6. Comandos de referencia</h2>

<pre>
npx playwright test
npx playwright show-report
npx playwright show-trace test-results/&lt;test-folder&gt;/trace.zip
</pre>

<h2>7. Resultado esperado</h2>

<p>El diagnóstico debe identificar la causa probable del fallo, presentar evidencias y proponer una solución que mantenga la estabilidad de la automatización.</p>

<h2>8. Consideraciones</h2>

<p>Esta skill complementa la skill principal y no reemplaza los mecanismos de reporte ni las herramientas de diagnóstico de Playwright.</p>
