
import { Terminal } from "@xterm/xterm";
import { useEffect, useRef } from "react";
import "@xterm/xterm/css/xterm.css";

const term = new Terminal();
const ws = new WebSocket("ws://localhost:5001");


function XTerminal() {
    const terminalRef = useRef(null);


    useEffect(() => {
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);

            if (data.type === "data") term.write(data.data);
        };


    }, []);

    useEffect(() => {
        if (!terminalRef.current) return;

        term.open(terminalRef.current);
        term.write("Hello, world!\r\n");

        term.onKey((e) => {
            ws.send(
                JSON.stringify({
                    type: "command",
                    data: e.key,
                }),
            );
        });
    }, [terminalRef]);

    return <div ref={terminalRef} style={{ height: "300px" }}></div>;
}

export default XTerminal;
