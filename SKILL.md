<h1>Skill de Automatización - Restful Booker</h1>

<h2>1. Objetivo</h2>

<p>Esta skill tiene como objetivo definir algunas instrucciones y buenas prácticas para trabajar en el proyecto de automatización Restful Booker.</p>

<p>La idea es que un asistente de IA pueda entender cómo está organizado el proyecto y pueda ayudarnos a implementar nuevos escenarios, corregir errores y mantener la estructura existente sin generar cambios innecesarios.</p>

<h2>2. Tecnologías utilizadas</h2>

<ul>
  <li>Playwright</li>
  <li>TypeScript</li>
  <li>Node.js</li>
  <li>API Testing</li>
  <li>UI Testing</li>
  <li>Page Object Model (POM)</li>
  <li>Playwright Fixtures</li>
  <li>Playwright HTML Reporter</li>
</ul>

<h2>3. Arquitectura del proyecto</h2>

<p>El proyecto está dividido principalmente en dos tipos de automatización: API y UI.</p>

<h3>3.1 Automatización API</h3>

<p>Las pruebas de API se realizan contra el backend real de Restful Booker.</p>

<p>Se busca validar:</p>

<ul>
  <li>Autenticación.</li>
  <li>Creación de habitaciones.</li>
  <li>Consulta de habitaciones.</li>
  <li>Creación de reservas.</li>
  <li>Consulta de reservas.</li>
  <li>Escenarios positivos y negativos.</li>
  <li>Códigos HTTP y contenido de las respuestas.</li>
</ul>

<p>Para consumir los endpoints utilizamos clientes independientes, como AuthApiClient, RoomApiClient y BookingApiClient.</p>

<h3>3.2 Automatización UI</h3>

<p>Las pruebas de interfaz utilizan la aplicación real, pero algunas dependencias del backend son simuladas utilizando las capacidades de interceptación de Playwright.</p>

<p>El objetivo es validar el comportamiento del frontend sin depender completamente de la disponibilidad del servicio backend.</p>

<p>En estos escenarios validamos:</p>

<ul>
  <li>Navegación en la aplicación.</li>
  <li>Interacción con formularios.</li>
  <li>Ingreso de información de reservas.</li>
  <li>Interceptación de peticiones HTTP.</li>
  <li>Validación del payload enviado.</li>
  <li>Simulación de respuestas del backend.</li>
  <li>Visualización de confirmaciones en pantalla.</li>
</ul>

<p>Es importante tener presente que una prueba UI con backend mockeado valida el comportamiento del frontend, pero no confirma que la reserva se haya almacenado realmente en el backend.</p>

<h2>4. Buenas prácticas para trabajar en el proyecto</h2>

<h3>4.1 Reutilización de código</h3>

<ul>
  <li>Antes de crear una nueva clase, revisar si ya existe alguna que cumpla esa función.</li>
  <li>Evitar duplicar métodos que ya estén implementados en los API Clients.</li>
  <li>Utilizar fixtures para compartir dependencias entre pruebas.</li>
  <li>Reutilizar modelos para mantener consistencia en los datos.</li>
</ul>

<h3>4.2 Uso de TypeScript</h3>

<ul>
  <li>Utilizar interfaces para definir los modelos de petición y respuesta.</li>
  <li>Evitar utilizar any cuando sea posible.</li>
  <li>Definir tipos para los parámetros y retornos de los métodos.</li>
  <li>Mantener nombres descriptivos para clases, métodos y variables.</li>
</ul>

<h3>4.3 Manejo de errores</h3>

<p>Cuando una petición API falla, debemos mostrar información que permita identificar el problema.</p>

<p>Los mensajes de error deberían incluir el nombre de la operación, el código HTTP y el contenido de la respuesta cuando esté disponible.</p>

<h3>4.4 Autenticación</h3>

<p>La autenticación se centraliza mediante AuthApiClient y los fixtures.</p>

<p>El flujo actual consiste en:</p>

<ol>
  <li>Obtener el token mediante el endpoint de autenticación.</li>
  <li>Validar que el token sea correcto.</li>
  <li>Inyectar el token en los API Clients.</li>
  <li>Enviar el token mediante el header Cookie.</li>
</ol>

<p>Ejemplo del header utilizado:</p>

