import React, { useState, useEffect, useContext } from 'react';
import type { TransactionReceipt } from "web3-core";

interface Txn {
  hash: string;
  contract?: string;
  from?: string;
  gasUsed?: number;
  events?: string[];
}

interface TxnContext {
  txns: Map<string, Txn>;
}

const TxnContext = React.createContext<TxnContext>({} as TxnContext);

export const useTxns = () => useContext(TxnContext);

export const TxnProvider: React.FC = ({ children }) => {
  const [txns, setTxns] = useState<Map<string, Txn>>(new Map());

  useEffect(() => {
    import("../eth").then((eth) => {
      eth.subscribe((event) => {
        if (event.type === "pendingTransaction") {
          setTxns((prev) => {
            prev.set(event.txnHash, { hash: event.txnHash });
            return new Map(prev);
          });
        } else if (event.type === "transaction") {
          const receipt: TransactionReceipt = event.receipt;
          setTxns((prev) => {
            const txn = prev.get(receipt.transactionHash)!;
            txn.contract = receipt.contractAddress;
            txn.from = receipt.from;
            txn.gasUsed = receipt.gasUsed;
            txn.events = Object.entries(receipt.events ?? {}).flatMap(([key, value]) => (value as any).map((event: any) => event.returnValues));
            console.log(txn.events);
            return new Map(prev);
          });
        }
      });
    });
  }, []);

  return(
    <TxnContext.Provider
      value={{txns}}
    >
      {children}
    </TxnContext.Provider>
  )
}

export default TxnContext;
