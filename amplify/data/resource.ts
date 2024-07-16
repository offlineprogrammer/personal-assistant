import {
  type ClientSchema,
  a,
  defineData,
  defineFunction,
} from "@aws-amplify/backend";

export const MODEL_ID = "anthropic.claude-3-sonnet-20240229-v1:0";

export const chatbotFunction = defineFunction({
  entry: "./chatbot.ts",
  environment: {
    MODEL_ID,
  },
  timeoutSeconds: 30,
  runtime: 20,
});

const schema = a.schema({
  chat: a
    .query()
    .arguments({ prompt: a.string().required() })
    .returns(a.string())
    .authorization((allow) => [allow.authenticated()])
    .handler(a.handler.function(chatbotFunction)),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});