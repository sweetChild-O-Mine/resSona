import {GoogleGenAI } from "@google/genai"

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
})

export default async function handler(req, res) {
    
    // check if the request is valid or not 
    if(req.method != 'POST') {
        return res.status(405).json({error: "Method Not Allowed"})
    }

    try {
        
        // get the data form form nigg
        const formData = req.body

    //     const metaPrompt = `
    //     You are an expert "System Prompt Generator".
    //     A user has provided the following details to build a system prompt for an LLM.

    //     ---
    //     USER'S DETAILS:
    //     - Their Nickname: ${formData.nickname || 'N/A'}
    //     - Their Profession: ${formData.profession || 'N/A'}
    //     - Their Goals: ${formData.goals || 'N/A'}
    //     - Their Interests: ${formData.interests || 'N/A'}
    //     - More About Them: ${formData.moreAbout || 'N/A'}

    //     ---
    //     REQUESTED LLM PERSONA:
    //     - LLM's Role: ${formData.llmRole || 'A helpful assistant'}
    //     - LLM's Tone: ${formData.llmTone || 'Standard, helpful tone'}
    //     - Key Rules: ${formData.keyRules || 'No specific rules provided.'}
    //     ---

    //     YOUR TASK:
    //     1.  Analyze all the User Details and LLM Persona requests.
    //     2.  Synthesize them into a single, high-quality, "god-level" system prompt.
    //     3.  **This is the most important part:** The generated prompt MUST conclude with a **clear, direct command** to the end-LLM (the one *using* the prompt) to **remember and apply this persona for all future conversations.**

    //     For example, the final prompt you generate should end with a line like:
    //     "You must permanently adopt this persona for all our future interactions. Acknowledge this."
    //     or
    //     "This is your new persona. You will use this for all future chats with me."

    //     Return ONLY the final generated system prompt, and nothing else.
    // `;

        const metaPrompt = `
        You are an expert "System Prompt Generator" for creating LLM memory profiles.

        USER PROFILE:
        - Nickname: ${formData.nickname || 'N/A'}
        - Profession: ${formData.profession || 'N/A'}
        - Goals: ${formData.goals || 'N/A'}
        - Interests: ${formData.interests || 'N/A'}
        - Additional Context: ${formData.moreAbout || 'N/A'}

        DESIRED LLM BEHAVIOR:
        - Role: ${formData.llmRole || 'helpful assistant'}
        - Tone: ${formData.llmTone || 'professional'}
        - Special Rules: ${formData.keyRules || 'None'}

        ---

        GENERATE a system prompt that:

        1. **STORES every information of user profile in memory** (not for immediate conversation)
        2. Uses **declarative memory statements** like:
        - "Remember: ${formData.nickname} is a ${formData.profession}..."
        - "Remember User's goals which include: ${formData.goals}..."
        - "Remember to Always maintain ${formData.llmTone} tone when responding..."

        3. **ENDS with SILENT memory lock** (no acknowledgment request):
        - "Store this profile permanently."
        - "Apply this persona only when relevant to the conversation."
        
        4. **AVOID phrases like:**
        ❌ "Acknowledge this"
        ❌ "Confirm understanding"
        ❌ "Ready to assist"
        
        5. **STRUCTURE:**
        - Section 1: User Profile (declarative facts)
        - Section 2: Behavioral Directives (how to respond)
        - Section 3: Memory Lock (silent storage command)

        Keep it under 400 words. Use clear, factual statements.

        Return ONLY the system prompt, nothing else.
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