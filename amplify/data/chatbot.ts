import type { Schema } from "./resource";
import {
  BedrockRuntimeClient,
  ConversationRole,
  ConverseCommand,
} from "@aws-sdk/client-bedrock-runtime";

// initialize bedrock runtime client
const client = new BedrockRuntimeClient(
    {
        region :   process.env.AWS_REGION,
      
    }
);

export const handler = async (event: any) => {

const conversation = [
    {
        role: "user" as ConversationRole ,
        content: [
        {
            type: "text",
            text: event.arguments.prompt,
        },
        ],
    },
]

console.log("conversation", conversation);
console.log("event", event);
console.log("event.arguments.prompt", event.arguments.prompt);
console.log("process.env.MODEL_ID", process.env.MODEL_ID);

const command = new ConverseCommand({

    modelId: process.env.MODEL_ID,
    messages: conversation,
});

console.log("command", command);

  const response = await client.send(command);

  return response.output?.message?.content;

//   // Parse the response and return the generated haiku
//   const data = JSON.parse(Buffer.from(response.body).toString());

//   return data.content[0].text;
};