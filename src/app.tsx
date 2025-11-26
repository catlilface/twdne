import { useMemo, useState } from "react"
import { getWebsite } from "./getWebsite"
import prompt from "./prompt.md?raw"


let isGenerating = false

if (!localStorage.getItem("prompt")) {
    localStorage.setItem("prompt", prompt)
}

if (!localStorage.getItem("key")) {
    localStorage.setItem("key", window.prompt("Введите ваш ключ OpenRouter. \nДа, это безопасно. Ключ никуда не передается и хранится только на вашем устройстве")!)
}

if (!localStorage.getItem("model")) {
    localStorage.setItem("model", window.prompt("Введите название модели для генерации. По умолчанию, openai/gpt-oss-20b:free") || "openai/gpt-oss-20b:free")
}


const App = () => {
    const [content, setContent] = useState("")
    useMemo(async () => {
        if (isGenerating) return

        isGenerating = true
        const stream = await getWebsite()

        for await (const chunk of stream) {
            setContent(prev => prev + chunk.choices[0].delta.content)
        }
    }, [])

    return <div dangerouslySetInnerHTML={{ __html: content }} />
}


export default App
