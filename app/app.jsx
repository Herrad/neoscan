import React, { useEffect, useState } from "react";
import HitTable from "./components/hitTable";

const socket = new WebSocket('ws://localhost:3001');

const App = () => {
    const [hitHistory, setHitHistory] = useState([]);

    const handleNewLogs = (logs) => {
        console.log(hitHistory)

        if (hitHistory.length > 4) hitHistory.pop();

        setHitHistory([
            logs,
            ...hitHistory,
        ])
    };

    socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        switch (message.type) {
            case 'healthy':
                break;
            case 'log-data':
                handleNewLogs(message.logs);
        }
    }

    const hitsToRender = hitHistory.map((hitData) => {
        return <HitTable hitData={hitData}/>
    });

    return hitsToRender;
}

export default App;