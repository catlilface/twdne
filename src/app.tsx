import { useMemo, useState } from "react"
import { getWebsite } from "./getWebsite"


let isGenerating = false


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
