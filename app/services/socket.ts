import { io } from 'socket.io-client';

const SOCKET_URL = `${process.env.EXPO_PUBLIC_SOCKET_URL}`;

let socket: any;
export const initializeSocket = (token) => {
    socket = io(SOCKET_URL, {
        auth: {
            token: `Bearer ${token}`,
        },
        reconnectionAttempts: 3,
    });
    return socket;
};

export const getSocket = () => {
    if(!socket) {
        throw new Error('Socket not initialized');
    }
    return socket;
};
