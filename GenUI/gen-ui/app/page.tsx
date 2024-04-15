"use client";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import React, { useState } from "react";
import MathJax from "react-mathjax2";

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
const aphabet = [...Array.from("qwertyiopasdfghjklzxcvbnm ")];
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
  const [selected, setSelected] = React.useState<string | number>("login");
  const handleSymbolClick = (symbol: string) => {
    setInput(input + symbol);
  };

  const handlePlaceholderClick = (placeholder: string) => {
    setInput(input + placeholder);
  };
  // Chatbot.js

  const [messages, setMessages] = useState<any>([]);
  const [input1, setInput1] = useState("");

  const sendMessage = async () => {
    if (!input1.trim()) return;
    setMessages([...messages, { text: input1, fromUser: true }]);
    setInput("");
    try {
      const response = await fetch("api.chatbot/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input1 }),
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex-col sm:flex-row flex justify-around items-center h-full px-2  space-x-5 w-full">
      <div className="md:w-full shadow-2xl rounded-lg flex flex-col h-[660px]">
        <div className="p-5 h-full space-y-5 ">
          <div>
            <h1 className="text-4xl sm:text-5xl font-semibold whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-teal-700  via-orange-300  to-yellow-300">
              Hello there,
            </h1>
            <h1 className="text-4xl sm:text-5xl font-semibold whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-teal-700  via-orange-300  to-yellow-300">
              Having Math Problems?,
            </h1>
            <h1 className="text-4xl sm:text-5xl font-semibold whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-teal-700  via-orange-300  to-yellow-300">
              How can I be of help today?
            </h1>
          </div>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-3 ">
            <Card className="w-[250px] h-[250px] px-4">
              <CardBody>
                <p>
                  Make beautiful websites regardless of your design experience.
                </p>
              </CardBody>
            </Card>
            <Card className="w-[250px] h-[250px] px-4">
              <CardBody>
                <p>
                  Make beautiful websites regardless of your design experience.
                </p>
              </CardBody>
            </Card>
            <Card className="w-[250px] h-[250px] px-4">
              <CardBody>
                <p>
                  Make beautiful websites regardless of your design experience.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((message: any, index: number) => (
            <div
              key={index}
              className={`mb-4 ${
                message.fromUser ? "text-right" : "text-left"
              }`}
            >
              <div
                className={`inline-block px-4 py-2 rounded-lg shadow ${
                  message.fromUser ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center p-4 border-t">
          <input
            type="text"
            className="flex-1 px-4 py-2 mr-2 border rounded focus:outline-none focus:border-blue-500"
            placeholder="Type your message..."
            value={input1}
            onChange={(e) => setInput1(e.target.value)}
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
      <div className="w-full">
        <div className=" w-full mx-auto bg-white rounded-lg shadow-lg p-6">
          <MathJax.Context input="tex">
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <div className="text-2xl">Math Calculator</div>
                <button
                  className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
                  onClick={() => setInput("")}
                >
                  Clear
                </button>
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter math expression..."
                />
              </div>
              {/*
               */}
              <Tabs
                fullWidth
                size="md"
                aria-label="Tabs form"
                selectedKey={selected}
                onSelectionChange={setSelected}
              >
                <Tab key="login" title="symbols">
                  <div className="grid grid-cols-4 gap-4">
                    {symbols.map((symbol, index) => (
                      <button
                        key={index}
                        className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300"
                        onClick={() => handleSymbolClick(symbol)}
                      >
                        <MathJax.Node inline>{symbol}</MathJax.Node>
                      </button>
                    ))}
                  </div>
                </Tab>
                <Tab key="sign-up" title="numbers">
                  <div className="mt-4 grid grid-cols-4 gap-4">
                    {placeholders.map((placeholder, index) => (
                      <button
                        key={index}
                        className="col-span-2 px-3 py-2 rounded bg-gray-200 hover:bg-gray-300"
                        onClick={() => handlePlaceholderClick(placeholder)}
                      >
                        <MathJax.Node inline>{placeholder}</MathJax.Node>
                      </button>
                    ))}
                  </div>
                </Tab>
                <Tab key="sign-up" title="alphabets">
                  <div className="mt-4 grid grid-cols-4 gap-4">
                    {aphabet.map((placeholder, index) => (
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
            </div>
          </MathJax.Context>
          <button
            className="w-full flex justify-center text-white font-semibold  px-3 py-2 rounded bg-blue-500 hover:bg-secondary-500"
            // onClick={}
          >
            Solve
          </button>
        </div>
      </div>
    </div>
  );
};

export default MathCalculator;
