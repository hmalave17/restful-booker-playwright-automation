<h1>Playwright Test Implementer</h1>
<h2>1. Objetivo</h2>
<p>Esta skill sirve como guÃ­a para implementar y mantener pruebas automatizadas utilizando Playwright y TypeScript en el proyecto Restful Booker.</p>
<p>La idea es que un asistente de IA pueda ayudarnos a crear nuevos escenarios, mejorar pruebas existentes y corregir problemas, respetando la arquitectura que ya tenemos.</p>
<h2>2. Entradas necesarias</h2>
<p>Antes de comenzar una implementaciÃ³n se debe identificar:</p>
<ul>
&#x20; <li>DescripciÃ³n del escenario que se necesita automatizar.</li>
&#x20; <li>Tipo de prueba: API, UI o integraciÃ³n.</li>
&#x20; <li>Comportamiento esperado.</li>
&#x20; <li>Datos necesarios para ejecutar el escenario.</li>
&#x20; <li>Endpoint o pÃ¡gina involucrada, cuando aplique.</li>
&#x20; <li>Restricciones o condiciones especiales del requerimiento.</li>
</ul>
<p>Si falta informaciÃ³n importante, se debe revisar primero el proyecto. Si no es posible confirmar el comportamiento esperado, se debe preguntar antes de inventar una soluciÃ³n.</p>
<h2>3. InspecciÃ³n inicial del proyecto</h2>
<p>Antes de escribir cÃ³digo se deben realizar las siguientes actividades:</p>
<ol>
&#x20; <li>Revisar la estructura de carpetas.</li>
&#x20; <li>Identificar pruebas relacionadas con el escenario.</li>
&#x20; <li>Revisar los API Clients existentes.</li>
&#x20; <li>Revisar los modelos e interfaces TypeScript.</li>
&#x20; <li>Identificar las fixtures disponibles.</li>
&#x20; <li>Revisar los Page Objects cuando se trate de pruebas UI.</li>
&#x20; <li>Verificar los comandos y configuraciones de Playwright.</li>
</ol>
<p>No se deben crear clases o mÃ©todos nuevos sin comprobar primero si ya existe una implementaciÃ³n reutilizable.</p>
<h2>4. Procedimiento de implementaciÃ³n</h2>
<h3>4.1 Identificar el escenario</h3>
<p>Entender quÃ© acciÃ³n se quiere probar, quÃ© datos necesita y cuÃ¡les son los resultados esperados.</p>
<p>Separar las acciones de preparaciÃ³n, ejecuciÃ³n y validaciÃ³n.</p>
<h3>4.2 ImplementaciÃ³n API</h3>
<ul>
&#x20; <li>Utilizar los API Clients existentes.</li>
&#x20; <li>Reutilizar AuthApiClient cuando se necesite autenticaciÃ³n.</li>
&#x20; <li>Utilizar los modelos TypeScript existentes.</li>
&#x20; <li>Validar cÃ³digos HTTP y contenido de las respuestas.</li>
&#x20; <li>Validar los campos importantes del contrato.</li>
&#x20; <li>Evitar realizar llamadas HTTP directamente desde los archivos de prueba cuando exista un cliente que pueda reutilizarse.</li>
</ul>
<h3>4.3 ImplementaciÃ³n UI</h3>
<ul>
&#x20; <li>Utilizar Page Object Model para separar las interacciones de la lÃ³gica de las pruebas.</li>
&#x20; <li>Revisar los Page Objects existentes antes de crear otros.</li>
&#x20; <li>Utilizar locators estables y preferiblemente orientados a roles, etiquetas o atributos de prueba.</li>
&#x20; <li>Evitar selectores frÃ¡giles cuando existan alternativas mÃ¡s estables.</li>
&#x20; <li>Utilizar las esperas automÃ¡ticas de Playwright.</li>
&#x20; <li>No utilizar esperas fijas con page.waitForTimeout() como soluciÃ³n habitual.</li>
&#x20; <li>Validar tanto las interacciones como los resultados visibles.</li>
</ul>
<h3>4.4 Uso de fixtures</h3>
<p>Las fixtures deben utilizarse para compartir dependencias y preparar los elementos necesarios para las pruebas.</p>
<ul>
&#x20; <li>Reutilizar las fixtures existentes.</li>
&#x20; <li>Evitar repetir la autenticaciÃ³n en cada escenario.</li>
&#x20; <li>Mantener separadas las dependencias de API y UI.</li>
&#x20; <li>No introducir datos compartidos que generen conflictos entre workers.</li>
&#x20; <li>Utilizar datos Ãºnicos cuando el escenario lo requiera.</li>
</ul>
<h3>4.5 Escenarios integrados</h3>
<p>Cuando el escenario combine UI y API, se debe identificar claramente quÃ© comportamiento corresponde a cada capa.</p>
<ul>
&#x20; <li>Utilizar la interfaz para realizar las acciones del usuario.</li>
&#x20; <li>Utilizar los clientes API para preparar o consultar informaciÃ³n cuando corresponda.</li>
&#x20; <li>Validar los resultados de la operaciÃ³n.</li>
&#x20; <li>Evitar duplicar lÃ³gica de comunicaciÃ³n HTTP.</li>
&#x20; <li>Verificar que las aserciones demuestren realmente el comportamiento esperado.</li>
</ul>
<p>Se debe respetar la estrategia de mocks que utiliza actualmente el proyecto. No eliminar interceptaciones existentes ni cambiar un escenario mockeado a backend real sin una solicitud explÃ­cita.</p>
<h2>5. Manejo de datos de prueba</h2>
<ul>
&#x20; <li>Reutilizar los archivos de datos existentes.</li>
&#x20; <li>Utilizar factories cuando se necesiten datos dinÃ¡micos.</li>
&#x20; <li>Evitar valores duplicados y dependencias entre escenarios.</li>
&#x20; <li>No dejar credenciales ni tokens directamente en el cÃ³digo.</li>
&#x20; <li>Utilizar variables de entorno para la configuraciÃ³n sensible.</li>
&#x20; <li>Verificar que los datos permitan ejecutar las pruebas de manera independiente.</li>
</ul>
<h2>6. Manejo de errores</h2>
<p>Cuando una prueba falle se debe revisar:</p>
<ol>
&#x20; <li>El mensaje de error de Playwright.</li>
&#x20; <li>La operaciÃ³n que estaba ejecutando la prueba.</li>
&#x20; <li>Los datos utilizados.</li>
&#x20; <li>La peticiÃ³n y respuesta HTTP, cuando corresponda.</li>
&#x20; <li>Los locators y el estado de la pÃ¡gina, para pruebas UI.</li>
&#x20; <li>El trace o reporte generado.</li>
</ol>
<p>No se deben modificar las aserciones para conseguir que una prueba pase sin entender primero la causa del error.</p>
<p>Si existe un problema externo, como indisponibilidad del backend, se debe documentar y diferenciar de un error de implementaciÃ³n.</p>
<h2>7. Comandos de verificaciÃ³n</h2>
<p>DespuÃ©s de implementar una prueba se deben ejecutar los comandos que correspondan al cambio.</p>
<h3>InstalaciÃ³n de dependencias</h3>
<pre>npm install</pre>
<h3>Ejecutar todas las pruebas</h3>
<pre>npx playwright test</pre>
<h3>Ejecutar con dos workers</h3>
<pre>npx playwright test --workers=2</pre>
<h3>Ejecutar una prueba especÃ­fica</h3>
<pre>npx playwright test tests/api/booking-create.spec.ts</pre>
<h3>Ejecutar una prueba UI especÃ­fica</h3>
<pre>npx playwright test tests/ui/booking-ui-mocked.spec.ts</pre>
<h3>Ejecutar con reporte HTML</h3>
<pre>npx playwright test --reporter=html</pre>
<h3>Abrir el reporte</h3>
<pre>npx playwright show-report</pre>
<h3>Consultar un trace</h3>
<pre>npx playwright show-trace test-results/\&lt;test-folder\&gt;/trace.zip</pre>
<p>TambiÃ©n se debe verificar la compilaciÃ³n TypeScript cuando corresponda:</p>
<pre>npx tsc --noEmit</pre>
<h2>8. Criterios de Ã©xito</h2>
<p>La implementaciÃ³n se considera terminada cuando:</p>
<ul>
&#x20; <li>El escenario cumple el comportamiento solicitado.</li>
&#x20; <li>Se respeta la arquitectura existente.</li>
&#x20; <li>Se reutilizan los Page Objects, fixtures y API Clients disponibles.</li>
&#x20; <li>Las aserciones comprueban resultados reales del escenario.</li>
&#x20; <li>No se introducen dependencias innecesarias entre pruebas.</li>
&#x20; <li>La prueba puede ejecutarse de manera independiente.</li>
&#x20; <li>Las pruebas relacionadas pasan o los problemas externos quedan documentados.</li>
&#x20; <li>Se conserva la evidencia de ejecuciÃ³n cuando sea necesario.</li>
</ul>
<h2>9. Resultado que debe entregar el asistente</h2>
<p>Al finalizar una implementaciÃ³n se debe presentar:</p>
<ul>
&#x20; <li>DescripciÃ³n de los cambios realizados.</li>
&#x20; <li>Archivos creados o modificados.</li>
&#x20; <li>ExplicaciÃ³n de las decisiones tÃ©cnicas.</li>
&#x20; <li>Comandos ejecutados.</li>
&#x20; <li>Resultado de las pruebas.</li>
&#x20; <li>Problemas pendientes o limitaciones identificadas.</li>
</ul>
<p>Si se utiliza un agente de programaciÃ³n, se debe conservar la instrucciÃ³n enviada y revisar manualmente los cambios que haya generado. No se debe asumir que el cÃ³digo es correcto solamente porque el agente terminÃ³ su ejecuciÃ³n.</p>
<h2>10. Consideraciones finales</h2>
<p>Esta skill busca mantener una forma de trabajo consistente para desarrollar automatizaciones en Restful Booker.</p>
<p>Se puede complementar con las skills de API Contract Validator, Test Data Management y Failure Analyzer, pero cada una mantiene su responsabilidad especÃ­fica.</p>
<p>La intenciÃ³n es reutilizar lo que ya tenemos, evitar cambios innecesarios y mantener pruebas fÃ¡ciles de entender y mantener.</p>

