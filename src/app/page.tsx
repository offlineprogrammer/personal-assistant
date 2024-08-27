"use client";
import { Authenticator, Button, Icon } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import outputs from "../../amplify_outputs.json";
import Chat from "@/components/Chat";

Amplify.configure(outputs);

export default function Home() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div className="app-container">
          <header className="top-bar">
            <div className="left-section">
              <Button onClick={signOut} variation="link">
              
                Sign out
              </Button>
            </div>
            <div className="center-section">
              <h1>Trip Planner Assistant</h1>
            </div>
            <div className="right-section">
              
              <span>{user?.signInDetails?.loginId}</span>
            </div>
          </header>
          <main>
            <Chat />
          </main>
        </div>
      )}
    </Authenticator>
  );
}
