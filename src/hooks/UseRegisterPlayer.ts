import { useEffect } from 'react';

const useRegisterPlayers = (username: string) => {
    const registerBroadcastChannel = new BroadcastChannel('players');

    useEffect(() => {
        console.log('USERNAME: ', username);
        registerBroadcastChannel.postMessage(username);
    }, []);
}

export default useRegisterPlayers;