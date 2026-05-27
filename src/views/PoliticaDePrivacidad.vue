<template>
  <div class="privacy-page">
    <div class="container">
      <div class="privacy-header">
        <h1 class="privacy-title">Política de Privacidad</h1>
        <p class="privacy-date">Última actualización: mayo de 2026</p>
      </div>

      <div class="privacy-content">
        <section class="privacy-section">
          <h2>1. Información que recopilamos</h2>
          <p>
            En AGHR Mentoring & HR recopilamos información personal que usted nos proporciona voluntariamente al
            utilizar nuestros servicios, completar formularios de contacto o registrarse en nuestra plataforma.
            Esto puede incluir:
          </p>
          <ul>
            <li>Nombre y apellido</li>
            <li>Dirección de correo electrónico</li>
            <li>Número de teléfono</li>
            <li>Información profesional (empresa, cargo, sector)</li>
            <li>Contenido de los mensajes que nos envía</li>
          </ul>
        </section>

        <section class="privacy-section">
          <h2>2. Uso de la información</h2>
          <p>La información recopilada se utiliza exclusivamente para:</p>
          <ul>
            <li>Responder a sus consultas y solicitudes de contacto</li>
            <li>Brindar y mejorar nuestros servicios de consultoría y mentoría</li>
            <li>Enviar comunicaciones relevantes sobre nuestros servicios, con su consentimiento previo</li>
            <li>Cumplir con obligaciones legales y contractuales</li>
          </ul>
          <p>No vendemos, alquilamos ni cedemos sus datos personales a terceros sin su consentimiento explícito.</p>
        </section>

        <section class="privacy-section">
          <h2>3. Base legal del tratamiento</h2>
          <p>El tratamiento de sus datos personales se realiza bajo las siguientes bases legales:</p>
          <ul>
            <li><strong>Consentimiento:</strong> cuando usted nos lo otorga expresamente.</li>
            <li><strong>Ejecución contractual:</strong> cuando el tratamiento es necesario para prestarle los servicios solicitados.</li>
            <li><strong>Interés legítimo:</strong> para mejorar nuestros servicios y comunicarnos con usted de manera relevante.</li>
          </ul>
        </section>

        <section class="privacy-section">
          <h2>4. Almacenamiento y seguridad</h2>
          <p>
            Sus datos se almacenan en servidores seguros y aplicamos medidas técnicas y organizativas adecuadas
            para protegerlos contra accesos no autorizados, pérdida o divulgación indebida.
          </p>
          <p>
            Conservamos sus datos personales únicamente durante el tiempo necesario para cumplir con los fines
            para los que fueron recopilados, o según lo exija la legislación aplicable.
          </p>
        </section>

        <section class="privacy-section">
          <h2>5. Sus derechos</h2>
          <p>De conformidad con la Ley 25.326 de Protección de Datos Personales (Argentina) y normativas aplicables, usted tiene derecho a:</p>
          <ul>
            <li><strong>Acceso:</strong> conocer qué datos personales tenemos sobre usted.</li>
            <li><strong>Rectificación:</strong> solicitar la corrección de datos inexactos o incompletos.</li>
            <li><strong>Supresión:</strong> solicitar la eliminación de sus datos cuando ya no sean necesarios.</li>
            <li><strong>Oposición:</strong> oponerse al tratamiento de sus datos en determinadas circunstancias.</li>
            <li><strong>Portabilidad:</strong> recibir sus datos en un formato estructurado y de uso común.</li>
          </ul>
          <p>
            Para ejercer cualquiera de estos derechos, puede contactarnos a través de
            <a href="mailto:contacto@aghr.com">contacto@aghr.com</a>.
          </p>
        </section>

        <section class="privacy-section">
          <h2>6. Cookies y tecnologías de seguimiento</h2>
          <p>
            Nuestro sitio web puede utilizar cookies y tecnologías similares para mejorar la experiencia de
            navegación, analizar el tráfico y personalizar el contenido. Puede configurar su navegador para
            rechazar cookies, aunque esto podría afectar algunas funcionalidades del sitio.
          </p>
        </section>

        <section class="privacy-section">
          <h2>7. Servicios de terceros</h2>
          <p>
            Podemos utilizar servicios de terceros (como herramientas de análisis o comunicación) que pueden
            recopilar información de forma independiente. Estos servicios cuentan con sus propias políticas de
            privacidad, sobre las cuales no tenemos control directo.
          </p>
        </section>

        <section class="privacy-section">
          <h2>8. Cambios en esta política</h2>
          <p>
            Nos reservamos el derecho de actualizar esta Política de Privacidad en cualquier momento. Le
            notificaremos sobre cambios significativos publicando la nueva versión en esta página con la fecha
            de actualización correspondiente. Le recomendamos revisarla periódicamente.
          </p>
        </section>

        <section class="privacy-section">
          <h2>9. Contacto</h2>
          <p>
            Si tiene preguntas, inquietudes o desea ejercer sus derechos respecto al tratamiento de sus datos
            personales, puede contactarnos en:
          </p>
          <address>
            <strong>AGHR Mentoring & HR</strong><br>
            Córdoba, Argentina<br>
            <a href="mailto:contacto@aghr.com">contacto@aghr.com</a>
          </address>
        </section>
      </div>

      <div class="privacy-back">
        <router-link to="/" class="back-link">← Volver al inicio</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.privacy-page {
  width: 100%;
  min-height: calc(100vh - 80px);
  background: #f9fafb;
  padding: 4rem 0;
}

.container {
  max-width: 860px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.privacy-header {
  margin-bottom: 3rem;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 1.5rem;
}

.privacy-title {
  font-size: 2.25rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.5rem;
}

.privacy-date {
  font-size: 0.9375rem;
  color: #6b7280;
}

.privacy-content {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.privacy-section h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1rem;
}

.privacy-section p {
  font-size: 0.9375rem;
  line-height: 1.75;
  color: #374151;
  margin-bottom: 0.75rem;
}

.privacy-section ul {
  list-style: disc;
  padding-left: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.privacy-section li {
  font-size: 0.9375rem;
  line-height: 1.75;
  color: #374151;
}

.privacy-section a {
  color: #5568D3;
  text-decoration: none;
  transition: color 0.2s;
}

.privacy-section a:hover {
  color: #764ba2;
  text-decoration: underline;
}

address {
  font-style: normal;
  font-size: 0.9375rem;
  line-height: 1.75;
  color: #374151;
}

.privacy-back {
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
}

.back-link {
  font-size: 0.9375rem;
  font-weight: 500;
  color: #5568D3;
  text-decoration: none;
  transition: color 0.2s;
}

.back-link:hover {
  color: #764ba2;
}

@media (max-width: 640px) {
  .privacy-page {
    padding: 2.5rem 0;
  }

  .privacy-title {
    font-size: 1.75rem;
  }
}
</style>
