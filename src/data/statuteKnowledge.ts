/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SuggestedQuestion, StatuteChapter } from "../types";

export const CATEGORIES = {
  GENERAL: "General y Principios",
  ORGANIZATION: "Organización y Gobierno",
  AUTHORITIES: "Autoridades Académicas",
  FACULTY: "Personal Docente",
  STUDENTS: "Estudiantes y Gobierno",
  ACADEMICS: "Investigación y Extensión",
  FUNDS: "Patrimonio y Autonomía"
};

export const SUGGESTED_QUESTIONS: SuggestedQuestion[] = [
  {
    id: "q1",
    category: CATEGORIES.GENERAL,
    question: "¿Qué es la Universidad Autónoma de Santo Domingo?",
    shortSnippet: "Constitución histórica, Bula papal y personería jurídica de la UASD."
  },
  {
    id: "q2",
    category: CATEGORIES.GENERAL,
    question: "¿Cuál es la misión de la UASD?",
    shortSnippet: "Fines fundamentales y aportes culturales e intelectuales a la sociedad."
  },
  {
    id: "q3",
    category: CATEGORIES.GENERAL,
    question: "¿Cuáles son los fines de la Universidad?",
    shortSnippet: "Objetivos estratégicos y funciones de desarrollo nacional según el Artículo 10."
  },
  {
    id: "q4",
    category: CATEGORIES.GENERAL,
    question: "¿Cuáles son las funciones fundamentales de la UASD?",
    shortSnippet: "Los tres pilares esenciales: docencia, investigación y extensión."
  },
  {
    id: "q5",
    category: CATEGORIES.GENERAL,
    question: "¿Qué establece el Estatuto sobre la autonomía universitaria?",
    shortSnippet: "Régimen de autonomía con responsabilidad, Ley 5778 y Ley 139-01."
  },
  {
    id: "q6",
    category: CATEGORIES.GENERAL,
    question: "¿Cuáles son los principios que orientan a la Universidad?",
    shortSnippet: "Espíritu democrático, justicia, solidaridad y libertad de pensamiento."
  },
  {
    id: "q7",
    category: CATEGORIES.ORGANIZATION,
    question: "¿Cómo está organizada la Universidad?",
    shortSnippet: "Estructuras de gobierno colegiadas y unipersonales de la institución."
  },
  {
    id: "q8",
    category: CATEGORIES.ORGANIZATION,
    question: "¿Cuáles son los organismos de gobierno de la UASD?",
    shortSnippet: "Relación de entes colegiados y unipersonales de dirección."
  },
  {
    id: "q9",
    category: CATEGORIES.ORGANIZATION,
    question: "¿Qué es el Claustro Mayor?",
    shortSnippet: "Autoridad máxima de la UASD, integración y quórum de votaciones."
  },
  {
    id: "q10",
    category: CATEGORIES.ORGANIZATION,
    question: "¿Qué es el Claustro Menor?",
    shortSnippet: "Integración, funciones legislativas internas y atribuciones."
  },
  {
    id: "q11",
    category: CATEGORIES.ORGANIZATION,
    question: "¿Qué es el Consejo Universitario?",
    shortSnippet: "Órgano de gobierno permanente, normativo y administrativo de la UASD."
  },
  {
    id: "q12",
    category: CATEGORIES.ORGANIZATION,
    question: "¿Quiénes integran el Consejo Universitario?",
    shortSnippet: "Composición detallada de autoridades académicas y delegados."
  },
  {
    id: "q13",
    category: CATEGORIES.ORGANIZATION,
    question: "¿Cuáles son las atribuciones del Consejo Universitario?",
    shortSnippet: "Aprobar planes de estudios, fijar tarifas y nombrar profesores."
  },
  {
    id: "q14",
    category: CATEGORIES.AUTHORITIES,
    question: "¿Cuáles son las funciones del Rector?",
    shortSnippet: "Estatus de máximo ejecutivo de la universidad, atribuciones y requisitos."
  },
  {
    id: "q15",
    category: CATEGORIES.AUTHORITIES,
    question: "¿Cuáles son las funciones de los Vicerrectores?",
    shortSnippet: "Áreas Temáticas: Docente, Investigación/Posgrado, Extensión y Administrativa."
  },
  {
    id: "q16",
    category: CATEGORIES.ORGANIZATION,
    question: "¿Qué son las Facultades?",
    shortSnippet: "Unidades fundamentales de la academia integradas por cátedras y escuelas."
  },
  {
    id: "q17",
    category: CATEGORIES.ORGANIZATION,
    question: "¿Cómo se organizan las Facultades?",
    shortSnippet: "Estructura interna: Decanatos, Cátedras, Escuelas e Institutos."
  },
  {
    id: "q18",
    category: CATEGORIES.ORGANIZATION,
    question: "¿Qué son los Consejos Directivos de Facultad?",
    shortSnippet: "Organismo colegiado de cogobierno de la facultad e integrantes."
  },
  {
    id: "q19",
    category: CATEGORIES.AUTHORITIES,
    question: "¿Cuáles son las funciones de los Decanos?",
    shortSnippet: "Representación de facultades, supervisión docente y atribuciones."
  },
  {
    id: "q20",
    category: CATEGORIES.ORGANIZATION,
    question: "¿Qué son las Escuelas?",
    shortSnippet: "Unidades académicas formadas por cátedras correspondientes a disciplinas."
  },
  {
    id: "q21",
    category: CATEGORIES.AUTHORITIES,
    question: "¿Cuáles son las funciones de los Directores de Escuela?",
    shortSnippet: "Elección, requisitos mínimos y dedicación exclusiva."
  },
  {
    id: "q22",
    category: CATEGORIES.ORGANIZATION,
    question: "¿Qué establece el Estatuto sobre los Recintos, Centros y Subcentros Universitarios?",
    shortSnippet: "Descentralización operativa, interdependencia geográfica y nomenclatura."
  },
  {
    id: "q23",
    category: CATEGORIES.FACULTY,
    question: "¿Qué establece el Estatuto sobre el personal docente?",
    shortSnippet: "Sistema de Carrera Académica: ingreso, deísmo, categorías e interinidad."
  },
  {
    id: "q24",
    category: CATEGORIES.FACULTY,
    question: "¿Cuáles son los derechos del personal docente?",
    shortSnippet: "Carrera Académica estable, libertad de cátedra y ascensos."
  },
  {
    id: "q25",
    category: CATEGORIES.FACULTY,
    question: "¿Cuáles son los deberes del personal docente?",
    shortSnippet: "Horas de servicio, tutoría, puntualidad y régimen disciplinario."
  },
  {
    id: "q26",
    category: CATEGORIES.STUDENTS,
    question: "¿Qué establece el Estatuto sobre los estudiantes?",
    shortSnippet: "Requisitos de inscripción, matrícula ordinaria y régimen de deberes."
  },
  {
    id: "q27",
    category: CATEGORIES.STUDENTS,
    question: "¿Cuáles son los derechos de los estudiantes?",
    shortSnippet: "Voto, integridad física/moral, asociación y representación estudiantil."
  },
  {
    id: "q28",
    category: CATEGORIES.STUDENTS,
    question: "¿Cuáles son los deberes de los estudiantes?",
    shortSnippet: "Asistencia, cooperación, conservación de patrimonio y ética."
  },
  {
    id: "q29",
    category: CATEGORIES.STUDENTS,
    question: "¿Qué establece el Estatuto sobre la representación estudiantil?",
    shortSnippet: "Cogobierno estudiantil (33.33%), requisitos como index de 80 y 30% créditos."
  },
  {
    id: "q30",
    category: CATEGORIES.ACADEMICS,
    question: "¿Qué establece el Estatuto sobre la investigación?",
    shortSnippet: "Pilar del modelo educativo, institutos de investigación y vicerrectoría."
  },
  {
    id: "q31",
    category: CATEGORIES.ACADEMICS,
    question: "¿Qué establece el Estatuto sobre el postgrado?",
    shortSnippet: "Programas de cuarto nivel (maestrías y doctorados) y Oficina General."
  },
  {
    id: "q32",
    category: CATEGORIES.ACADEMICS,
    question: "¿Qué establece el Estatuto sobre la extensión universitaria?",
    shortSnippet: "Articulación cultural y científica con la sociedad y labor comunitaria."
  },
  {
    id: "q33",
    category: CATEGORIES.STUDENTS,
    question: "¿Qué establece el Estatuto sobre el bienestar universitario?",
    shortSnippet: "Servicios de apoyo estudiantil, orientación profesional y becas."
  },
  {
    id: "q34",
    category: CATEGORIES.STUDENTS,
    question: "¿Qué establece el Estatuto sobre el régimen disciplinario?",
    shortSnippet: "Sanciones estudiantiles y docentes por faltas a las obligaciones internas."
  },
  {
    id: "q35",
    category: CATEGORIES.FUNDS,
    question: "¿Qué establece el Estatuto sobre el patrimonio universitario?",
    shortSnippet: "Propiedad de bienes, fuentes de ingresos (5% del presupuesto estatal)."
  }
];

