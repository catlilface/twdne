import { OpenRouter } from "@openrouter/sdk";


const client = new OpenRouter({
    apiKey: localStorage.getItem("key")!
})


export async function getWebsite() {
    const keywords = window.location.pathname

    return await client.chat.send({
        model: localStorage.getItem("model")!,
        messages: [{
            role: "system",
            content: localStorage.getItem("prompt")!.replace("{keywords}", keywords),
        }],
        reasoning: {
            effort: "none"
        },
        stream: true
    })
}
