import { View } from "@aws-amplify/ui-react";
import { createAIHooks, AIConversation } from "@aws-amplify/ui-react-ai";
import { amplifyClient } from "@/app/amplify-utils";

const { useAIConversation } = createAIHooks(amplifyClient);

export function Chat() {
  const [
    {
      data: { messages },
    },
    sendMessage,
  ] = useAIConversation("chat");

  return (
    <View className="chat-container">
      <AIConversation variant="bubble" messages={messages} handleSendMessage={sendMessage} />
    </View>
  );
}

export default Chat;
