import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    // Validate content length to prevent abuse
    const contentLength = req.headers.get("content-length");
    if (contentLength && parseInt(contentLength) > 15 * 1024 * 1024) {
      return new Response(JSON.stringify({ error: "File too large. Maximum 10MB allowed." }), {
        status: 413,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { imageBase64, mimeType, fileName } = await req.json();

    // Validate required fields
    if (!imageBase64 || typeof imageBase64 !== "string") {
      return new Response(JSON.stringify({ error: "No image data provided" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Validate file size (base64 is ~33% larger than binary)
    const MAX_BASE64_SIZE = 14 * 1024 * 1024; // ~10MB binary
    if (imageBase64.length > MAX_BASE64_SIZE) {
      return new Response(JSON.stringify({ error: "File too large. Maximum 10MB allowed." }), {
        status: 413,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Validate MIME type
    const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "video/mp4", "video/quicktime"];
    if (!mimeType || !ALLOWED_MIME_TYPES.includes(mimeType)) {
      return new Response(JSON.stringify({ error: "Unsupported file type." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Validate filename
    const sanitizedFileName = typeof fileName === "string"
      ? fileName.slice(0, 255).replace(/[^\w.\-() ]/g, "_")
      : "unknown";

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `You are an expert AI-generated media detection system. You analyze images to determine whether they were created by AI (such as Midjourney, DALL-E, Stable Diffusion, etc.) or by a human (photograph, hand-drawn art, etc.).

Analyze the provided image carefully looking for these indicators:

AI-GENERATED indicators:
- Unnatural skin textures, especially around hands, fingers, ears
- Inconsistent lighting or shadows
- Warped or distorted text in the image
- Overly smooth or plastic-looking surfaces
- Repetitive patterns or symmetry that looks too perfect
- Artifacts around edges of objects
- Inconsistent reflections
- Eyes that look glassy or asymmetric
- Background elements that don't make physical sense
- Hair strands that merge or disappear unnaturally

HUMAN-CREATED indicators:
- Natural imperfections and asymmetry
- Consistent lighting and shadow behavior
- Proper depth of field and bokeh
- Natural skin texture with pores
- Consistent perspective throughout
- Sensor noise patterns typical of cameras
- Natural motion blur
- EXIF-like qualities (proper white balance)

Respond ONLY with a JSON object (no markdown, no code blocks) with these exact fields:
{
  "isAI": true/false,
  "confidence": number between 60-99,
  "patternAnalysis": number between 50-99,
  "textureCheck": number between 50-99,
  "metadataScan": number between 50-99,
  "noiseProfile": number between 50-99,
  "reasoning": "Brief 1-2 sentence explanation of your determination"
}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-pro",
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Analyze this image file "${sanitizedFileName}" and determine if it was AI-generated or human-created. Return ONLY the JSON object.`,
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:${mimeType};base64,${imageBase64}`,
                },
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) throw new Error("No response from AI model");

    // Parse JSON from the response, handling possible markdown wrapping
    let parsed;
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      parsed = JSON.parse(jsonMatch ? jsonMatch[0] : content);
    } catch {
      console.error("Failed to parse AI response:", content);
      throw new Error("Failed to parse AI analysis response");
    }

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("analyze-media error:", e);
    return new Response(JSON.stringify({ error: "An error occurred while analyzing the media. Please try again." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
