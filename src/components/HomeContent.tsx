"use client";

import AirdropForm from "./AirdropForm";
import { useAccount } from "wagmi";

export function HomeContent() {
  const { isConnected } = useAccount();
  return (
    <div style={{ padding: "2rem" }}>
      {isConnected ? (
        <div>
          <AirdropForm />
        </div>
      ) : (
        <div>
          <h2>Please connect a wallet ...</h2>
        </div>
      )}
    </div>
  );
}
