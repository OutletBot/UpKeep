// Netlify Function - Secure API key on server
// Your API key is stored in Netlify environment variables, never exposed to client

exports.handler = async (event, context) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        // Get context from request body
        const { context: userContext } = JSON.parse(event.body);

        // Get API key from Netlify environment variable (NOT exposed to client!)
        const apiKey = process.env.DEEPSEEK_API_KEY;

        if (!apiKey) {
            console.error('❌ DEEPSEEK_API_KEY not configured');
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'API key not configured' })
            };
        }

        // Generate random style and topic for variety
        const styles = [
            'sarcastic and philosophical', 'absurdly enthusiastic', 'deadpan comedian',
            'existentially quirky', 'ironically poetic', 'chaotically wise',
            'playfully cynical', 'whimsically dark', 'unexpectedly profound',
            'ridiculously optimistic', 'humorously nihilistic', 'cheerfully unhinged'
        ];
        const randomStyle = styles[Math.floor(Math.random() * styles.length)];

        const topics = [
            'quantum physics', 'ancient philosophy', 'pop culture', 'conspiracy theories',
            'cosmic horror', 'motivational quotes', 'nature documentaries', 'sports commentary',
            'cooking shows', 'detective noir', 'sci-fi movies', 'medieval folklore'
        ];
        const randomTopic = topics[Math.floor(Math.random() * topics.length)];

        // Call DeepSeek API
        const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [{
                    role: 'system',
                    content: `You are Default Bot 2.0, a charismatic cleaning companion. Your responses are fun, contextual, and ALWAYS acknowledge what the user specifically did.

CRITICAL RULES:
1. EXACTLY 14 words or less - count carefully!
2. ONE sentence only - no periods making multiple sentences
3. MUST directly reference the specific task/room/action mentioned in the context
4. Be ${randomStyle} in tone
5. Mix in references to ${randomTopic} when it fits naturally
6. Use wordplay, puns, irony, or clever observations about the SPECIFIC task
7. Make the user feel proud of their SPECIFIC accomplishment
8. Every response must feel personally tailored to what they just did

RESPONSE FORMULA: [Acknowledge specific task/room] + [Fun observation/pun/wisdom] (14 words max)`
                }, {
                    role: 'user',
                    content: `Context: ${userContext}\n\nCreate a fun, ${randomStyle} celebration that SPECIFICALLY mentions the task/room from the context above. 14 words max. Make it feel personal and contextual, not generic.`
                }],
                temperature: 1.4,
                max_tokens: 100,
                top_p: 0.95,
                frequency_penalty: 1.2,
                presence_penalty: 0.8
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ DeepSeek API error:', response.status, errorText);
            return {
                statusCode: response.status,
                body: JSON.stringify({ error: 'AI service error' })
            };
        }

        const data = await response.json();
        const aiResponse = data.choices[0].message.content.trim();

        // Enforce 14-word limit
        const words = aiResponse.split(/\s+/);
        const truncated = words.slice(0, 14).join(' ');

        console.log('✅ AI Response generated:', truncated);

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                response: truncated,
                wordCount: words.length
            })
        };

    } catch (error) {
        console.error('❌ Function error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal server error' })
        };
    }
};
