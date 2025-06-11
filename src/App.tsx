import React, { useState, useRef } from 'react';
import {
  Button,
  Input,
  Textarea,
  Card,
  makeStyles,
  tokens,
  Dropdown,
  Option,
  Switch,
} from '@fluentui/react-components';
import ReactMarkdown from 'react-markdown';

const useStyles = makeStyles({
  container: {
    maxWidth: '480px',
    margin: '40px auto',
    padding: tokens.spacingHorizontalL,
    background: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusXLarge,
    boxShadow: tokens.shadow16,
  },
  chatBox: {
    minHeight: '320px',
    maxHeight: '400px',
    overflowY: 'auto',
    marginBottom: tokens.spacingVerticalM,
    background: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusMedium,
    padding: tokens.spacingHorizontalM,
    display: 'flex',
    flexDirection: 'column',
  },
  inputRow: {
    display: 'flex',
    gap: tokens.spacingHorizontalS,
    marginBottom: tokens.spacingVerticalS,
  },
  message: {
    margin: '8px 0',
    padding: '8px 12px',
    borderRadius: tokens.borderRadiusMedium,
    background: tokens.colorNeutralBackground3,
    wordBreak: 'break-word',
    maxWidth: '90%',
    alignSelf: 'flex-start',
  },
  user: {
    background: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    alignSelf: 'flex-end',
  },
  ai: {
    background: tokens.colorNeutralBackground4,
    color: tokens.colorNeutralForeground1,
    alignSelf: 'flex-start',
  },
});

type Message = {
  role: 'user' | 'ai';
  content: string;
};

type ProviderConfig = {
  name: string;
  value: string;
  apiUrl: string;
  model: string;
  getPayload: (messages: Message[], model: string) => any;
  getHeaders: (apiKey: string) => Record<string, string>;
  parseResponse: (data: any) => string;
};

const PROVIDERS: ProviderConfig[] = [
  {
    name: 'OpenAI ChatGPT',
    value: 'openai',
    apiUrl: 'https://api.openai.com/v1/chat/completions',
    model: 'gpt-3.5-turbo',
    getPayload: (messages, model) => ({
      model,
      messages: messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.content,
      })),
    }),
    getHeaders: (apiKey) => ({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    }),
    parseResponse: (data) => data.choices?.[0]?.message?.content || 'ERROR: No response',
  },
  {
    name: 'DeepSeek',
    value: 'deepseek',
    apiUrl: 'https://api.deepseek.com/v1/chat/completions',
    model: 'deepseek-chat',
    getPayload: (messages, model) => ({
      model,
      messages: messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.content,
      })),
    }),
    getHeaders: (apiKey) => ({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    }),
    parseResponse: (data) => data.choices?.[0]?.message?.content || '无响应',
  },
];

const App: React.FC<{ theme: 'light' | 'dark'; onThemeSwitch: () => void }> = ({ theme, onThemeSwitch }) => {
  const styles = useStyles();
  const [provider, setProvider] = useState<ProviderConfig>(PROVIDERS[0]);
  const [apiKey, setApiKey] = useState('');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (!input.trim() || !apiKey) return;
    const userMsg: Message = { role: 'user', content: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(provider.apiUrl, {
        method: 'POST',
        headers: provider.getHeaders(apiKey),
        body: JSON.stringify(provider.getPayload([...messages, userMsg], provider.model)),
      });
      const data = await res.json();
      const aiMsg: Message = { role: 'ai', content: provider.parseResponse(data) };
      setMessages((msgs) => [...msgs, aiMsg]);
    } catch (e) {
      setMessages((msgs) => [
        ...msgs,
        { role: 'ai', content: '请求失败，请检查 API 设置。' },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => {
        chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
      }, 100);
    }
  };

  return (
    <Card className={styles.container}>
      <div className={styles.inputRow}>
        <Dropdown
          style={{ minWidth: 140 }}
          value={provider.value}
          onOptionSelect={(_, data) => {
            const found = PROVIDERS.find(p => p.value === data.optionValue);
            if (found) setProvider(found);
          }}
        >
          {PROVIDERS.map(p => (
            <Option key={p.value} value={p.value}>
              {p.name}
            </Option>
          ))}
        </Dropdown>
        <Input
          placeholder="API Key"
          value={apiKey}
          onChange={(_, d) => setApiKey(d.value)}
          type="password"
          style={{ flex: 1 }}
        />
        <Switch
          checked={theme === 'dark'}
          onChange={onThemeSwitch}
          label={theme === 'dark' ? '深色' : '浅色'}
          style={{ marginLeft: 8, whiteSpace: 'nowrap' }}
        />
      </div>
      <div ref={chatRef} className={styles.chatBox}>
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`${styles.message} ${msg.role === 'user' ? styles.user : styles.ai}`}
            style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start' }}
          >
            <ReactMarkdown>{msg.content}</ReactMarkdown>
          </div>
        ))}
      </div>
      <div className={styles.inputRow}>
        <Textarea
          placeholder="Start chat by typing here..."
          autoFocus
          value={input}
          onChange={(_, d) => setInput(d.value)}
          style={{ flex: 1 }}
          rows={2}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          disabled={loading}
        />
        <Button appearance="primary" onClick={handleSend} disabled={loading || !input.trim()}>
          SEND
        </Button>
      </div>
    </Card>
  );
};

export default App;