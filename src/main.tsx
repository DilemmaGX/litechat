import React, { useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { FluentProvider, webLightTheme, webDarkTheme } from '@fluentui/react-components';
import App from './App';
function getSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
}

const Root: React.FC = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>(getSystemTheme());

    React.useEffect(() => {
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        const handler = (e: MediaQueryListEvent) => setTheme(e.matches ? 'dark' : 'light');
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    const fluentTheme = useMemo(() => (theme === 'dark' ? webDarkTheme : webLightTheme), [theme]);

    return (
        <FluentProvider theme={fluentTheme} style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}>
            <App theme={theme} onThemeSwitch={() => setTheme(t => (t === 'light' ? 'dark' : 'light'))} />
        </FluentProvider>
    );
};

const style = document.createElement('style');
document.head.appendChild(style);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>
);