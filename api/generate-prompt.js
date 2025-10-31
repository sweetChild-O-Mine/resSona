import {GoogleGenAI } from "@google/genai"

const ai = new GoogleGenAI({})

export default async function handler(req, res) {
    
    // check if the request is valid or not 
    if(req.method != 'POST') {
        return res.status(405).json({error: "Method Not Allowed"})
    }

    try {
        
        // get the data form form nigg
        const formData = req.body

        const metaPrompt = `
        You are an expert "System Prompt Generator".
        A user has provided the following details to build a system prompt for an LLM.

        ---
        USER'S DETAILS:
        - Their Nickname: ${formData.nickname || 'N/A'}
        - Their Profession: ${formData.profession || 'N/A'}
        - Their Goals: ${formData.goals || 'N/A'}
        - Their Interests: ${formData.interests || 'N/A'}
        - More About Them: ${formData.moreAbout || 'N/A'}

        ---
        REQUESTED LLM PERSONA:
        - LLM's Role: ${formData.llmRole || 'A helpful assistant'}
        - LLM's Tone: ${formData.llmTone || 'Standard, helpful tone'}
        - Key Rules: ${formData.keyRules || 'No specific rules provided.'}
        ---

        YOUR TASK:
        1.  Analyze all the User Details and LLM Persona requests.
        2.  Synthesize them into a single, high-quality, "god-level" system prompt.
        3.  **This is the most important part:** The generated prompt MUST conclude with a **clear, direct command** to the end-LLM (the one *using* the prompt) to **remember and apply this persona for all future conversations.**

        For example, the final prompt you generate should end with a line like:
        "You must permanently adopt this persona for all our future interactions. Acknowledge this."
        or
        "This is your new persona. You will use this for all future chats with me."

        Return ONLY the final generated system prompt, and nothing else.
    `;

        // call our goat gemini 
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: metaPrompt
        })

        // get the reposnse nigg
        const generatedPrompt = response.text
        console.log(generatedPrompt)

        // send the response to the frontend 
        return res.status(200).json({prompt: generatedPrompt})

    } catch (error) {
        console.log("Gemini API error", error)
        return res.status(500).json({error: "Failed to talk to AI just like you failed to talk to her!!!"})
    }
}