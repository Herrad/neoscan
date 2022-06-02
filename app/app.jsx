import React, { useState } from "react";
import HitTable from "./components/hitTable";

const App = () => {
    const [hitData, setHitData] = useState([]);

    const socket = new WebSocket('ws://localhost:3001');

    socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        switch (message.type) {
            case 'healthy':
                break;
            case 'log-data':
                setHitData([
                    ...hitData,
                    message.logs
                ]);
        }
    }

    return <HitTable hitData={hitData} />
}

export default App;