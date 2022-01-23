// Declare global types imported by importScripts()
import type Web3Type from "web3";
import type { AbiItem } from "web3-utils";
import type { Contract } from "web3-eth-contract";
// @ts-expect-error solc doesn't have type definitions
import wrapper from "solc/wrapper";
import { Buffer } from "buffer";

declare const Ganache: any;
declare const Web3: typeof Web3Type;

interface SolidarityCompilation {
  errors?: { severity: "error" | "warning"; formattedMessage: string }[];
  contracts: {
    [source: string]: {
      [name: string]: {
        abi: AbiItem[] | AbiItem;
        evm: { bytecode: { object: string } };
      };
    };
  };
}

interface SolidarityContract {
  abi: AbiItem[] | AbiItem;
  bytecode: string;
}

type SolidarityContracts<Name extends string = string> = {
  [name in Name]: SolidarityContract;
};

// Import the Solidity compiler, Ethereum simulator and Web3 helper library
(self as any).window = self; // Required by web3.js
(self as any).Buffer = Buffer; // Required by ganache
importScripts(
  // "https://solc-bin.ethereum.org/bin/soljson-latest.js",
  "https://solc-bin.ethereum.org/bin/soljson-v0.8.11+commit.d7f03943.js",
  "https://cdn.jsdelivr.net/npm/ganache@7.0.0/dist/web/ganache.min.js",
  "https://cdn.jsdelivr.net/npm/web3@1.7.0/dist/web3.min.js"
);
const solc = wrapper((self as any).Module);

// Create new local Ethereum simulator
const provider = Ganache.provider({ gasLimit: 100000000 });
const web3 = new Web3(provider);

async function compileContracts<Name extends string = string>(
  code: string,
  imports?: Record<string, string>
): Promise<SolidarityContracts<Name>> {
  // Compile Solidity source code
  const source = "input.sol";
  const input = {
    language: "Solidity",
    sources: {
      [source]: { content: code },
    },
    settings: {
      outputSelection: { "*": { "*": ["*"] } },
    },
  };
  const output: SolidarityCompilation = JSON.parse(
    solc.compile(JSON.stringify(input), {
      import(path: string) {
        return imports?.[path]
          ? { contents: imports[path] }
          : { error: "File not found" };
      },
    })
  );
  output.errors = output.errors?.filter((error) => {
    if (error.severity === "warning") {
      console.warn(error.formattedMessage);
      return false;
    }
    return true;
  });
  if (output.errors?.length) {
    const messages = output.errors.map((error) => error.formattedMessage);
    throw new SyntaxError(`\n${messages.join("\n")}`);
  }

  // Extract compiled contracts
  const entries = Object.entries(output.contracts[source]).map<
    [string, SolidarityContract]
  >(([name, contract]) => [
    name,
    { abi: contract.abi, bytecode: contract.evm.bytecode.object },
  ]);
  return Object.fromEntries(entries) as SolidarityContracts<Name>;
}

async function deployContract(
  contract: SolidarityContract,
  account: string,
  args?: any[]
) {
  // Deploy contract to local Ethereum network
  return new web3.eth.Contract(contract.abi)
    .deploy({ data: contract.bytecode, arguments: args })
    .send({ from: account, gas: 10000000 })
    .once("receipt", (receipt) => {
      postMessage({ type: "transaction", receipt })
    });
}

// Add subscriptions
web3.eth.subscribe("pendingTransactions", (err, txnHash) => {
  if (err) console.error(err);
  else postMessage({ type: "pendingTransaction", txnHash });
});
web3.eth.subscribe("newBlockHeaders", (err, blockHeader) => {
  if (err) console.error(err);
  else postMessage({ type: "blockHeader", blockHeader });
});
// web3.eth.subscribe("logs", {}, (err, log) => {
//   if (err) console.error(err);
//   // const decoded = web3.eth.abi.decodeLog(
//   //   logContract.options.jsonInterface[0].inputs!,
//   //   log.data,
//   //   log.topics.slice(1)
//   // );
//   else postMessage({ type: "log", log });
// });

// Import Solidity contracts
import gameCode from "./eth/game/game.sol";
import ticTacToeCode from "./eth/game/tic_tac_toe.sol";
import blackjackCode from "./eth/game/blackjack.sol";

// Compile and deploy shared Solidity contracts to local Ethereum network
const imports = {
  "game.sol": gameCode,
  "tic_tac_toe.sol": ticTacToeCode,
  "blackjack.sol": blackjackCode,
};

let accounts: string[];

let ticTacToeContract: Contract;
let ticTacToeBasicStrategyContract: Contract;

let blackjackContract: Contract;
let blackjackBasicStrategyContract: Contract;

const initPromise = (async () => {
  const { Tic_tac_toe, Strategy_3 } = await compileContracts<
    "Tic_tac_toe" | "Strategy_3"
  >(ticTacToeCode, imports);
  const { Blackjack, Strategy_2 } = await compileContracts<
    "Blackjack" | "Strategy_1" | "Strategy_2"
  >(blackjackCode, imports);

  accounts = await web3.eth.getAccounts();

  ticTacToeContract = await deployContract(Tic_tac_toe, accounts[0]);
  ticTacToeBasicStrategyContract = await deployContract(
    Strategy_3,
    accounts[1]
  );

  blackjackContract = await deployContract(Blackjack, accounts[0]);
  blackjackBasicStrategyContract = await deployContract(
    Strategy_2,
    accounts[1]
  );
})();

type Payload =
  | {
      type: "compile";
      id: number;
      code: string;
    }
  | {
      type: "simulate";
      id: number;
      code: string;
      game: "tic_tac_toe" | "blackjack";
    };

addEventListener("message", async (event: MessageEvent<Payload>) => {
  console.log("worker", event.data);
  if (event.data.type === "compile") {
    const contracts = await compileContracts(event.data.code);
    postMessage({ type: "compileResult", id: event.data.id, contracts });
  } else if (event.data.type === "simulate") {
    // Wait for contracts to be deployed
    await initPromise;

    // Get game and basic strategy contract instances
    const ticTacToe = event.data.game === "tic_tac_toe";
    const gameContract = ticTacToe ? ticTacToeContract : blackjackContract;
    const basicStrategyContract = ticTacToe
      ? ticTacToeBasicStrategyContract
      : blackjackBasicStrategyContract;

    // Compile and deploy user strategy to local Ethereum network
    const { CustomStrategy } = await compileContracts<"CustomStrategy">(
      event.data.code,
      imports
    );
    const customStrategyContract = await deployContract(
      CustomStrategy,
      accounts[2]
    );

    // Play game using user's strategy
    const txn = await gameContract.methods
      .play([
        basicStrategyContract.options.address,
        customStrategyContract.options.address,
      ])
      .send({ from: accounts[0], gas: 10000000 });
    postMessage({ type: "transaction", receipt: txn });

    // Extract game states from each turn
    const events: string[][] = txn.events["State_event"].map(
      (event: any) => event.returnValues
    );
    if (txn.events["Action_event"]) {
      events.push(
        ...txn.events["Action_event"].map((event: any) => event.returnValues)
      );
    }

    postMessage({ type: "simulateResult", id: event.data.id, result: events });
  }
});
