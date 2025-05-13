'use client'

import InputField from "@/components/ui/InputField";
import { useState, useMemo } from "react";
import { chainsToTSender, erc20Abi, tsenderAbi } from "@/constants";
import { useChainId, useConfig, useAccount, useWriteContract } from 'wagmi'
import { readContract, waitForTransactionReceipt } from "@wagmi/core";
import { calculateTotal } from "@/utils";
import { a } from "vitest/dist/chunks/suite.d.FvehnV49.js";

export default function AirdropForm() {
    const [tokenAddress, setTokenAddress] = useState("");
    const [recipients, setRecipients] = useState("");
    const [amount, setAmount] = useState("");
    const chainId = useChainId();
    const config = useConfig();
    const account = useAccount();
    const totalAmount: number = useMemo(() => calculateTotal(amount), [amount]);
    const { data: hash, isPending, writeContractAsync } = useWriteContract();

    async function getApprovedAmount(tsenderAddress: string | null): Promise<number> {
        if( !tsenderAddress) {
            alert("No Address Found, please use a supported chain.");
            return 0;
        }
        // Read the `allowance` from the ERC20 contract
        const allowance = await readContract(config, {
            abi: erc20Abi,
            address: tokenAddress as `0x${string}`,
            functionName: 'allowance',
            args: [ account.address, tsenderAddress as `0x${string}` ] // Owner and spender
        });
        
        return allowance as number;
    }

    async function handleSubmit() {
        // 1. Approve the tsender contract to send our tokenAddress
        const tsenderAddress = chainsToTSender[chainId]["tsender"]; 
        console.log("chain ID:", chainId);
        const approvedAmount = await getApprovedAmount(tsenderAddress);
        console.log("approved amount:", approvedAmount);

        if (approvedAmount < totalAmount) {
            // Call approve()
            const approvalHash = await writeContractAsync({
                abi: erc20Abi,
                address: tokenAddress as `0x${string}`,
                functionName: 'approve',
                args: [tsenderAddress as `0x${string}`, BigInt(totalAmount)],
            });
            const approvalReceipt = await waitForTransactionReceipt(config, {
                hash: approvalHash,
            });
            console.log("Approval transaction receipt:", approvalReceipt);
        }
        // 2. Call the airdrop function on the tsender contract
        const airdropHash = await writeContractAsync({
            abi: tsenderAbi,
            address: tsenderAddress as `0x${string}`,
            functionName: 'airdropERC20',
            args: [
                tokenAddress as `0x${string}`,
                recipients.split(/[, ]+/).map((recipient) => recipient.trim() as `0x${string}`),
                amount.split(/[, ]+/).map((amt) => BigInt(calculateTotal(amt))),
                BigInt(totalAmount)
            ],
        });
        

    }

    return (
        <div>
            <InputField
                label="Token Address"
                placeholder="0x"
                value={tokenAddress}
                onChange={(e) => setTokenAddress(e.target.value)}
                type="text"
                large={false}
            />
            <InputField
                label="Recipients"
                placeholder="0x...,0x..."
                value={recipients}
                onChange={(e) => setRecipients(e.target.value)}
                type="text"
                large={true}
            />
            <InputField
                label="Amount"
                placeholder="100, 200, 300, ..."
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                large={true}
            />
            <div style={{ display: "inline-block", border: "1px solid #ccc", padding: "5px", borderRadius: "5px" }}>
                <button onClick={handleSubmit} style={{ border: "none", background: "none", padding: "0", cursor: "pointer" }}>
                    Send Airdrop
                </button>
            </div>
        </div>
    );
}