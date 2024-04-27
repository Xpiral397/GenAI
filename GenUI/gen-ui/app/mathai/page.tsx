"use client";
// import React, { useState, useEffect } from "react";
// import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
// import MathJax from "react-mathjax2";

// const symbols = [
//   ...Array.from("1234567890"),
//   "+",
//   "-",
//   "×",
//   "÷",
//   "=",
//   "(",
//   ")",
//   "∫",
//   "∞",
//   "∑",
//   "√",
//   "^",
//   "π",
// ];
// const alphabet = [...Array.from("qwertyiopasdfghjklzxcvbnm ")];
// const placeholders = [
//   "dy/dx",
//   "d^2y/dx^2",
//   "\\frac{\\partial f}{\\partial x}",
//   "\\frac{\\partial^2 f}{\\partial x^2}",
//   "\\int_{a}^{b} f(x) dx",
//   "\\int \\frac{1}{x} dx",
//   "\\sum_{i=1}^{n} x_i",
//   "\\lim_{x \\to a} f(x)",
//   "\\sqrt{x}",
//   "\\sqrt[n]{x}",
//   "\\vec{v}",
//   "\\mathbf{A}",
//   "\\mathbb{R}",
//   "\\mathcal{F}",
//   "\\alpha",
//   "\\beta",
//   "\\gamma",
//   "\\delta",
//   "\\theta",
//   "\\omega",
// ];

// const MathCalculator = () => {
//   const [input, setInput] = useState("");
//   const [messages, setMessages] = useState([]);

//   const handleSymbolClick = (symbol) => {
//     setInput((prevInput) => prevInput + symbol);
//   };

//   const handlePlaceholderClick = (placeholder) => {
//     setInput((prevInput) => prevInput + placeholder);
//   };

//   const sendMessage = async () => {
//     if (!input.trim()) return;
//     setMessages([...messages, { text: input, fromUser: true }]);
//     setInput("");

//     try {
//       const response = await fetch("/api.chatbot/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ message: input }),
//       });

//       const data = await response.json();
//       const conversationData = data.conversation_data;

