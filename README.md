# Litechat

<p align="center">
   <img src="https://custom-icon-badges.demolab.com/badge/React-20232A?logo=react&logoColor=61DAFB&style=for-the-badge" alt="React Badge"/>
   <img src="https://custom-icon-badges.demolab.com/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=for-the-badge" alt="TypeScript Badge"/>
   <img src="https://custom-icon-badges.demolab.com/badge/Vite-646CFF?logo=vite&logoColor=FFD62E&style=for-the-badge" alt="Vite Badge"/>
   <img src="https://custom-icon-badges.demolab.com/badge/FluentUI-0078D4?logo=fluentui&logoColor=white&style=for-the-badge" alt="Fluent UI Badge"/>
   <img src="https://custom-icon-badges.demolab.com/badge/Markdown-000000?logo=markdown&logoColor=white&style=for-the-badge" alt="Markdown Badge"/>
</p>

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