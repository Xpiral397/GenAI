import React, { useState } from "react";
import { ChattingContext, selectedTopic, UseSelectConversation } from "./chat";

export default function MessageContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedTopic, setSelected] = useState<selectedTopic>(
    {} as selectedTopic
  );
  return (
    <ChattingContext.Provider value={{ selectedTopic, setSelected }}>
      {children}
    </ChattingContext.Provider>
  );
}
