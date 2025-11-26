import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app'
import prompt from "./prompt.md?raw"


if (!localStorage.getItem("prompt")) {
    localStorage.setItem("prompt", prompt)
}

if (!localStorage.getItem("key")) {
    localStorage.setItem("key", window.prompt("Введите ваш ключ OpenRouter. \nДа, это безопасно. Ключ никуда не передается и хранится только на вашем устройстве")!)
}

if (!localStorage.getItem("model")) {
    localStorage.setItem("model", window.prompt("Введите название модели для генерации. По умолчанию, openai/gpt-oss-20b:free") || "openai/gpt-oss-20b:free")
    window.location.reload()
}


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
