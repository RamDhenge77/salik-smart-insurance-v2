import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { TripData } from "./FileUploader";
import { MessageCircle, SendIcon } from "lucide-react";
import OpenAIKeyInput from "./OpenAIKeyInput";
import { ScrollArea } from "@/components/ui/scroll-area";
import AgentMessageBubble from "./AgentMessageBubble";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AskAgentProps {
  tripData: TripData[];
}

const AskAgent: React.FC<AskAgentProps> = ({ tripData }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const suggestedQuestions = [
    "How many Salik gates did I cross last month?",
    "What's my highest toll charge in a single trip?",
    "When do I usually overspeed?",
    "Which route costs me the most toll?",
  ];

  useEffect(() => {
    // Try to get API key from localStorage
    const savedApiKey = localStorage.getItem("openai_key");
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenAI API key to use this feature",
        variant: "destructive",
      });
      return;
    }

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      // Send the complete data to the AI
      const dataContext = prepareFullDataContext(tripData);

      // Create the prompt with complete data
      const prompt = createPrompt(userMessage, dataContext);

      // Call OpenAI API with the full data context
      const response = await callOpenAI(prompt, apiKey);

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response },
      ]);
    } catch (error) {
      console.error("Error calling OpenAI:", error);
      toast({
        title: "Error",
        description:
          "Failed to get a response. Please check your API key and try again.",
        variant: "destructive",
      });
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm sorry, I couldn't process your request. Please check your API key or try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const prepareFullDataContext = (data: TripData[]): string => {
    if (!data || data.length === 0) {
      return "No trip data available.";
    }

    // Create a detailed summary of the data
    const trips = data.length;
    const uniqueGates = [...new Set(data.map((trip) => trip.tollGate))];
    const totalAmount = data
      .reduce((sum, trip) => sum + trip.amount, 0)
      .toFixed(2);
    const dateRange = `${data[data.length - 1]?.date} to ${data[0]?.date}`;

    // Group data by gates for better analysis
    const gateData: Record<string, { count: number; totalAmount: number }> = {};
    uniqueGates.forEach((gate) => {
      const gateTrips = data.filter((trip) => trip.tollGate === gate);
      gateData[gate] = {
        count: gateTrips.length,
        totalAmount: parseFloat(
          gateTrips.reduce((sum, trip) => sum + trip.amount, 0).toFixed(2)
        ),
      };
    });

    // Analyze time patterns
    const timePatterns = analyzeTimePatterns(data);

    // Include the full trip data for detailed queries
    const fullTripData = JSON.stringify(data);

    return `
Trip Data Summary:
- Total trips: ${trips}
- Date range: ${dateRange}
- Toll gates visited: ${uniqueGates.join(", ")}
- Total amount spent: AED ${totalAmount}

Gate Analysis:
${Object.entries(gateData)
  .map(
    ([gate, info]) =>
      `- ${gate}: ${info.count} trips, AED ${info.totalAmount} total`
  )
  .join("\n")}

Time Analysis:
- Morning trips (6AM-10AM): ${timePatterns.morning}
- Midday trips (10AM-4PM): ${timePatterns.midday}
- Evening trips (4PM-8PM): ${timePatterns.evening}
- Night trips (8PM-6AM): ${timePatterns.night}

Complete trip data (JSON):
${fullTripData}
    `;
  };

  const analyzeTimePatterns = (data: TripData[]) => {
    // Count trips by time of day
    let morning = 0,
      midday = 0,
      evening = 0,
      night = 0;

    data.forEach((trip) => {
      const hourStr = trip.time.split(":")[0];
      const hour = parseInt(hourStr, 10);

      if (hour >= 6 && hour < 10) morning++;
      else if (hour >= 10 && hour < 16) midday++;
      else if (hour >= 16 && hour < 20) evening++;
      else night++;
    });

    return { morning, midday, evening, night };
  };

  const createPrompt = (userQuery: string, dataContext: string): string => {
    return `You are a data analyst assistant specialized in interpreting Salik toll trip data for Dubai drivers.

Your responses must be crisp, professional, and highly relevant. Focus only on what the user asked.

Follow these rules strictly:

Be direct — Answer in 1–3 sentences, with no fluff or generic commentary.

Cite real numbers — Always use actual trip data (e.g., toll gate names, trip count, AED amount).

Use markdown formatting — Preferably use **bold text** for emphasis, bullet points for lists, and proper markdown tables for data. Format your response with clean spacing and hierarchy.

Don't explain how you work — The user doesn't need to know how the data is analyzed. Just show the result.

No repetition — Do not repeat the user's question or restate obvious facts.

Tone — Be professional and confident, like a data analyst briefing a client.

The user has asked: "${userQuery}"

Here is the complete trip data and analysis:
${dataContext}

Example of well-formatted response:

## Most Expensive Toll Routes

- **Al Garhoud New Bridge**: 124 trips, **AED 496 total**
- **Al Maktoum Bridge**: 114 trips, AED 456 total

## Peak Travel Times

- **Morning (6AM-10AM)**: 140 trips
- **Evening (4PM-8PM)**: 130 trips

## Alternative Routes
Consider using less frequented gates like **Business Bay Crossing** (18 trips, AED 72 total)`;
  };

  const callOpenAI = async (prompt: string, key: string): Promise<string> => {
    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${key}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content:
                  "You are an assistant that analyzes Salik toll data for Dubai drivers. Provide detailed, data-driven insights based on the complete trip information provided. Be specific and reference actual data points in your answers and respond to user in crisp, to the point and less wordy manne and it should sound professional and well formatted.",
              },
              {
                role: "user",
                content: prompt,
              },
            ],
            temperature: 0.7,
            max_tokens: 1000,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      throw error;
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
  };

  // If no API key is set, show the API key input form
  if (!apiKey) {
    return <OpenAIKeyInput onKeySubmit={(key) => setApiKey(key)} />;
  }

  return (
    <div className="flex flex-col h-[600px] max-h-[700px]">
      <div
        className="flex-1 overflow-y-auto p-4 space-y-4 border border-gray-200 rounded-lg mb-4 bg-gray-50
                   [&::-webkit-scrollbar]:w-1
                    [&::-webkit-scrollbar]-none
                   [&::-webkit-scrollbar-track]:rounded-full
                 [&::-webkit-scrollbar-track]:bg-gray-100
                   [&::-webkit-scrollbar-thumb]:rounded-full
                 [&::-webkit-scrollbar-thumb]:bg-[#2596be]
                 dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500
      "
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full space-y-6 text-center">
            <div className="p-4 rounded-full bg-blue-100">
              <MessageCircle size={40} className="text-blue-500" />
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">
                Ask about your Salik data
              </h3>
              <p className="text-gray-500 mb-4">
                Ask any question about your Salik trips and our AI will provide
                insights based on your complete data.
              </p>

              <div className="flex flex-col gap-4">
                {suggestedQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="justify-start text-left text-sm py-2 px-3 hover:bg-[#6cd0f585]"
                    onClick={() => handleSuggestedQuestion(question)}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <Card
              key={index}
              className={`${
                message.role === "user"
                  ? "ml-auto bg-blue-500"
                  : "mr-auto bg-white"
              } max-w-[80%]`}
            >
              <CardContent className={message.role === "user"?'p-3':'px-0 py-3'}>
                <p
                  className={`whitespace-pre-line ${
                    message.role === "user"
                      ? "text-gray-800 font-medium"
                      : "text-gray-700"
                  }`}
                >
                  {message.role === "user" ? (
                    message.content
                  ) : (
                    <AgentMessageBubble message={message.content} />
                  )}
                </p>
              </CardContent>
            </Card>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex space-x-2 mx-4">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question about your Salik data..."
          disabled={loading}
          className="flex-1"
        />
        <Button
          type="submit"
          variant="primary"
          disabled={loading || !input.trim()}
          className=""
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <SendIcon size={18} />
          )}
        </Button>
      </form>
    </div>
  );
};

export default AskAgent;
