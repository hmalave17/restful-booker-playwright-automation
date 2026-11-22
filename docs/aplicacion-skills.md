<h1>Aplicación de skills - Revisión técnica</h1>

<h2>1. API Contract Validator</h2>

<p>Se aplicaron las instrucciones de esta skill durante la revisión del cliente BookingApiClient y de los modelos relacionados con Booking.</p>

<h3>Hallazgos</h3>

<ul>
  <li>Se identificó una segunda fuente de datos en src/utils/booking.data.ts que no tiene referencias desde las pruebas actuales.</li>
  <li>Las pruebas API y UI utilizan src/data/booking.data.ts como fuente de datos.</li>
  <li>BookingListItem y BookingListResponse están declarados tanto en BookingApiClient como en BookingResponse.ts, con estructuras diferentes.</li>
  <li>El método getBookingById no tiene invocaciones en src ni en tests.</li>
  <li>La implementación de getBookingById utiliza el parámetro roomid en la URL, aunque su nombre sugiere una búsqueda por booking ID.</li>
</ul>

<h3>Decisiones</h3>

<ul>
  <li>No se eliminaron modelos ni métodos porque primero se debe confirmar el contrato real del backend.</li>
  <li>Se identificó src/data/booking.data.ts como el dataset utilizado actualmente por las pruebas.</li>
  <li>Se dejaron registrados los elementos candidatos a refactorización para evitar cambios innecesarios antes de la entrega.</li>
</ul>

<h3>Resultado</h3>

<p>La revisión permitió identificar duplicidad en los modelos y datos de prueba, además de un método sin uso dentro del cliente API. No se realizaron modificaciones funcionales durante esta revisión.</p>

<h2>2. Test Data Management</h2>

<p>Queda pendiente documentar la aplicación de Test Data Management y Failure Analyzer sobre el proyecto.</p>

<h3>Revisión de datos de prueba</h3>

<p>Se aplicaron las instrucciones de esta skill durante la revisión de los mecanismos de generación y administración de datos utilizados por las pruebas API.</p>

<h4>Archivos revisados</h4>

<ul>
  <li>src/utils/booking-data.factory.ts</li>
  <li>src/data/booking.data.ts</li>
  <li>src/data/room.data.ts</li>
</ul>

<h4>Hallazgos</h4>

<ul>
  <li>Se identificó una factory para generar reservas utilizando un dataset base.</li>
  <li>Los correos electrónicos se generan dinámicamente mediante UUID para reducir conflictos entre ejecuciones.</li>
  <li>Los números telefónicos y las fechas de reserva se generan dinámicamente.</li>
  <li>La factory valida que el identificador de habitación sea un número entero positivo.</li>
  <li>La creación de habitaciones utiliza un nombre aleatorio y un identificador descriptivo para facilitar su trazabilidad.</li>
  <li>Algunos atributos de las habitaciones permanecen constantes, como el tipo, precio y características.</li>
</ul>

<h4>Decisiones</h4>

<ul>
  <li>Se conserva la separación entre los datos base del escenario y la generación de información dinámica.</li>
  <li>Se considera adecuada la generación de identificadores únicos para reducir colisiones entre ejecuciones paralelas.</li>
  <li>No se realizaron modificaciones porque la implementación actual cumple su propósito dentro de los escenarios revisados.</li>
</ul>

<h4>Resultado</h4>

<p>La revisión permitió identificar mecanismos de generación dinámica de datos que favorecen la independencia de las pruebas y reducen los conflictos durante ejecuciones repetidas o paralelas.</p>


<h2>3. Failure Analyzer</h2>

<p>Se aplicaron las instrucciones de esta skill durante la revisión de la estrategia de diagnóstico de fallos y captura de evidencias configurada en Playwright.</p>

<h3>Archivos revisados</h3>

<ul>
  <li>playwright.config.ts</li>
  <li>package.json</li>
  <li>Directorio playwright-report/</li>
  <li>Directorio test-results/</li>
</ul>

<h3>Hallazgos</h3>

<ul>
  <li>Se identificó la configuración de captura de trazas mediante retain-on-failure.</li>
  <li>Se verificó la configuración de screenshots y videos para escenarios fallidos.</li>
  <li>Se identificó la generación de reportes HTML para consultar los resultados de ejecución.</li>
  <li>Se encontraron evidencias de screenshot y trace ZIP correspondientes a una prueba UI.</li>
  <li>Se reportó una ejecución anterior en la que fallaron inicialmente dos pruebas API, aunque posteriormente fueron aprobadas.</li>
  <li>No fue posible determinar la causa raíz de ese fallo porque no se conservó el error original.</li>
</ul>

<h3>Validaciones realizadas</h3>

<ul>
  <li>Se ejecutaron las pruebas API con un worker: 4 de 4 aprobadas.</li>
  <li>Se ejecutaron las pruebas API con dos workers: 4 de 4 aprobadas.</li>
  <li>Se realizaron tres ejecuciones consecutivas con dos workers, obteniendo 12 de 12 pruebas aprobadas.</li>
  <li>Se verificó la generación del reporte HTML y la existencia de evidencias de ejecución.</li>
</ul>

<h3>Decisiones</h3>

<ul>
  <li>Se conserva la ejecución paralela con dos workers porque las pruebas realizadas no evidenciaron problemas de concurrencia.</li>
  <li>No se modificó la configuración de captura de evidencias.</li>
  <li>Se mantiene el fallo inicial como una incidencia no reproducida y de causa no determinada.</li>
</ul>

<h3>Resultado</h3>

<p>La revisión permitió validar los mecanismos de captura de evidencias y comprobar el comportamiento de las pruebas API bajo diferentes configuraciones de ejecución. Las pruebas mostraron resultados consistentes durante las validaciones realizadas, aunque el fallo inicial no pudo reproducirse.</p>

