# UASD Chatbot

Chatbot web inteligente para consulta del **Estatuto Orgánico de la Universidad Autónoma de Santo Domingo (UASD)**. Permite a estudiantes, docentes y personal administrativo hacer preguntas en lenguaje natural y obtener respuestas basadas directamente en los artículos del Estatuto.

## Tecnologías

- **Frontend:** React 19 + TypeScript + Tailwind CSS
- **Backend:** Node.js + Express
- **IA:** Google Gemini (`@google/genai`)
- **Build:** Vite + esbuild

## Requisitos previos

- Node.js 18+
- Una API Key de [Google AI Studio](https://aistudio.google.com/)

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

3. Crea un archivo `.env` en la raíz del proyecto y agrega tu API Key:
   ```env
   GEMINI_API_KEY=tu_api_key_aquí
   ```

4. Inicia el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```

5. Abre tu navegador en [http://localhost:3000](http://localhost:3000)

## Build para producción

```bash
npm run build
npm start
```

## Estructura del proyecto

```
chatbot/
├── server/
│   ├── index.ts              # Servidor Express
│   ├── routes/chat.ts        # Endpoint de la API del chat
│   ├── utils/                # Utilidades del servidor
│   └── constants/            # Prompt del sistema y constantes
├── src/
│   ├── components/           # Componentes React (Sidebar, Chat, etc.)
│   ├── hooks/useChat.ts      # Lógica del chat
│   ├── services/chatService.ts # Comunicación con la API
│   ├── data/                 # Conocimiento del Estatuto
│   └── types/index.ts        # Tipos TypeScript
├── public/                   # Archivos estáticos
└── index.html
```

## Licencia

Proyecto académico — Universidad Autónoma de Santo Domingo (UASD).
