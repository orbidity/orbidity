const worker = new Worker("/worker/worker.js");

let nextId = 0;

interface TicTacToeEvent {
    board: string[];
}

export function runCodeLocally(code: string, game: "tic_tac_toe"): Promise<TicTacToeEvent[]>;
// TODO: blackjack
export function runCodeLocally(code: string, game: string): Promise<any[]> {
    const id = nextId++;
    return new Promise((resolve) => {
        function listener(event: MessageEvent) {
            console.log("event", event.data);
            if(event.data.type === "simulateResult" && event.data.id === id) {
                worker.removeEventListener("message", listener);
                resolve(event.data.result);
            }
        }
        worker.addEventListener("message", listener);
        worker.postMessage({ type: "simulate", id, code, game });
    });
}

export function subscribe(callback: (event: any) => void) {
    worker.addEventListener("message", (event) => {
        callback(event.data);
    });
}
