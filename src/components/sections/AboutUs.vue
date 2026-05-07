<template>
  <div>
    <!-- Main Content Section -->
    <section class="about-us">
      <div class="container">
        <!-- Header -->
        <div class="header">
          <h2 class="title">Quiénes Somos</h2>
          <p class="subtitle">Conoce nuestro equipo</p>
        </div>

        <!-- Founder Section - Andrea Gasparetti -->
        <div class="team-category-section">
          <h3 class="team-category-title">Fundadora</h3>
          <div class="founder-section">
            <div class="founder-content">
              <div class="founder-image-wrapper">
                <picture v-if="founder.image">
                  <source :srcset="founder.imageWebP" type="image/webp" />
                  <img
                    :src="founder.image"
                    :alt="founder.name"
                    class="founder-image"
                    loading="lazy"
                    width="800"
                    height="800"
                  />
                </picture>
                <div v-else class="founder-image-placeholder">
                  {{ getInitials(founder.name) }}
                </div>
                <div class="founder-badge">Fundadora</div>
              </div>

              <div class="founder-info">
                <h3 class="founder-name">{{ founder.name }}</h3>
                <p class="founder-title">{{ founder.title }}</p>

                <div class="founder-bio">
                  <p
                    v-for="(paragraph, index) in founder.bio"
                    :key="index"
                    class="bio-paragraph"
                  >
                    {{ paragraph }}
                  </p>
                </div>

                <div class="founder-credentials">
                  <div class="credentials-header">
                    <h4>Formación y Experiencia:</h4>
                  </div>
                  <div
                    v-for="(credential, index) in founder.credentials"
                    :key="index"
                    class="credential-item"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{{ credential }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Mentoring Team Section -->
        <div class="team-category-section">
          <h3 class="team-category-title">Equipo Mentoring</h3>
          <div
            v-for="(member, index) in mentoringTeam"
            :key="`mentoring-${index}`"
            class="founder-section"
          >
            <div class="founder-content">
              <div class="founder-image-wrapper">
                <picture v-if="member.image">
                  <source :srcset="member.imageWebP" type="image/webp" />
                  <img
                    :src="member.image"
                    :alt="member.name"
                    class="founder-image"
                    loading="lazy"
                    width="800"
                    height="800"
                  />
                </picture>
                <div v-else class="founder-image-placeholder">
                  {{ getInitials(member.name) }}
                </div>
                <div class="founder-badge">{{ member.title.split("&")[0].trim() }}</div>
              </div>

              <div class="founder-info">
                <h3 class="founder-name">{{ member.name }}</h3>
                <p class="founder-title">{{ member.title }}</p>

                <div class="founder-bio">
                  <p
                    v-for="(paragraph, idx) in member.bio"
                    :key="idx"
                    class="bio-paragraph"
                  >
                    {{ paragraph }}
                  </p>
                </div>

                <div class="founder-credentials">
                  <div class="credentials-header">
                    <h4>Formación y Experiencia:</h4>
                  </div>
                  <div
                    v-for="(credential, idx) in member.credentials"
                    :key="idx"
                    class="credential-item"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{{ credential }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Brand Team Section -->
        <div class="team-category-section">
          <h3 class="team-category-title">Equipo Desarrollo de Marca</h3>
          <div
            v-for="(member, index) in brandTeam"
            :key="`brand-${index}`"
            class="founder-section"
          >
            <div class="founder-content">
              <div class="founder-image-wrapper">
                <picture v-if="member.image">
                  <source :srcset="member.imageWebP" type="image/webp" />
                  <img
                    :src="member.image"
                    :alt="member.name"
                    class="founder-image"
                    loading="lazy"
                    width="800"
                    height="800"
                  />
                </picture>
                <div v-else class="founder-image-placeholder">
                  {{ getInitials(member.name) }}
                </div>
                <div class="founder-badge">{{ member.title.split("&")[0].trim() }}</div>
              </div>

              <div class="founder-info">
                <h3 class="founder-name">{{ member.name }}</h3>
                <p class="founder-title">{{ member.title }}</p>

                <div class="founder-bio">
                  <p
                    v-for="(paragraph, idx) in member.bio"
                    :key="idx"
                    class="bio-paragraph"
                  >
                    {{ paragraph }}
                  </p>
                </div>

                <div class="founder-credentials">
                  <div class="credentials-header">
                    <h4>Formación y Experiencia:</h4>
                  </div>
                  <div
                    v-for="(credential, idx) in member.credentials"
                    :key="idx"
                    class="credential-item"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{{ credential }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Mission & Vision -->
        <div class="mission-vision">
          <div class="mission-card">
            <div class="card-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"
                />
              </svg>
            </div>
            <h4 class="card-title">Nuestra Misión</h4>
            <p class="card-text">{{ mission }}</p>
          </div>

          <div class="mission-card">
            <div class="card-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <h4 class="card-title">Nuestra Visión</h4>
            <p class="card-text">{{ vision }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Clients Carousel -->
    <ClientsCarousel />

    <!-- Team Section -->
    <section v-if="team.length > 0" class="about-us-team">
      <div class="container">
        <div class="team-section">
          <h3 class="team-title">Nuestro Equipo</h3>
          <div class="team-grid">
            <div v-for="(member, index) in team" :key="index" class="team-card">
              <div class="team-image-wrapper">
                <img
                  v-if="member.image"
                  :src="member.image"
                  :alt="member.name"
                  class="team-image"
                  loading="lazy"
                />
                <div v-else class="team-image-placeholder">
                  {{ getInitials(member.name) }}
                </div>
              </div>
              <h4 class="team-name">{{ member.name }}</h4>
              <p class="team-role">{{ member.role }}</p>
              <p class="team-description">{{ member.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import andreaPhoto from "../../assets/images/foto/ag_foto_optimized.png";
import andreaPhotoWebP from "../../assets/images/foto/ag_foto.webp";
import lauraPhoto from "../../assets/images/foto/perfil_laura.jpg";
import anabellaPhoto from "../../assets/images/foto/perfil_anabella.jpg";
import rominaPhoto from "../../assets/images/foto/romina_perfil.jpeg";
import victoriaPhoto from "../../assets/images/foto/perfil_victoria.jpeg";
import ivoPhoto from "../../assets/images/foto/perfil_ivo.png";
import ClientsCarousel from "./ClientsCarousel.vue";

// Función para obtener iniciales
const getInitials = (name) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const props = defineProps({
  founder: {
    type: Object,
    default: () => ({
      name: "Andrea Gasparetti",
      title: "Fundadora & Consultora Senior en RH",
      image: andreaPhoto,
      imageWebP: andreaPhotoWebP,
      bio: [
        "Licenciada en Psicología por la Universidad del Salvador, con especialización en RRHH y Empleabilidad.",
        "Mentora Coach con más de 15 años de experiencia en Selección y Consultoría de RRHH en consultoras multinacionales y empresas líderes a nivel mundial.",
        "Docente en Recursos Humanos en la Universidad de Palermo y Profesora de Coaching en la Universidad del Salvador.",
      ],
      credentials: [
        "Licenciada en Psicología | Universidad del Salvador",
        "Especialista en RRHH y Empleabilidad",
        "Mentora Coach Certificada",
        "Profesora de Recursos Humanos | Universidad de Palermo",
        "Profesora de Coaching | Universidad del Salvador",
        "15+ años de experiencia en Selección y Consultoría de RRHH",
      ],
    }),
  },
  mentoringTeam: {
    type: Array,
    default: () => [
      {
        name: "Laura Garcia",
        title: "Mentoring & Oratoria",
        image: lauraPhoto,
        imageWebP: null,
        bio: [
          "Especialista en Comunicación (UBA) y procesos educativos, con más de 17 años liderando proyectos de comunicación interna y transformación organizacional. Coach certificada y experta en PNL.",
          "Laura facilita la adaptación de equipos en contextos de cambio, asegurando que el mensaje y la cultura organizacional evolucionen en sintonía. Domina el idioma inglés para proyectos de alcance global.",
        ],
        credentials: [
          "Especialista en Comunicación | UBA",
          "Coach Certificada y Experta en PNL",
          "17+ años liderando proyectos de comunicación interna",
          "Experta en transformación organizacional",
          "Bilingüe - Inglés",
        ],
      },
      {
        name: "Maria Anabella Pozniak",
        title: "Senior HR Consultant & Estrategia de Personas",
        image: anabellaPhoto,
        imageWebP: null,
        bio: [
          "Especialista en Dirección del Factor Humano con una sólida formación en Liderazgo, Coaching y Psicología Laboral (UB), con más de 16 años de experiencia en multinacionales y PyMEs.",
          "Anabella es la pieza clave para la profesionalización de áreas de RRHH y transformación cultural. Su visión estratégica permite estructurar procesos de personas con impacto local y regional.",
        ],
        credentials: [
          "Especialista en Dirección del Factor Humano | UB",
          "Formación en Liderazgo, Coaching y Psicología Laboral",
          "16+ años de experiencia en multinacionales y PyMEs",
          "Experta en transformación cultural",
          "Bilingüe - Inglés",
        ],
      },
      {
        name: "Romina Corigliano",
        title: "Mentoring & Oratoria",
        image: rominaPhoto,
        imageWebP: null,
        bio: [
          "Especialista en comunicación organizacional y management con más de 15 años de experiencia. Integra una mirada estratégica con el desarrollo humano, enfocándose en la resolución de conflictos y la efectividad organizacional.",
          "Subdirectora Académica en la UBA y experta en Oratoria, Romina lidera procesos de capacitación bilingües que fortalecen el liderazgo y la cultura interna en empresas de diversos rubros.",
        ],
        credentials: [
          "Contadora Pública | UBA",
          "Psicóloga Social | Escuela de Psicología Social del Sur",
          "Subdirectora Académica Maestría en Comunicación | UBA",
          "Coach de Equipos Certificada | Mindful Quest",
          "15+ años en consultoría y capacitación organizacional",
          "Bilingüe - Inglés",
        ],
      },
    ],
  },
  brandTeam: {
    type: Array,
    default: () => [
      {
        name: "Victoria Passadore",
        title: "Estrategia de Marca & Comunicación",
        image: victoriaPhoto,
        imageWebP: null,
        bio: [
          "Licenciada en Publicidad (UCES) con más de 20 años de trayectoria en agencias y multinacionales.",
          "Victoria aporta una mirada de negocio integral a AGHR, liderando el planeamiento estratégico, social listening e investigación de mercado. Su foco está en el desarrollo de marcas con propósito y campañas que conectan.",
        ],
        credentials: [
          "Licenciada en Publicidad | UCES",
          "20+ años de trayectoria en agencias y multinacionales",
          "Experta en planeamiento estratégico y social listening",
          "Especialista en desarrollo de marcas con propósito",
          "Bilingüe - Inglés y Portugués",
        ],
      },
      {
        name: "Ivo Konstantinow",
        title: "Desarrollo Web & Soluciones Digitales",
        image: ivoPhoto,
        imageWebP: null,
        bio: [
          "Full Stack Developer con una sólida base operativa en administración y ventas, lo que le permite entender los procesos empresariales desde adentro.",
          "Especialista en el ecosistema JavaScript (React, Next.js, Node.js), Ivo traduce problemas organizacionales en herramientas digitales que optimizan recursos y mejoran la comunicación interna. Su enfoque combina la capacidad técnica con una visión estratégica orientada a resultados medibles.",
        ],
        credentials: [
          "Full Stack Developer",
          "Especialista en JavaScript (React, Next.js, Node.js)",
          "Base operativa en administración y ventas",
          "Enfoque estratégico orientado a resultados",
          "Bilingüe - Inglés",
        ],
      },
    ],
  },
  mission: {
    type: String,
    default:
      "Acompañar el crecimiento profesional y organizacional a través de soluciones personalizadas en recursos humanos, conectando el talento con las oportunidades que impulsan el éxito.",
  },
  vision: {
    type: String,
    default:
      "Ser el referente en mentoría y recursos humanos en la región, reconocidos por nuestra capacidad de transformar carreras y organizaciones a través de estrategias innovadoras y centradas en las personas.",
  },
  team: {
    type: Array,
    default: () => [],
  },
});
</script>

<style scoped>
/* ============================================
   Modern Corporate About Us Section
   ============================================ */

.about-us {
  margin-top: 10vh;
  padding: 6rem 0;
  background: linear-gradient(180deg, #ffffff 0%, #f9fafb 50%, #fafbfc 100%);
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Header */
.header {
  text-align: center;
  margin-bottom: 4rem;
  animation: fadeInDown 0.8s ease-out;
}

.title {
  font-family: "Garamond", serif;
  font-size: clamp(2.4rem, 4.8vw, 3.3rem);
  font-weight: bold;
  color: var(--color-text-primary);
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.subtitle {
  font-family: var(--font-family-primary);
  font-size: clamp(1.2rem, 2.4vw, 1.35rem);
  color: var(--color-text-secondary);
  font-weight: 500;
  line-height: 1.7;
}

/* Founder Section */
.founder-section {
  margin-bottom: 4rem;
  animation: fadeInUp 0.8s ease-out 0.2s both;
}

.founder-content {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 3rem;
  align-items: start;
  background: white;
  padding: 2.5rem;
  border-radius: 1.5rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid #f3f4f6;
  transition: all 0.3s ease;
}

.founder-content:hover {
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.founder-image-wrapper {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.founder-image {
  width: 100%;
  max-width: 280px;
  height: auto;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 1.25rem;
  transition: all 0.3s ease;
  border: 4px solid #f0f0f0;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  display: block;
}

.founder-image:hover {
  transform: scale(1.02);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  border-color: var(--color-primary);
}

.founder-image-placeholder {
  width: 100%;
  max-width: 280px;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    var(--color-primary) 0%,
    var(--color-secondary) 100%
  );
  color: white;
  font-family: var(--font-family-heading);
  font-size: 3.5rem;
  font-weight: 700;
  border-radius: 1.25rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.founder-badge {
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(
    135deg,
    var(--color-primary) 0%,
    var(--color-secondary) 100%
  );
  color: white;
  font-family: var(--font-family-primary);
  padding: 0.6rem 1.75rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 700;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  white-space: nowrap;
  letter-spacing: 0.02em;
  z-index: 10;
}

.founder-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.founder-name {
  font-family: "Garamond", serif;
  font-size: clamp(2.1rem, 3.6vw, 2.7rem);
  font-weight: bold;
  color: var(--color-text-primary);
  margin: 0;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.founder-title {
  font-family: var(--font-family-primary);
  font-size: clamp(1.2rem, 2.4vw, 1.35rem);
  color: var(--color-primary);
  font-weight: 600;
  margin: 0;
  line-height: 1.4;
  margin-top: -0.5rem;
}

.founder-bio {
  display: flex;
  flex-direction: column;
  gap: 1.125rem;
  margin-top: 0.25rem;
}

.bio-paragraph {
  font-family: var(--font-family-primary);
  color: var(--color-text-secondary);
  line-height: 1.8;
  margin: 0;
  font-size: 1.2rem;
  text-align: justify;
}

.founder-credentials {
  margin-top: 1rem;
  padding-top: 1.25rem;
  border-top: 2px solid #f0f0f0;
}

.credentials-header {
  margin-bottom: 1rem;
}

.credentials-header h4 {
  font-family: var(--font-family-primary);
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.credential-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  color: #2d3748;
  font-size: 1.125rem;
  margin-bottom: 0.75rem;
  line-height: 1.6;
}

.credential-item:last-child {
  margin-bottom: 0;
}

.credential-item svg {
  color: var(--color-primary);
  flex-shrink: 0;
  margin-top: 3px;
}

/* Mission & Vision */
.mission-vision {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2.5rem;
  margin-bottom: 0;
  animation: fadeInUp 0.8s ease-out 0.4s both;
}

/* Team Category Section */
.team-category-section {
  margin-bottom: 4rem;
  animation: fadeInUp 0.8s ease-out 0.6s both;
}

.team-category-title {
  font-family: "Garamond", serif;
  font-size: clamp(2.1rem, 3.6vw, 2.7rem);
  font-weight: bold;
  color: var(--color-text-primary);
  text-align: center;
  margin-bottom: 3rem;
  letter-spacing: -0.02em;
  line-height: 1.2;
  position: relative;
  padding-bottom: 1rem;
}

.team-category-title::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: linear-gradient(
    90deg,
    var(--color-primary) 0%,
    var(--color-secondary) 100%
  );
  border-radius: 2px;
}

.team-category-section .founder-section {
  margin-bottom: 2.5rem;
}

.team-category-section .founder-section:last-child {
  margin-bottom: 0;
}

.mission-card {
  background: white;
  padding: 3rem 2.5rem;
  border-radius: 1.5rem;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid #f3f4f6;
  border-top: 5px solid var(--color-primary);
  position: relative;
  overflow: hidden;
}

.mission-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  background: linear-gradient(
    90deg,
    var(--color-primary) 0%,
    var(--color-secondary) 100%
  );
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.mission-card:hover::before {
  transform: scaleX(1);
}

.mission-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12);
  border-top-color: var(--color-secondary);
}

.card-icon {
  display: inline-flex;
  padding: 1.25rem;
  background: linear-gradient(
    135deg,
    var(--color-primary) 0%,
    var(--color-secondary) 100%
  );
  border-radius: 1.25rem;
  color: white;
  margin-bottom: 1.75rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.mission-card:hover .card-icon {
  transform: scale(1.1) rotate(5deg);
}

.card-title {
  font-family: "Garamond", serif;
  font-size: clamp(1.5rem, 3vw, 1.8rem);
  font-weight: bold;
  color: var(--color-text-primary);
  margin-bottom: 1.25rem;
  letter-spacing: -0.02em;
  line-height: 1.3;
}

.card-text {
  font-family: var(--font-family-primary);
  color: var(--color-text-secondary);
  line-height: 1.8;
  font-size: 1.2rem;
  text-align: center;
}

/* Team Section */
.about-us-team {
  padding: 4rem 0;
  background: linear-gradient(180deg, #ffffff 0%, #f9fafb 100%);
}

.team-section {
  animation: fadeInUp 1s ease-out 0.8s both;
}

.team-title {
  font-family: "Garamond", serif;
  font-size: clamp(2.1rem, 3.6vw, 2.7rem);
  font-weight: bold;
  color: var(--color-text-primary);
  text-align: center;
  margin-bottom: 3rem;
  letter-spacing: -0.025em;
  line-height: 1.2;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 2rem;
}

.team-card {
  background: white;
  padding: 2rem;
  border-radius: 1.25rem;
  text-align: center;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid #f3f4f6;
}

.team-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
  border-color: var(--color-primary);
}

.team-image-wrapper {
  margin-bottom: 1.5rem;
}

.team-image {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  margin: 0 auto;
  border: 4px solid var(--color-primary);
  transition: all 0.3s ease;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

.team-card:hover .team-image {
  transform: scale(1.1);
  border-color: var(--color-secondary);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.team-image-placeholder {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    var(--color-primary) 0%,
    var(--color-secondary) 100%
  );
  color: white;
  font-size: 2rem;
  font-weight: 700;
  margin: 0 auto;
  border: 4px solid var(--color-primary);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

.team-name {
  font-family: "Garamond", serif;
  font-size: 1.35rem;
  font-weight: bold;
  color: var(--color-text-primary);
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

.team-role {
  font-family: var(--font-family-primary);
  font-size: 1.125rem;
  color: var(--color-primary);
  font-weight: 600;
  margin-bottom: 1rem;
  line-height: 1.4;
}

.team-description {
  font-family: var(--font-family-primary);
  color: var(--color-text-secondary);
  font-size: 1.125rem;
  line-height: 1.7;
}

/* Animations */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */

/* Tablets grandes y pantallas medianas */
@media (max-width: 1024px) {
  .founder-content {
    grid-template-columns: 260px 1fr;
    gap: 2.5rem;
    padding: 2rem;
  }

  .founder-image {
    max-width: 240px;
  }
}

/* Tablets */
@media (max-width: 968px) {
  .founder-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
    padding: 2rem 1.5rem;
  }

  .founder-image-wrapper {
    max-width: 250px;
    margin: 0 auto 1rem;
  }

  .founder-image {
    max-width: 250px;
  }

  .founder-badge {
    bottom: -12px;
  }

  .founder-info {
    align-items: center;
  }

  .credential-item {
    justify-content: center;
  }

  .mission-vision {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

/* Móviles grandes */
@media (max-width: 768px) {
  .about-us {
    padding: 4rem 0;
  }

  .header {
    margin-bottom: 3rem;
  }

  .title {
    font-size: clamp(1.75rem, 4vw, 2.25rem);
  }

  .team-category-section {
    margin-bottom: 3rem;
  }

  .team-category-title {
    font-size: clamp(1.5rem, 3.5vw, 2rem);
    margin-bottom: 2rem;
  }

  .team-category-section .founder-section {
    margin-bottom: 2rem;
  }

  .founder-content {
    padding: 1.75rem 1.25rem;
    gap: 1.5rem;
  }

  .founder-image-wrapper {
    max-width: 220px;
    margin-bottom: 0.5rem;
  }

  .founder-image {
    max-width: 220px;
  }

  .founder-name {
    font-size: clamp(1.375rem, 3vw, 1.75rem);
  }

  .founder-title {
    font-size: 1rem;
  }

  .bio-paragraph {
    font-size: 0.9375rem;
    text-align: center;
  }

  .credential-item {
    font-size: 0.875rem;
  }

  .mission-card {
    padding: 2rem 1.5rem;
  }

  .team-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.25rem;
  }

  .card-title {
    font-size: 1.125rem;
  }
}

/* Móviles medianos */
@media (max-width: 640px) {
  .container {
    padding: 0 1.25rem;
  }

  .about-us {
    padding: 3rem 0;
  }

  .header {
    margin-bottom: 2.5rem;
  }

  .founder-content {
    padding: 1.5rem 1rem;
  }

  .founder-image-wrapper {
    max-width: 200px;
  }

  .founder-image {
    max-width: 200px;
  }

  .founder-section {
    margin-bottom: 3rem;
  }

  .mission-vision {
    margin-bottom: 3rem;
  }

  .team-category-section {
    margin-bottom: 2.5rem;
  }

  .team-category-title {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .team-category-section .founder-section {
    margin-bottom: 1.5rem;
  }

  .team-grid {
    grid-template-columns: 1fr;
  }
}

/* Móviles pequeños */
@media (max-width: 480px) {
  .about-us {
    padding: 2.5rem 0;
  }

  .container {
    padding: 0 1rem;
  }

  .title {
    font-size: 1.5rem;
  }

  .subtitle {
    font-size: 0.9375rem;
  }

  .founder-content {
    padding: 1.25rem 0.875rem;
    gap: 1.25rem;
  }

  .founder-image-wrapper {
    max-width: 180px;
  }

  .founder-image {
    max-width: 180px;
    border-width: 3px;
  }

  .founder-badge {
    font-size: 0.75rem;
    padding: 0.4rem 1rem;
    bottom: -10px;
  }

  .founder-name {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }

  .founder-title {
    font-size: 0.875rem;
  }

  .bio-paragraph {
    font-size: 0.875rem;
    line-height: 1.6;
  }

  .founder-credentials {
    margin-top: 0.5rem;
  }

  .credentials-header h4 {
    font-size: 0.8125rem;
  }

  .credential-item {
    font-size: 0.8125rem;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .credential-item svg {
    width: 14px;
    height: 14px;
  }

  .mission-card {
    padding: 1.5rem 1.25rem;
  }

  .card-icon {
    padding: 0.875rem;
    margin-bottom: 1rem;
  }

  .card-icon svg {
    width: 24px;
    height: 24px;
  }

  .card-title {
    font-size: 1rem;
    margin-bottom: 0.75rem;
  }

  .card-text {
    font-size: 0.875rem;
    line-height: 1.6;
  }

  .team-card {
    padding: 1.25rem;
  }

  .team-image,
  .team-image-placeholder {
    width: 90px;
    height: 90px;
  }
}

/* Móviles extra pequeños */
@media (max-width: 360px) {
  .founder-image-wrapper {
    max-width: 160px;
  }

  .founder-image {
    max-width: 160px;
  }

  .founder-content {
    padding: 1rem 0.75rem;
  }

  .mission-card {
    padding: 1.25rem 1rem;
  }
}
</style>
