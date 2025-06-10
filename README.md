# Litechat

Litechat is a lightweight chat frontend built with React, TypeScript, and Vite.  
**No data or API keys are stored locally—everything stays in memory, making it safe and privacy-friendly.**

## Features

- Minimal, clean, and responsive UI
- Supports multiple AI chat providers (OpenAI, DeepSeek, etc.)
- No chat history or API key is saved to local storage, cookies, or any server
- Light/Dark theme toggle
- Markdown message rendering

## Getting Started

1. Clone this repository and install dependencies:

   ```sh
   git clone https://github.com/yourname/litechat.git
   cd litechat
   npm install
   ```

2. Start the development server:

   ```sh
   npm run dev
   ```

3. Open your browser at `http://localhost:5173`, enter your API key, and start chatting.

## Security & Privacy

- Litechat does **not** store your API key or chat content anywhere—everything is kept in memory only.
- All data is cleared when you refresh or close the page.

## Build

```sh
npm run build
```

## Dependencies

- React
- TypeScript
- Vite
- @fluentui/react-components
- react-markdown

## License

MIT