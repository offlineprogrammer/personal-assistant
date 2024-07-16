"use client";
import { Authenticator, Button } from "@aws-amplify/ui-react";
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
          <header className="App-header">
            <h1>Hello {user?.signInDetails?.loginId}</h1>
            <Button onClick={signOut}>Sign out</Button>
          </header>
          <Chat />
        </div>
      )}
    </Authenticator>
  ) ;
}
