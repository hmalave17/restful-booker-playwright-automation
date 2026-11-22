<h1>API Contract Validator</h1>

<h2>1. Objetivo</h2>

<p>Esta skill ayuda a revisar y validar los contratos de los endpoints API del proyecto Restful Booker.</p>

<h2>2. Responsabilidades</h2>

<ul>
  <li>Revisar la estructura de los request y response.</li>
  <li>Identificar campos obligatorios y opcionales.</li>
  <li>Validar tipos de datos.</li>
  <li>Verificar códigos HTTP esperados.</li>
  <li>Identificar diferencias entre el contrato esperado y la respuesta real.</li>
  <li>Reutilizar interfaces y modelos existentes.</li>
</ul>

<h2>3. Procedimiento</h2>

<ol>
  <li>Identificar el endpoint que se desea validar.</li>
  <li>Revisar el API Client correspondiente.</li>
  <li>Inspeccionar los modelos TypeScript existentes.</li>
  <li>Identificar los campos obligatorios del contrato.</li>
  <li>Proponer las validaciones necesarias.</li>
  <li>Implementar las validaciones reutilizables cuando sean necesarias.</li>
  <li>Ejecutar las pruebas relacionadas.</li>
</ol>

<h2>4. Buenas prácticas</h2>

<ul>
  <li>No duplicar interfaces existentes.</li>
  <li>Evitar utilizar any.</li>
  <li>No asumir que una respuesta exitosa siempre contiene todos los campos.</li>
  <li>Validar tanto la estructura como los valores importantes.</li>
  <li>Separar las validaciones de contrato de los datos de prueba.</li>
  <li>No modificar endpoints sin justificar el cambio.</li>
</ul>

<h2>5. Resultado esperado</h2>

<p>Las pruebas deben permitir identificar cuándo una respuesta API no cumple con la estructura o los valores definidos en el contrato esperado.</p>

<h2>6. Consideraciones</h2>

<p>Esta skill complementa la skill principal del proyecto. No reemplaza los API Clients ni las fixtures existentes.</p>