<pre>
Cookie: token=&lt;authentication_token&gt;
</pre>

<p>No se deben dejar tokens fijos dentro del código.</p>

<h2>5. Estrategia de ejecución paralela</h2>

<p>El proyecto está preparado para ejecutar pruebas utilizando dos workers.</p>

<p>Configuración objetivo:</p>

<pre>
workers: 2,
fullyParallel: true
</pre>

<p>Debemos tener cuidado con los datos compartidos entre pruebas, especialmente cuando se crean reservas o habitaciones.</p>

<p>Se recomienda utilizar datos únicos cuando sea necesario para evitar conflictos durante la ejecución paralela.</p>

<p>Comando de ejecución:</p>

<pre>
npx playwright test --workers=2
</pre>

<h2>6. Uso de mocks en UI</h2>

<p>La interceptación de peticiones es una parte intencional de nuestra estrategia de automatización.</p>

<p>Cuando se implementen nuevos escenarios UI, se debe:</p>

<ol>
  <li>Abrir la aplicación real.</li>
  <li>Interactuar con los controles de la interfaz.</li>
  <li>Interceptar la petición correspondiente.</li>
  <li>Validar los datos enviados al backend.</li>
  <li>Simular una respuesta utilizando route.fulfill().</li>
  <li>Validar el resultado presentado al usuario.</li>
</ol>

<p>No eliminar los mocks existentes para convertir las pruebas UI en pruebas contra el backend real, a menos que exista una decisión explícita de cambiar la estrategia.</p>

<h2>7. Manejo de reportes y errores</h2>

<p>Playwright permite generar reportes y consultar evidencias de las ejecuciones.</p>

<p>Comandos principales:</p>

<h3>Ejecutar todas las pruebas</h3>

<pre>
npx playwright test
</pre>

<h3>Ejecutar con dos workers</h3>

<pre>
npx playwright test --workers=2
</pre>

<h3>Ejecutar un archivo específico</h3>

<pre>
npx playwright test tests/api/booking-create.spec.ts
</pre>

<h3>Abrir el reporte HTML</h3>

<pre>
npx playwright show-report
</pre>

<h3>Consultar un trace</h3>

<pre>
npx playwright show-trace test-results/&lt;test-folder&gt;/trace.zip
</pre>

<p>Cuando una prueba falle, primero debemos revisar el mensaje de error, la petición realizada, los datos enviados y la respuesta recibida. Después de identificar la causa, realizar el cambio necesario y volver a ejecutar la prueba.</p>

<h2>8. Instrucciones para el asistente de IA</h2>

<p>Antes de realizar cambios en el proyecto, el asistente debe:</p>

<ul>
  <li>Revisar la estructura existente.</li>
  <li>Entender cómo funciona el código relacionado con el cambio.</li>
  <li>Reutilizar las clases y métodos existentes cuando sea posible.</li>
  <li>Evitar modificar archivos que no estén relacionados con el requerimiento.</li>
  <li>Mantener la separación entre API y UI.</li>
  <li>Conservar la estrategia actual de mocks en UI.</li>
  <li>Verificar que los cambios no afecten la ejecución paralela.</li>
  <li>Ejecutar las pruebas correspondientes después de modificar el código.</li>
</ul>

<p>Si encuentra una implementación que puede mejorarse, debe explicar primero el motivo y proponer el cambio antes de modificar partes importantes de la arquitectura.</p>

<h2>9. Criterios para considerar una tarea terminada</h2>

<p>Una implementación se considera terminada cuando:</p>

<ul>
  <li>El código compila correctamente.</li>
  <li>La funcionalidad cumple el objetivo solicitado.</li>
  <li>Las pruebas relacionadas pasan correctamente.</li>
  <li>No se afecta la funcionalidad existente.</li>
  <li>Se mantiene la estructura del proyecto.</li>
  <li>Se puede ejecutar sin problemas con los workers configurados.</li>
</ul>

<h2>10. Consideraciones finales</h2>

<p>Esta skill es una primera versión y puede ir evolucionando a medida que el proyecto crezca.</p>

<p>La intención es utilizarla como una guía para mantener buenas prácticas y facilitar el trabajo con herramientas de inteligencia artificial durante el desarrollo de nuevas automatizaciones.</p>
