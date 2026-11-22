<h1>Test Data Management</h1>

<h2>1. Objetivo</h2>

<p>Esta skill define buenas prácticas para administrar los datos utilizados durante las pruebas automatizadas de Restful Booker.</p>

<h2>2. Responsabilidades</h2>

<ul>
  <li>Identificar los datasets existentes.</li>
  <li>Reutilizar los datos definidos en los archivos del proyecto.</li>
  <li>Generar información dinámica cuando sea necesario.</li>
  <li>Evitar duplicidad de datos entre escenarios.</li>
  <li>Prevenir conflictos durante ejecuciones paralelas.</li>
  <li>Mantener consistencia entre los datos enviados y las validaciones.</li>
</ul>

<h2>3. Procedimiento</h2>

<ol>
  <li>Revisar los archivos de datos existentes.</li>
  <li>Identificar qué información necesita cada escenario.</li>
  <li>Verificar si existen factories para generar datos dinámicos.</li>
  <li>Reutilizar interfaces y modelos existentes.</li>
  <li>Generar identificadores únicos cuando corresponda.</li>
  <li>Evitar compartir información mutable entre workers.</li>
  <li>Validar que los datos generados cumplan los requisitos del endpoint.</li>
</ol>

<h2>4. Buenas prácticas</h2>

<ul>
  <li>No hardcodear información dinámica innecesariamente.</li>
  <li>Utilizar los datasets existentes cuando sean suficientes.</li>
  <li>Preferir randomUUID para identificadores únicos cuando aplique.</li>
  <li>No depender del orden de ejecución de las pruebas.</li>
  <li>Evitar que un escenario dependa de los datos creados por otro.</li>
  <li>No utilizar información personal real en las pruebas.</li>
  <li>Considerar las restricciones del backend al generar datos.</li>
</ul>

<h2>5. Ejecución paralela</h2>

<p>Cuando se ejecutan pruebas con dos o más workers, cada escenario debe administrar sus propios datos.</p>

<p>Se debe prestar especial atención a las reservas y habitaciones que puedan compartir recursos del backend.</p>

<h2>6. Resultado esperado</h2>

<p>Los escenarios deben utilizar datos consistentes, independientes y adecuados para su ejecución individual o paralela.</p>

<h2>7. Consideraciones</h2>

<p>Esta skill complementa la skill principal y no reemplaza los archivos de datos, interfaces o factories existentes.</p>
