# UASD Chatbot — Estatuto Orgánico

Chatbot web inteligente para consulta del **Estatuto Orgánico de la Universidad Autónoma de Santo Domingo (UASD)**. Permite a estudiantes, docentes y personal administrativo hacer preguntas en lenguaje natural y obtener respuestas basadas directamente en el documento oficial.

## Demo en vivo

🔗 [felixdls10.github.io/chatbot](https://felixdls10.github.io/chatbot/)

---

## Tecnologías

- **Frontend:** React 19 + TypeScript + Tailwind CSS
- **Backend:** Node.js + Express
- **IA:** Google Gemini `gemini-2.5-flash` (`@google/genai`)
- **Build:** Vite + esbuild

---

## Fuente de información

El chatbot utiliza como base de conocimiento el **documento PDF oficial del Estatuto Orgánico de la UASD (edición 2012)**, obtenido de:

> https://postgrado.uasd.edu.do/wp-content/uploads/2024/06/ESTATUTO-ORGANICO-UASD.pdf

El PDF está incluido en el repositorio en `public/estatuto.pdf` para garantizar disponibilidad y evitar restricciones de CORS.

---

## Arquitectura

El chatbot opera de forma diferente según el entorno de ejecución:

### Modo local (desarrollo)

```
Navegador → /api/chat (Express) → Gemini Files API → Gemini lee el PDF → Respuesta
```

Al iniciar el servidor, el backend descarga el PDF y lo sube a la **Gemini Files API**. Cada consulta adjunta una referencia al archivo para que Gemini lo lea directamente.

### GitHub Pages (producción estática)

```
Navegador → descarga estatuto.pdf (mismo dominio) → base64 → Gemini inline → Respuesta
```

Como GitHub Pages no puede ejecutar Node.js, el frontend descarga el PDF del propio repositorio, lo convierte a base64 y lo adjunta inline en cada petición a Gemini. El PDF se cachea en `sessionStorage` para no descargarlo en cada mensaje.

---

## Requisitos previos

- Node.js 18+
- API Key de [Google AI Studio](https://aistudio.google.com/)

---

## Instalación y uso local

1. Clona el repositorio:
   ```bash
   git clone https://github.com/FelixDls10/chatbot.git
   cd chatbot
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea el archivo `.env.local` en la raíz del proyecto:
   ```env
   GEMINI_API_KEY=tu_api_key_aquí
   VITE_GEMINI_API_KEY=tu_api_key_aquí
   ```
   > Ambas variables deben tener el mismo valor.  
   > `GEMINI_API_KEY` la usa el servidor Express.  
   > `VITE_GEMINI_API_KEY` la usa el frontend (GitHub Pages).

4. Inicia el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```

5. Abre tu navegador en [http://localhost:3000](http://localhost:3000)

Al arrancar verás en la consola:
```
✅ Cliente Gemini inicializado correctamente.
📄 Descargando Estatuto Orgánico UASD desde la fuente oficial...
✅ Estatuto Orgánico cargado en Gemini Files API correctamente.
🚀 Iniciando en modo desarrollo con Vite...
✅ Servidor UASD Chatbot corriendo en http://localhost:3000
```

---

## Build para producción

```bash
npm run build
npm start
```

---

## Despliegue en GitHub Pages

El despliegue es automático al hacer push a `main` mediante GitHub Actions.

### Configurar el secreto de la API Key

En el repositorio de GitHub:  
**Settings → Secrets and variables → Actions → New repository secret**

| Nombre | Valor |
|---|---|
| `VITE_GEMINI_API_KEY` | tu API key de Google AI Studio |

### Flujo del workflow

1. GitHub Actions ejecuta `npm run build:static`
2. Vite compila el frontend inyectando `VITE_GEMINI_API_KEY`
3. El `dist/` (incluyendo `estatuto.pdf`) se despliega en GitHub Pages

---

## Estructura del proyecto

```
chatbot/
├── public/
│   └── estatuto.pdf              # PDF oficial del Estatuto Orgánico UASD
├── server/
│   ├── index.ts                  # Servidor Express + inicialización de Gemini
│   ├── routes/
│   │   └── chat.ts               # Endpoint POST /api/chat
│   ├── utils/
│   │   ├── geminiClient.ts       # Singleton del cliente Gemini
│   │   ├── pdfLoader.ts          # Carga del PDF en Gemini Files API
│   │   └── articleExtractor.ts   # Extrae artículos citados del texto
│   └── constants/
│       └── systemPrompt.ts       # Instrucción de sistema para Gemini
├── src/
│   ├── components/               # Componentes React (Sidebar, Chat, etc.)
│   ├── hooks/
│   │   └── useChat.ts            # Lógica de estado del chat
│   ├── services/
│   │   └── chatService.ts        # Comunicación con backend o Gemini directo
│   ├── data/
│   │   └── statuteKnowledge.ts   # Preguntas sugeridas del sidebar
│   ├── constants/
│   │   └── systemPrompt.ts       # System prompt para modo GitHub Pages
│   ├── utils/
│   │   └── articleExtractor.ts   # Extrae artículos citados (frontend)
│   └── types/
│       └── index.ts              # Tipos TypeScript
├── .github/
│   └── workflows/
│       └── deploy.yml            # GitHub Actions: build y deploy automático
├── .env.local                    # Variables de entorno locales (no se sube a git)
└── index.html
```

---

## Variables de entorno

| Variable | Usado en | Descripción |
|---|---|---|
| `GEMINI_API_KEY` | Servidor (Express) | API key para el backend en modo local |
| `VITE_GEMINI_API_KEY` | Frontend (Vite) | API key para GitHub Pages y build estático |

---

## Licencia

Proyecto académico — Universidad Autónoma de Santo Domingo (UASD).