//       if (conversationData && conversationData.length > 0) {
//         setMessages((prevMessages) => [
//           ...prevMessages,
//           ...conversationData.map((item) => ({ text: item.question, fromUser: false })),
//         ]);
//       }
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   useEffect(() => {
//     // Load initial chat messages or perform any other initialization logic here
//   }, []);

//   return (
//     <div className="flex-col sm:flex-row flex justify-around items-center h-full px-2  space-x-5 w-full">
//       {/* Chat Display */}
//       <div className="md:w-full shadow-2xl rounded-lg flex flex-col h-[660px]">
//         <div className="p-5 h-full space-y-5 ">
//           {/* Chat Header */}
//           <div>
//             <h1 className="text-4xl sm:text-5xl font-semibold whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-teal-700  via-orange-300  to-yellow-300">
//               Hello there,
//             </h1>
//             <h1 className="text-4xl sm:text-5xl font-semibold whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-teal-700  via-orange-300  to-yellow-300">
//               How can I be of help today?
//             </h1>
//           </div>

//           {/* Messages Display */}
//           <div className="flex-1 p-4 overflow-y-auto">
//             {messages.map((message, index) => (
//               <div
//                 key={index}
//                 className={`mb-4 ${message.fromUser ? "text-right" : "text-left"}`}
//               >
//                 <div
//                   className={`inline-block px-4 py-2 rounded-lg shadow ${
//                     message.fromUser ? "bg-blue-500 text-white" : "bg-gray-200"
//                   }`}
//                 >
//                   {message.text}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Message Input */}
//           <div className="flex items-center p-4 border-t">
//             <input
//               type="text"
//               className="flex-1 px-4 py-2 mr-2 border rounded focus:outline-none focus:border-blue-500"
//               placeholder="Type your message..."
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyPress={(e) => {
//                 if (e.key === "Enter") sendMessage();
//               }}
//             />
//             <button
//               className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
//               onClick={sendMessage}
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Math Input and Buttons */}
//       <div className="w-full">
//         <div className=" w-full mx-auto bg-white rounded-lg shadow-lg p-6">
//           {/* Math Input */}
//           <input
//             type="text"
//             className="w-full px-3 py-2 border border-gray-300 rounded"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Enter math expression..."
//           />

//           {/* Tabs for Symbols, Numbers, and Alphabets */}
//           <Tabs fullWidth size="md" aria-label="Tabs form">
//             <Tab key="symbols" title="Symbols">
//               <div className="grid grid-cols-4 gap-4">
//                 {symbols.map((symbol, index) => (
//                   <button
//                     key={index}
//                     className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300"
//                     onClick={() => handleSymbolClick(symbol)}
//                   >
//                     {symbol}
//                   </button>
//                 ))}
//               </div>
//             </Tab>
//             <Tab key="numbers" title="Numbers">
//               <div className="mt-4 grid grid-cols-4 gap-4">
//                 {placeholders.map((placeholder, index) => (
//                   <button
//                     key={index}
//                     className="col-span-2 px-3 py-2 rounded bg-gray-200 hover:bg-gray-300"
//                     onClick={() => handlePlaceholderClick(placeholder)}
//                   >
//                     {placeholder}
//                   </button>
//                 ))}
//               </div>
//             </Tab>
//             <Tab key="alphabets" title="Alphabets">
//               <div className="mt-4 grid grid-cols-4 gap-4">
//                 {alphabet.map((placeholder, index) => (
//                   <button
//                     key={index}
//                     className="col-span-1 px-3 py-2 rounded bg-gray-200 hover:bg-gray-300"
//                     onClick={() => handlePlaceholderClick(placeholder)}
//                   >
//                     {placeholder}
//                   </button>
//                 ))}
//               </div>
//             </Tab>
//           </Tabs>

//           {/* Solve Button */}
//           <button
//             className="w-full flex justify-center text-white font-semibold  px-3 py-2 rounded bg-blue-500 hover:bg-secondary-500"
//             onClick={sendMessage}
//           >
//             Solve
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MathCalculator;

const MathSolutionContainer = ({
  response,
  type,
}: {
  response: string;
  type: boolean;
}) => {
  // Function to parse the response string into individual steps
  const parseResponse = (responseString: string) => {
    const delimiter = "**Step ";
    const steps = responseString
      .split(delimiter)
      .filter((step) => step.trim() !== "");

    return steps.map((step, index) => {
      const stepParts = step.split("**");

      if (stepParts.length < 1) {
        return null;
      }

      const stepText = stepParts[0].trim();
      const mathExpression = stepParts.slice(1).join("").trim();

      return (
        <div key={index} className="bg-gray-100 p-4 rounded-lg shadow mb-4">
          <h3 className="text-md font-semibold mb-2">{`Step ${
            index + 1
          }: ${stepText}`}</h3>
          {/* <MathJax.Context input="tex"> */}
          <div>
            {/* <MathJax.Node> */}
            {mathExpression}
            {/* </MathJax.Node> */}
          </div>
          {/* </MathJax.Context> */}
        </div>
      );
    });
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-sm font-semibold text-center mb-4">
        {type ? "Question" : "Answer"}
      </h1>
      {!type ? (
        parseResponse(response)
      ) : (
        <h1 className="w-full text-right text-lg text-white">{response}</h1>
      )}
    </div>
  );
};

import React, { useState, useEffect } from "react";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import MathJax from "react-mathjax2";
import { BASE_URL, getToken } from "../_api/setting";

const symbols = [
  ...Array.from("1234567890"),
  "+",
  "-",
  "×",
  "÷",
  "=",
  "(",
  ")",
  "∫",
  "∞",
  "∑",
  "√",
  "^",
  "π",
];
const alphabet = [...Array.from("qwertyiopasdfghjklzxcvbnm ")];
const placeholders = [
  "dy/dx",
  "d^2y/dx^2",
  "\\frac{\\partial f}{\\partial x}",
  "\\frac{\\partial^2 f}{\\partial x^2}",
  "\\int_{a}^{b} f(x) dx",
  "\\int \\frac{1}{x} dx",
  "\\sum_{i=1}^{n} x_i",
  "\\lim_{x \\to a} f(x)",
  "\\sqrt{x}",
  "\\sqrt[n]{x}",
  "\\vec{v}",
  "\\mathbf{A}",
  "\\mathbb{R}",
  "\\mathcal{F}",
  "\\alpha",
  "\\beta",
  "\\gamma",
  "\\delta",
  "\\theta",
  "\\omega",
];

const MathCalculator = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<any>([]);

  const handleSymbolClick = (symbol: any) => {
    setInput((prevInput) => prevInput + symbol);
  };

  const handlePlaceholderClick = (placeholder: any) => {
    setInput((prevInput) => prevInput + placeholder);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages([...(messages ?? []), { text: input, fromUser: true }]);
    setInput("");

    try {
      const response = await fetch(`${BASE_URL}/topic/math/create/Sumaton/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${await getToken()}`,
        },

        body: JSON.stringify({
          question: input,
        }),
      });

      const data = await response.json();
      const conversationData = data;
      console.log(data);

      if (conversationData) {
        setMessages((prevMessages: any) => {
          return [
            ...prevMessages,
            {
              text: data.response,
              fromUser: false,
            },
          ];
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    // Load initial chat messages or perform any other initialization logic here
  }, []);

  return (
    <div className="flex justify-center w-full items-center h-full ">
      {/* Chat Display */}
      <div className="flex justify-center space-x-5">
        <div className="md:w-full shadow-2xl rounded-lg flex flex-col h-full">
          <div className="p-5 h-full space-y-5 ">
            {/* Chat Header */}
            <div>
              <h1 className="text-4xl sm:text-5xl font-semibold whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-teal-700  via-orange-300  to-yellow-300">
                Hello there,
              </h1>
              <h1 className="text-4xl sm:text-5xl font-semibold whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-teal-700  via-orange-300  to-yellow-300">
                How can I be of help today?
              </h1>
            </div>

            {/* Messages Display */}
            <div className="flex-1 p-4 overflow-y-auto">
              {messages?.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 ${
                    message.fromUser ? "text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`inline-block px-4 py-2 rounded-lg shadow ${
                      message.fromUser
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    <MathSolutionContainer
                      response={message.text}
                      type={message.fromUser}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="flex items-center p-4 border-t">
              <input
                type="text"
                className="flex-1 px-4 py-2 mr-2 border rounded focus:outline-none focus:border-blue-500"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") sendMessage();
                }}
              />
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                onClick={sendMessage}
              >
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Math Input and Buttons */}
        <div className="w-full hidden lg:block">
          <div className=" w-full mx-auto bg-white rounded-lg shadow-lg p-6">
            {/* Math Input */}
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              value={input}
              onChange={(e) => setInput(input + e.target.value)}
              placeholder="Enter math expression..."
            />

            {/* Tabs for Symbols, Numbers, and Alphabets */}
            <Tabs fullWidth size="md" aria-label="Tabs form">
              <Tab key="symbols" title="Symbols">
                <div className="grid grid-cols-4 gap-4">
                  {symbols.map((symbol, index) => (
                    <button
                      key={index}
                      className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300"
                      onClick={() => handleSymbolClick(symbol)}
                    >
                      {symbol}
                    </button>
                  ))}
                </div>
              </Tab>
              <Tab key="numbers" title="Numbers">
                <div className="mt-4 grid grid-cols-4 gap-4">
                  {placeholders.map((placeholder, index) => (
                    <button
                      key={index}
                      className="col-span-2 px-3 py-2 rounded bg-gray-200 hover:bg-gray-300"
                      onClick={() => handlePlaceholderClick(placeholder)}
                    >
                      {placeholder}
                    </button>
                  ))}
                </div>
              </Tab>
              <Tab key="alphabets" title="Alphabets">
                <div className="mt-4 grid grid-cols-4 gap-4">
                  {alphabet.map((placeholder, index) => (
                    <button
                      key={index}
                      className="col-span-1 px-3 py-2 rounded bg-gray-200 hover:bg-gray-300"
                      onClick={() => handlePlaceholderClick(placeholder)}
                    >
                      {placeholder}
                    </button>
                  ))}
                </div>
              </Tab>
            </Tabs>

            {/* Solve Button */}
            <button
              className="w-full flex justify-center text-white font-semibold  px-3 py-2 rounded bg-blue-500 hover:bg-secondary-500"
              onClick={sendMessage}
            >
              Solve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MathCalculator;
