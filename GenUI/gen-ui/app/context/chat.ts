import React, { createContext } from "react";

export interface ChatConversation {
  question: string;
  response: string;
}

export interface selectedTopic {
  currentTopic: string;
  conversation: ChatConversation[];
}
export interface UseSelectConversation {
  selectedTopic: selectedTopic;
  setSelected: any;
}
export const ChattingContext = createContext<UseSelectConversation | null>(
  null
);