export const GROUNDED_ANSWERS: Record<string, { answer: string; articles: string[]; links?: string[] }> = {
  "q1": {
    articles: ["Artículos 1, 2, 3"],
    answer: `La **Universidad Autónoma de Santo Domingo (UASD)** se define estatutariamente como:
- **Continuación Histórica:** Es la legítima heredera de la de la *Universidad de Santo Tomás de Aquino*, designada como Pontificia Universidad fundada el **28 de octubre de 1538** mediante la Bula *"In Apostolatus Culmine"* dictada por su Santidad el Papa Paulo III. Posteriormente declarada Real mediante Real Cédula del Rey Felipe V el 27 de julio de 1734.
- **Naturaleza Jurídica:** Es una institución pública y descentralizada del Estado, con autonomía totalmente garantizada por la Constitución de la República Dominicana, dotada de plena personería jurídica bajo el amparo de la **Ley No. 5778** (promulgada el 31 de diciembre de 1961) y ratificada por la **Ley No. 139-01** (del 13 de agosto de 2001).
- **Modelo Institucional:** Se sustenta en un modelo de **Universidad Nacional**, que une reflexivamente a profesores, estudiantes y servidores de apoyo administrativo para cumplir su misión de progreso nacional.`
  },
  "q2": {
    articles: ["Artículo 7, 8"],
    answer: `La **Misión de la Universidad Autónoma de Santo Domingo (UASD)** consiste en:
1. **Contribuir a elevar los niveles culturales** de la sociedad dominicana.
2. **Buscar la verdad**, proyectando un mejor porvenir y promoviendo la afirmación de los auténticos valores patrios.
3. **Formar críticamente** los investigadores, profesionales y técnicos necesarios para propiciar las transformaciones requeridas para el desarrollo nacional sostenible.
4. Desarrollar investigaciones científicas, humanísticas y tecnológicas para esclarecer las causas del subdesarrollo y la dependencia nacional, sugiriendo soluciones pragmáticas.
5. Difundir los ideales de la **cultura de paz, progreso, justicia social, equidad de género** y respeto absoluto a los derechos humanos.`
  },
  "q3": {
    articles: ["Artículo 10"],
    answer: `Los **Fines de la UASD** se orientan fundamentalmente hacia el cumplimiento de objetivos estratégicos que benefician a la sociedad dominicana (Artículo 10):
- **Incremento Educativo:** Expandir la educación superior para servir con equidad a los grandes intereses nacionales.
- **Formación de Calidad:** Preparar un número idóneo de profesionales cualificados para satisfacer las demandas concretas en los sectores social, productivo y de servicios.
- **Investigación como Eje:** Estimular la investigación científica y tecnológica como el método primordial para la enseñanza y el establecimiento verificable de la verdad histórica y científica.
- **Extensión Social:** Diseñar y expandir programas de extensión cultural y artística comunitaria.
- **Intercambio Académico:** Fortalecer relaciones e intercambios con universidades y centros científicos de relieve local e internacional.`
  },
  "q4": {
    articles: ["Artículo 4"],
    answer: `Las **Funciones Fundamentales de la UASD** son el núcleo de su modelo educativo institucional. De acuerdo con el Artículo 4, el modelo está sustentado de manera indisoluble sobre tres pilares interdependientes:
1. **La Docencia:** Transmisión metodológica de conocimientos para el desarrollo de competencias, fomento de la conciencia crítica, y el pensamiento reflexivo y creativo.
2. **La Investigación:** Generación continua de saberes científicos, tecnológicos y humanísticos que aporten soluciones directas a los desafíos del país.
3. **La Extensión:** Difusión y vinculación de la ciencia, el arte, la tecnología y el pensamiento universitario con los diferentes ámbitos de la sociedad civil y las comunidades populares.`
  },
  "q5": {
    articles: ["Artículo 1, 3, Glosario"],
    answer: `De acuerdo con el Estatuto Orgánico, la **autonomía universitaria de la UASD** se define como:
- **Base Constitucional y Legal:** Es una facultad garantizada expresamente por la Constitución de la República y normada por las **Leyes Núms. 5778 y 139-01**, asumiendo un *"Régimen de Autonomía con Responsabilidad"*.
- **Contenido General:** La autonomía otorga la plena potestad para dictar su propio Estatuto Orgánico, elegir internamente a todas sus autoridades y órganos legislativos, crear e implementar sus planes de estudios curriculares, elegir y nombrar a su personal docente o administrativo, y administrar soberanamente sus recursos económicos financieros públicos y privados.
- **Inviolabilidad del Fuero:** Conlleva la inviolabilidad de los recintos de la UASD (fuero universitario). Ninguna autoridad pública exterior puede ingresar a sus terrenos sin la anuencia explícita del Rector o del Consejo Universitario.`
  },
  "q6": {
    articles: ["Artículo 6, 9"],
    answer: `La vida y dinámica institucional en la UASD se orientan bajo los siguientes **principios y valores fundamentales**:
- **Democracia de Pensamiento:** La vida universitaria se desenvuelve dentro de un espíritu riguroso de democracia, justicia y solidaridad humana. Está abierta de par en par a todas las corrientes de pensamiento, analizadas científicamente.
- **Laicismo Académico:** Ningún organismo o individuo puede usar el nombre de la UASD o invocar su calidad académica para promover intereses partidarios, sectarios, económicos o de corte religioso particular (Artículo 5).
- **Valores Declarados:** Su Estatuto consagra valores vitales como la **solidaridad, transparencia, verdad, igualdad, libertad, equidad, tolerancia, paz, responsabilidad y convivencia** armónica (Artículo 9).`
  },
  "q7": {
    articles: ["Artículo 13"],
    answer: `La **organización estructural de la UASD** es de carácter múltiple y sistémico, dividida de la siguiente manera:
- **Estructura de Gobierno:** Organismos dotados de la misión de trazar políticas y tomar decisiones. Se dividen en:
  - *Colegiados:* Integrados por asambleas corporativas y delegaciones democráticas (ej. Claustros, Consejos).
  - *Unipersonales:* Ocupados por un único titular electo o designado (ej. Rector, Decanos, Directores).
- **Estructura Académica:** Responsable de la docencia directa, investigación formal y extensión, estructurada en los niveles de: **Técnico Superior**, **Grado** y **Posgrado**.
- **Estructura Administrativa:** Unidades de gestión financiera, logística y de apoyo que sirven de sostén a las labores docentes y científicas.`
  },
  "q8": {
    articles: ["Artículo 13, 14, 18"],
    answer: `Los **Organismos de Gobierno de la UASD** se clasifican bajo rigurosos criterios definidos por el Estatuto Orgánico:
1. **Organismos Colegiados (de Cogobierno):**
   - El **Claustro Mayor** (máxima autoridad) y el **Claustro Menor**.
   - El **Consejo Universitario** (órgano legislativo cotidiano).
   - Las Asambleas de Facultad y los Consejos Directivos de Facultad.
   - Las Asambleas de Recintos y Centros, junto a sus Consejos Directivos.
   - Las Asambleas de Escuelas y los Subconsejos Directivos de Escuelas.
   - La Asamblea de Cátetdra.
   - El Consejo General de Posgrado de la Universidad.
   - El de Investigaciones Científicas y el de Extensión.
2. **Organismos Unipersonales:**
   - La Rectoría y las Vicerrectorías.
   - La Secretaría General y la Vicesecretaría.
   - Los Decanatos y Vicedecanatos de Facultades.
   - Las Direcciones y Subdirecciones de Recintos, Centros y Subcentros.
   - Las Direcciones de Escuelas e Institutos de Investigación.`
  },
  "q9": {
    articles: ["Artículos 25, 26, 27, 28"],
    answer: `El **Claustro Mayor de la UASD** es la **autoridad máxima** de dirección institucional y de cogobierno.
- **Integración Democrática:** Está compuesto de manera representativa por:
  1. El personal académico en servicio activo a partir de la categoría de Profesor Adscrito.
  2. Los profesores meritísimos (activos y jubilados).
  3. Los delegados estudiantiles ante el Claustro, equivalente a un **33.33%** de la composición del Claustro.
  4. Los delegados en representación del personal administrativo, equivalente a un **2%** del claustro.
- **Atribuciones Principales (Artículo 28):**
  - Elegir al Rector/a y a los cuatro Vicerrectores/as en votaciones directas (de 8:00 AM a 8:00 PM).
  - Revocar de sus cargos a Rector/a y Vicerrectores por faltas graves (requiere voto favorable de las 2/3 partes).
  - Decidir y modificar la Filosofía, Principios y Fines de la UASD (voto mínimo de 2/3 partes).
- **Quórum:** Para sesionar válidamente en primera convocatoria se requiere el **60%** de los miembros inscritos.`
  },
  "q10": {
    articles: ["Artículos 29, 30, 31"],
    answer: `El **Claustro Menor de la UASD** es un organismo colegiado con funciones legislativas y de planificación:
- **Composición:** Con un tamaño equivalente al **15% del Claustro Mayor** (nunca menor de 300 ni mayor de 500 integrantes), se compone por:
  1. El Consejo Universitario al completo.
  2. Profesores elegidos por claustros de facultades en un porcentaje del **66.67%**.
  3. Representación estudiantil equivalente al **33.33%**.
  4. Representación del personal administrativo en un **2%** de su matrícula.
- **Principales Atribuciones (Artículo 31):**
  - Decidir sobre reformas parciales al Estatuto Orgánico (requiere voto de 2/3 partes de inscritos).
  - Aprobar el **Plan Estratégico de Desarrollo de la UASD** y evaluar las memorias anuales de gestión del Rector.
  - Conceder el título insigne de *Doctor Honoris Causa*.
  - Crear o suprimir Recintos, Centros y Subcentros Universitarios a propuesta del Consejo.`
  },
  "q11": {
    articles: ["Artículos 32, 33, 34"],
    answer: `El **Consejo Universitario** es el organismo colegiado que ejerce el gobierno de administración permanente de la UASD de forma continua.
- **Sesiones:** Se reúne de manera ordinaria dos (2) veces al mes, convocado por el Rector/a, y con quórum válido de las dos terceras partes (2/3) de sus integrantes. Sus acuerdos se adoptan con la mayoría absoluta de votos favorables de los presentes.
- **Misión de Gestión:** Es el responsable directo de regular, coordinar y poner en marcha las resoluciones de política y reglamentación, sirviendo de puente cotidiano entre la Rectoría, las facultades, el Claustro Menor y toda la comunidad de la UASD.`
  },
  "q12": {
    articles: ["Artículo 32"],
    answer: `De acuerdo con el Artículo 32, el **Consejo Universitario** está integrado, con derecho a voz y voto, por:
1. El **Rector o Rectora** de la Universidad, quien asume la presidencia.
2. Los **cuatro Vicerrectores/as** (Docente, Investigación y Posgrado, Extensión, Administrativo).
3. Los **Decanos/as** de las distintas Facultades (actualmente 9 facultades).
4. Un representante elegido de los Recintos Universitarios.
5. Un representante elegido de los Centros Universitarios.
6. Los delegados y delegadas estudiantiles, cuya representación reglamentaria en este consejo ascenderá siempre al **33.33%** del total de miembros.
7. Dos representantes directos del gremio profesoral.
8. Un representante elegido por el gremio de trabajadores de apoyo administrativo.
- **Asistencia Especial:** El **Secretario/a General** de la Universidad actúa en calidad de Secretario de las sesiones del Consejo, con derecho a voz pero strictly **sin voto**.`
  },
  "q13": {
    articles: ["Artículo 34"],
    answer: `El **Consejo Universitario** ostenta una lista muy extensa de atribuciones normativas fundamentales (Artículo 34):
- **Ámbito Académico:** Aprobar y coordinar los planes de estudios generales formulados por las Asambleas de Facultad; reglamentar matrículas, exámenes, inscripciones, investiduras y equivalencias nacionales e internacionales de títulos.
- **Ámbito Administrativo y Financiero:** Reglamentar y supervisar el desenvolvimiento de las tareas administrativas, fiscalizar pormenorizadamente los ingresos y egresos financieros de la UASD, conocer y aprobar el presupuesto general anual.
- **Ámbito Docente:** Crear, reorganizar o suprimir Escuelas e Institutos académicos de investigación; nombrar formalmente a los profesores adscritos, adjuntos y de categoría de méritos, asumiendo su escala salarial.
- **Ámbito de Disciplina:** Reglamentar e instrumentar los regímenes disciplinarios que atañen a docentes, administrativos y estudiantes.`
  },
  "q14": {
    articles: ["Artículos 35, 36, 37, 38"],
    answer: `La **Rectoría** constituye la máxima instancia ejecutiva unipersonal de la UASD.
- **Requisitos de Elección (Artículo 35):** Debe ser de nacionalidad dominicana, mayor de edad, con ejercicio pleno de derechos civiles, docente activo con un mínimo de **10 años** de carrera de escalafón académico formal, tener grado mínimo de Maestría o Doctorado (PhD) y haber desempeñado cargos universitarios directivos previos.
- **Período y Reelección:** Su período es representativo de **cuatro (4) años**. Se instituye una **prohibición estricta de reelección inmediata** de manera consecutiva para el mismo cargo del Rector.
- **Línea de Funciones (Artículo 38):**
  - Representar judicial y legalmente a la UASD en demandas y actos jurídicos.
  - Velar por el fiel cumplimiento del Estatuto Orgánico, reglamentos e instrucciones de los Claustros.
  - Presidir de forma nata las asambleas del Claustro Mayor, Claustro Menor y Consejo Universitario.
  - Dirigir las transacciones patrimoniales y rendir la memoria anual de labores de gestión.`
  },
  "q15": {
    articles: ["Artículos 39, 40, 41, 42, 43"],
    answer: `La UASD cuenta con **cuatro (4) Vicerrectores/as**, electos simultáneamente junto al Rector para un mandato idéntico de cuatro años:
1. **Vicerrector/a Docente (Artículo 40):** Diseña y supervisa las políticas relacionadas con la docencia presencial, semipresencial y virtual de grado, velando por la actualización de personal académico y coordinando la Comisión Docente.
2. **Vicerrector/a de Investigación y Posgrado (Artículo 41):** Dirige el fomento de proyectos de investigación formal, supervisa el Fondo Concursable de Investigación, preside el Consejo de Posgrado y el Consejo Científico, y gestiona la propiedad intelectual.
3. **Vicerrector/a de Extensión (Artículo 42):** Articula las facultades con la sociedad civil, formula programas artísticos y culturales universitarios y dirige la vinculación comunitaria.
4. **Vicerrector/a Administrativo/a (Artículo 43):** Responsable inmediato de coordinar presupuestos, supervisar seguridad social de académicos, bienestar laboral y fiscalizar el inventario físico patrimonial de la institución.`
  },
  "q16": {
    articles: ["Artículo 14, 15, 16"],
    answer: `Las **Facultades** son las unidades académicas fundamentales de la UASD destinadas a desarrollar de forma integrada docencia, investigación y extensión.
- **Constitución:** De conformidad con el Artículo 16, para que una Facultad exista formalmente debe estar constituida obligatoriamente por un **mínimo de dos (2) escuelas** del mismo campo u orientación de saberes.
- **Especialidades:** Tienen como fin estructurar bajo un orden disciplinario las actividades de grado, cátedras y de investigación complementarias.`
  },
  "q17": {
    articles: ["Artículo 14, 16, 17"],
    answer: `La UASD se organiza académicamente a través de **nueve (9) Facultades oficiales** (Artículo 14):
1. Facultad de **Humanidades**
2. Facultad de **Ciencias**
3. Facultad de **Ciencias Económicas y Sociales**
4. Facultad de **Ciencias Jurídicas y Políticas**
5. Facultad de **Ingeniería y Arquitectura**
6. Facultad de **Ciencias de la Salud**
7. Facultad de **Ciencias Agronómicas y Veterinarias**
8. Facultad de **Artes**
9. Facultad de **Ciencias de la Educación**
- **Estructura Interna Académica:** Cada Facultad organiza su oferta de estudios superiores mediante **Escuelas**, divididas a su vez en **Cátedras** (unidad académica básica), y cuenta con **Institutos** dedicados a la investigación científica especializada.`
  },
  "q18": {
    articles: ["Artículo 53, 54, 55, 56"],
    answer: `El **Consejo Directivo de Facultad** es el órgano colegiado de cogobierno más importante de cada facultad:
- **Integrantes (Artículo 53):**
  - **Decano o Decana**, quien lo preside de manera natural.
  - **Vicedecano o Vicedecana**, quien actúa como Secretario del consejo.
  - Los **Directores/as de las Escuelas, Institutos y Posgrados** de la facultad.
  - El Director de Investigación de la Facultad.
  - Tres (3) profesores representantes de la Asociación de Profesores (gremial).
  - Delegación estudiantil equivalente al **33.33%** de la matrícula del consejo directivo.
  - Los profesores meritísimos pertenecientes a dicha facultad.
- **Atribuciones (Artículo 56):** Elaborar el reglamento interno de la facultad; coordinar programas curriculares; proponer presupuestos de gastos; y aplicar sanciones reglamentarias de primera instancia.`
  },
  "q19": {
    articles: ["Artículo 51, 57, 58, 61, 62"],
    answer: `El **Decano o Decana** ejerce como máxima autoridad unipersonal de una Facultad.
- **Mandato y Requisitos:** Electo/a por la Asamblea de Facultad para un período rígido de **cuatro (4) años**. Requiere maestría, ser docente en servicio activo con **10 años o más** de carrera académica, y dedicarse de forma exclusiva al servicio docente de la facultad (Artículo 62).
- **Atribuciones (Artículo 61):**
  - Asumir la representación oficial de su respectiva Facultad.
  - Formar parte con derecho a voto de las sesiones del Consejo Universitario.
  - Informar mensualmente sobre inasistencias injustificadas de profesores a clases o exámenes.
  - Nombrar a los jurados examinadores académicos de su jurisdicción.`
  },
  "q20": {
    articles: ["Artículo 17, 18"],
    answer: `Las **Escuelas** de la UASD son las unidades directas de gestión docente y de planificación curricular en la universidad:
- **Funcionamiento (Artículo 17):** Se configuran como unidades integradas por varias **Cátedras** correspondientes de manera específica a ramas del saber estrechamente vinculadas. El Estatuto instituye que *"no habrá más de una Escuela para una misma rama o disciplina"* en toda la universidad para evitar duplicidad.
- **Funcionalidad:** Administran las carreras profesionales de Grado y las de nivel Técnico Superior, diseñando planes de estudio y originando programas académicos de cuarto nivel (Especialidades de Postgrado).`
  },
  "q21": {
    articles: ["Artículo 63, 53, 54"],
    answer: `El **Director de Escuela** es el encargado de gerenciar, planificar y supervisar la labor de las cátedras y profesores adscritos.
- **Requisitos de Elección (Artículo 63):** Dominicano, mayor de edad, profesor activo de la respectiva Facultad con rango curricular superior, maestría obligatoria, carrera académica mínima de **siete (7) años**, y haber desempeñado cargos dirigenciales internos.
- **Elección e Incompatibilidades:** Son elegidos de manera exclusiva por la asamblea eleccionaria de docentes asignados a la Escuela. Deben laborar bajo régimen estricto de **dedicación exclusiva** en sus funciones administrativas y de aula.`
  },
  "q22": {
    articles: ["Capítulo II, Artículo 3, 12, 14, 20"],
    answer: `El Estatuto de la UASD consagra una estructura extendida geográficamente con el fin de descentralizar la educación superior pública:
- **Composición del Patrimonio:** La universidad está integrada por una **Sede Central** (ubicada en Santo Domingo, Distrito Nacional), y un conjunto de **Recintos, Centros y Subcentros Universitarios** estratégicos en provincias (Artículo 3).
- **Relación Institucional:** Operan bajo un régimen de **centralización normativa** (las políticas se deciden de manera unificada por el Consejo y Claustros) pero adoptando una **descentralización operativa** de forma autónoma.
- **Reglamentación de Categoría:** De acuerdo al nivel de maduración presupuestaria, cantidad de matriculados y desarrollo de investigación, los Centros pueden transformarse en **Recintos**, la categoría superior de descentralización.`
  },
  "q23": {
    articles: ["Artículos 64, 65, 66"],
    answer: `El **Personal Académico de la UASD** se rige estatutariamente por el riguroso **Sistema de Carrera Académica** (Artículo 65):
- **Esterial de Carrera:** Se formula como un cuerpo que consagra y regula los derechos, deberes, ingreso, categorización y jubilaciones del cuerpo profesoral, científico y de extensión.
- **Clasificación del Personal (Artículo 66):**
  - *Docentes y Auxiliares* de carrera en el nivel de Grado y de Posgrado.
  - *Investigadores y Auxiliares* adscritos a proyectos de indagación científica.
  - *Extensionistas* y auxiliares adscritos a educación continuada.
  - *Docentes Interinos* y de estatus especial.
- **Inicio de Carrera:** Se inicia formalmente como Monitor de carrera, o en su defecto escalando paulatinamente bajo concurso de oposición.`
  },
  "q24": {
    articles: ["Artículos 65, 84, Glosario"],
    answer: `Los **derechos fundamentales del Personal Docente** de la UASD amosparados por este Estatuto comprenden:
- **Estabilidad Laboral:** Garantizada por el Sistema de Carrera Académica e ingreso meritorio por concurso (Artículo 65).
- **Libertad de Cátedra:** Derecho absoluto de emitir expresiones u opiniones científicas o humanísticas en el desarrollo de la docencia sin miedos a represalias de ninguna índole.
- **Defensa ante Evaluaciones:** Los profesores disponen de la *Comisión de Apelación del Personal Académico* para ejercer su legítima defensa frente a evaluaciones que consideren infundadas (Artículo 84).
- **Licencia Sabática:** Derecho a disfrutar de un **año sabático** remunerado tras 10 años de docencia activa ininterrumpida para propiciar su desarrollo e investigación.`
  },
  "q25": {
    articles: ["Artículos 90, 93, 94, 96"],
    answer: `El Estatuto de la UASD impone claros y firmes **deberes y responsabilidades al Personal Docente** para salvaguardar la excelencia del servicio:
- **Prestación de Servicios (Artículo 90):** Rendir servicio directo de aula y, simultáneamente, dedicar un tiempo equivalente al **50% de las horas lectivas** para asesorar, realizar tutorías de estudiantes, consultas presenciales/virtuales, corregir pruebas e investigar.
- **Pérdida de Docencia por Ausentismo (Artículo 93):** Se consagra la pérdida automática de la asignatura si el docente acumula **más del 10% de ausencias injustificadas** en el curso de un período lectivo.
- **Pérdida por Calificaciones (Artículo 94):** Perderán el derecho a impartir asignaturas si no entregan actas de calificaciones de estudiantes en un máximo de **30 días** tras culminar el semestre.
- **Sanción de Sueldo (Artículo 96):** Descuento del **5% del sueldo de un mes** por faltar sin excusa válida a sesiones del Claustro o actos académicos solemnes.`
  },
  "q26": {
    articles: ["Capítulo XIII, Artículos 97, 98, 99"],
    answer: `El ingreso y permanencia de **los estudiantes en la UASD** contempla las siguientes pautas del Estatuto:
- **Inscripción Exigida (Artículo 97):** Para ostentar la calidad de estudiante matriculado se requiere fundamentalmente el título oficial de Bachiller validado por el Ministerio de Educación nacional y cumplir los exámenes reglamentarios.
- **Tipos de Matrícula (Artículo 99):**
  - *Matrícula Ordinaria:* Para los estudiantes regulares que cursan las asignaturas estructuradas en el plan de estudios general de su respectiva facultad.
  - *Matrícula por Asignaturas:* Diseñada para cursar asignaturas aisladas, interfacultades de perfeccionamiento, o de extensión libre.
- **Incompatibilidades:** El estudiante está en obligación de someterse y guiar su conducta con base al Código de Ética y someterse a evaluaciones de asistencia periódicas.`
  },
  "q27": {
    articles: ["Artículo 100"],
    answer: `De conformidad con el Artículo 100 de su Estatuto Orgánico, **los estudiantes de la UASD disfrutan de los siguientes Derechos Fundamentales**:
1. **Derecho de Asociación:** Libertad formal de organizarse en grupos estudiantiles, colectivos culturales y gremios representativos.
2. **Derecho a Elegir y ser Elegidos:** Votar y postularse en procesos democráticos de elección de delegados ante los organismos de gobierno.
3. **Derecho a la Integridad Física y Moral:** Recibir tratos con absoluto respeto a su dignidad personal por parte de profesores y directivos.
4. **Representación Estudiantil:** Participar por medio de delegados en un **33.33%** en todas las asambleas y consejos universitarios.
5. **Derecho de Defensa:** Formular alegatos, defensas y apelaciones formales ante casos de sanciones o dificultades que les afecten.`
  },
  "q28": {
    articles: ["Artículo 101"],
    answer: `El Artículo 101 del Estatuto establece un conjunto estricto de **Deberes del Estudiante** de la UASD:
- **Asistencia Obligatoria:** Asistir con rigurosa puntualidad a clases teóricas, prácticas, laboratorios y convocatorias de exámenes oficiales evaluativos.
- **Acatar Reglamentos:** Respetar de manera integral las leyes, el Estatuto Orgánico, los reglamentos y disposiciones válidas del Consejo Universitario.
- **Conducta Digna:** Mantener un comportamiento ético, digno y de respeto tanto dentro de los recintos como fuera en su rol representativo ciudadano.
- **Conservación Física:** Colaborar de manera proactiva con la preservación de los edificios, mobiliario, laboratorios, bibliotecas y áreas verdes de la UASD.
- **Deber Democrático:** Participar con su voto obligatorio en las elecciones de delegados al cogobierno.`
  },
  "q29": {
    articles: ["Artículos 104, 105, 106, 107"],
    answer: `La **representación estudiantil (Cogobierno Estudiantil)** es un eje fundamental de la gobernanza de la UASD:
- **Proporción de Oro (Artículo 105):** El Student Power se consagra otorgándoles una representación del **33.33%** (una tercera parte del total) en el Claustro Mayor, Claustro Menor, Consejo Universitario, Asambleas y Consejos de Facultad.
- **Requisitos Rigurosos de Elegibilidad (Artículo 106):** Para postularse como delegado estudiantil a un organismo se debe cumplir obligatoriamente:
  1. Estar legalmente matriculado.
  2. **No ser alumno repitiente** o aplazado de forma mayoritaria en el semestre anterior.
  3. Haber aprobado un mínimo del **30% de los créditos curriculares** de la carrera elegida.
  4. Ostentar un **índice académico acumulado de 80 puntos o más**.`
  },
  "q30": {
    articles: ["Artículo 4, 10, 21, 41"],
    answer: `La **investigación** científica y tecnológica es tratada por el Estatuto Orgánico como un pilar fundamental e innegociable de la vida universitaria de la UASD:
- **Modelo Integrado:** Impulsa la articulación de la investigación básica con la docencia para elevar la validez de los saberes académicos impartidos en el aula (Artículo 4).
- **Agentes de Investigación (Artículo 21):** Se descentraliza a través de los **Institutos de Investigación**, adscritos orgánicamente a las facultades bajo supervisión de la comisión de investigación evaluadora.
- **Políticas e Incentivos:** Su planificación corre bajo la batuta del Vicerrector de Investigación y Posgrado, quien regula el Fondo Concursable de Investigación académica institucional para financiar proyectos útiles para el desarrollo dominicano.`
  },
  "q31": {
    articles: ["Artículos 11, 13b, 18, 41, 143"],
    answer: `Los estudios de **Postgrado (Inscripciones de Cuarto Nivel)** están reglamentados de la siguiente forma por el Estatuto:
- **Integridad Académica:** Permiten la especialización tras la obtención de un título de Licenciatura o similar de grado básico.
- **Requisitos de Admisión (Artículo 143):** Poseer el título oficial de Grado o Licenciatura y reunir los demás lineamientos curriculares y de idiomas aprobados.
- **Desarrollo curricular:** Comprende los programas específicos de Maestría, Especialidades Profesionales de campo y Doctorados coordinados académicamente por la *Dirección General de Postgrado* y el consejo de postgrados institucional.`
  },
  "q32": {
    articles: ["Artículo 4, 10, 42, Glosario"],
    answer: `La **Extensión Universitaria** es catalogada como por el Estatuto como una de las funciones fundamentales insustituibles de la UASD:
- **Misión de Vinculación:** Consiste en la transferencia bidireccional de ciencia, tecnología, arte e investigación hacia las comunidades dominicanas, promoviendo el desarrollo social y participando en los desafíos del país de forma directa.
- **Organización:** Planificada bajo rectoría de la Vicerrectoría de Extensión, asumiendo tareas de educación continuada, servicio social estudiantil de carreras de salud, campañas sanitarias, brigadas técnicas de desastres, y fomento de las expresiones artísticas y folclóricas populares dominicanas.`
  },
  "q33": {
    articles: ["Artículo 101, 110"],
    answer: `El **Bienestar Universitario** constituye el conjunto coordinado de programas logísticos y de acompañamiento que asiste a los estudiantes en su vida académica:
- **Misión Social:** La UASD, dada su naturaleza pública nacional, promueve la equidad social.
- **Asistencia Estudiantil:** Se encarga de proveer comedores universitarios integrales con raciones subvencionadas, residencias estudiantiles temporales en provincias, becas nacionales y de intercambio educativo de excelencia, servicios sanitarios primarios en dispensarios médicos de facultades, orientación psicológica y orientación laboral profesional estudiantil continua.`
  },
  "q34": {
    articles: ["Artículos 34e, 102, 103"],
    answer: `El **Régimen Disciplinario** de la UASD rige de forma independiente para estudiantes y personal docente:
- **Sanciones a Estudiantes (Artículo 102):** Por faltas o violaciones académicas éticas, les serán impuestas las siguientes amonestaciones según gravedad:
  a) Amonestación de carácter privado.
  b) Reenvío programado de examen.
  c) Pérdida total de derecho a examen semestral.
  d) Suspensión temporal aplicable de su inscripción de matrícula.
  e) Expulsión de la UASD.
- **Sanciones a Docentes:** Por faltas como el ausentismo (superior al 10%) o retraso inexcusables de actas, se asume desde amonestaciones, suspensión temporal o remoción, sancionadas por el Consejo Universitario de primera instancia.`
  },
  "q35": {
    articles: ["Artículo 3, 111, 112, 113, 114, 115"],
    answer: `El **patrimonio y fuentes de ingresos de la UASD** se encuentran regulados de manera sumamente estricta en el Capítulo XVI:
- **Propiedad Inviolable (Artículo 111):** Todos los bienes raíces, edificaciones, muebles, patentes, obras artísticas e intelectuales consolidadas en el campus son patrimonio propio de la UASD y tienen la condición de inalienables.
- **Fuentes de Ingresos Financieros (Artículo 112):**
  a) La subvención del Estado dominicano correspondiente al **5% del presupuesto general público de la nación** de acuerdo a las Leyes Núms. 5778 y 139-01.
  b) Ingresos o cobros de tasas estudiantiles por servicios académicos o de laboratorios.
  c) Utilidades de empresas universitarias legalmente constituidas de forma independiente.
  d) Donaciones e incentivos auspiciados por organismos e instituciones del exterior, y el producto de patentes propias.`
  }
};

export const KNOWLEDGE_SUMMARY = `
Este chatbot interactivo de la UASD está fundamentado estrictamente en el contenido oficial del "Estatuto Orgánico de la Universidad Autónoma de Santo Domingo", modificado y aprobado en las sesiones del Claustro Mayor del año 2012 bajo la rectoría del Dr. Mateo Aquino Febrillet.

El patrimonio histórico de la UASD se inicia con el papado de Paulo III mediante la bula papal "In Apostolatus Culmine" el 28 de octubre de 1538. El estatuto contempla una estructura de cogobierno con alta participación estudiantil de 33.33% y docente, amparada por la autonomía de la ley 5778 y la ley de educación superior 139-01.
`;
