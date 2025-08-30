import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { imageData } = await request.json();

    if (!imageData) {
      return NextResponse.json({ error: '图片数据不能为空' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Gemini API密钥未配置' }, { status: 500 });
    }

    const base64Data = imageData.replace(/^data:image\/[a-z]+;base64,/, '');

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: "这是一幅画作，请你猜测画的是什么？请用中文回答，只说出物体的名称即可，不要多余的解释。比如：苹果、房子、太阳等。"
                },
                {
                  inline_data: {
                    mime_type: "image/png",
                    data: base64Data
                  }
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 50,
            topP: 0.8,
            topK: 10
          }
        })
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API请求失败: ${response.status}`);
    }

    const data = await response.json();

    console.log(data.candidates[0]?.content)
    
    if (!data.candidates || data.candidates.length === 0) {
      return NextResponse.json({ error: 'AI无法识别图片' }, { status: 500 });
    }

    const guess = data.candidates[0]?.content?.parts?.[0]?.text || '不确定';

    return NextResponse.json({ guess: guess.trim() });

  } catch (error) {
    console.error('API错误:', error);
    return NextResponse.json(
      { error: 'AI识别失败，请重试' }, 
      { status: 500 }
    );
  }
}