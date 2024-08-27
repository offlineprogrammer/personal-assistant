"use client";
import {
  Authenticator,
  Button,
  Icon,
  View,
  Heading,
} from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import outputs from "../../amplify_outputs.json";
import Chat from "@/components/Chat";

Amplify.configure(outputs);

export default function Home() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <View className="app-container">
          <Heading level={1} className="top-bar">
            <View className="left-section">
              <Button onClick={signOut} variation="link">
                Sign out
              </Button>
            </View>
            <div className="center-section">
              <h1>Trip Planner Assistant</h1>
            </div>
            <div className="right-section">
              <span>{user?.signInDetails?.loginId}</span>
            </div>
          </Heading>
          <View as="main">
            <Chat />
          </View>
        </View>
      )}
    </Authenticator>
  );
}
