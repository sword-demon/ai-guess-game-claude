"use client";

import { useState, useRef } from 'react';
import Image from 'next/image';
import DrawingCanvas, { DrawingCanvasRef } from './components/DrawingCanvas';

export default function Home() {
  const canvasRef = useRef<DrawingCanvasRef>(null);
  const [guess, setGuess] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [gameHistory, setGameHistory] = useState<Array<{image: string, guess: string, timestamp: Date}>>([]);

  const handleGuessRequest = async () => {
    if (isLoading || !canvasRef.current) return;
    
    const imageData = canvasRef.current.getImageData();
    if (!imageData) return;
    
    setIsLoading(true);
    setError('');
    setGuess('');

    try {
      const response = await fetch('/api/guess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageData }),
      });

      if (!response.ok) {
        throw new Error('请求失败');
      }

      const data = await response.json();
      
      if (data.error) {
        setError(data.error);
        return;
      }

      setGuess(data.guess);
      setGameHistory(prev => [{
        image: imageData,
        guess: data.guess,
        timestamp: new Date()
      }, ...prev.slice(0, 4)]);

    } catch {
      setError('AI识别失败，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewGame = () => {
    setGuess('');
    setError('');
    setGameHistory([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">AI 你画我猜</h1>
          <p className="text-base md:text-lg text-gray-600 px-4">在画布上画画，让AI来猜测你画的是什么！</p>
        </header>

        <div className="flex flex-col lg:flex-row gap-4 md:gap-8">
          <div className="w-full lg:flex-1 order-1 lg:order-1">
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg">
              <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-700 text-center">画布区域</h2>
              <DrawingCanvas 
                ref={canvasRef}
                onGuessRequest={handleGuessRequest}
              />
            </div>
          </div>

          <div className="w-full lg:flex-1 order-2 lg:order-2">
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg">
              <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-700 text-center">AI 猜测结果</h2>
              
              <div className="min-h-[120px] md:min-h-[100px] border-2 border-dashed border-gray-200 rounded-lg p-4 flex items-center justify-center">
                {isLoading && (
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-gray-600 text-sm md:text-base">AI正在思考中...</span>
                  </div>
                )}
                
                {error && (
                  <div className="text-red-500 text-center">
                    <p className="text-sm md:text-base">❌ {error}</p>
                  </div>
                )}
                
                {guess && !isLoading && (
                  <div className="text-center">
                    <p className="text-base md:text-lg text-gray-600 mb-2">我猜你画的是：</p>
                    <p className="text-2xl md:text-3xl font-bold text-blue-600">🎨 {guess}</p>
                  </div>
                )}

                {!guess && !isLoading && !error && (
                  <p className="text-gray-400 text-center text-sm md:text-base px-2">
                    在画布上画点什么，然后点击&quot;让AI猜一猜&quot;按钮！
                  </p>
                )}
              </div>

              <div className="mt-4 md:mt-6 flex justify-center">
                <button
                  onClick={handleNewGame}
                  className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 active:bg-green-700 transition-colors text-sm md:text-base font-medium"
                >
                  开始新游戏
                </button>
              </div>
            </div>

            {gameHistory.length > 0 && (
              <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg mt-4 md:mt-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-700 text-center">游戏记录</h3>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {gameHistory.map((record, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Image 
                        src={record.image} 
                        alt="画作" 
                        width={48}
                        height={48}
                        className="w-10 h-10 md:w-12 md:h-12 rounded border object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800 text-sm md:text-base truncate">{record.guess}</p>
                        <p className="text-xs md:text-sm text-gray-500">
                          {record.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <footer className="text-center mt-8 md:mt-12 text-gray-500">
          <p className="text-sm md:text-base">使用 Gemini AI 提供智能识别服务</p>
        </footer>
      </div>
    </div>
  );
}
