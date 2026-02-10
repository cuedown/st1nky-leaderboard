/**
 * Socket.IO client for live leaderboard updates.
 * Connects to ws://[domain]/live-wagers with 100ms debounce for rapid events.
 * https://socket.io/docs/v4/client-api/
 */

import { io, type Socket } from "socket.io-client";
import type { LiveWagerPayload } from "../types/leaderboard";

const DEBOUNCE_MS = 100;
const RECONNECT_DELAY_MS = 3000;

export type WagerUpdateHandler = (payload: LiveWagerPayload) => void;

let socket: Socket | null = null;
let debounceTimer: ReturnType<typeof setTimeout> | null = null;
const pendingByKey = new Map<string, LiveWagerPayload>();

function getWsUrl(): string {
  return typeof window !== "undefined" ? window.location.origin : "http://localhost:5173";
}

function getSocket(): Socket {
  if (socket?.connected) return socket;
  const url = getWsUrl();
  const s = io(url, {
    path: "/socket.io",
    transports: ["websocket", "polling"],
    reconnection: true,
    reconnectionDelay: RECONNECT_DELAY_MS,
    reconnectionAttempts: 10,
  });
  socket = s;
  return s;
}

function emitDebounced(handler: WagerUpdateHandler): void {
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    debounceTimer = null;
    pendingByKey.forEach((payload) => handler(payload));
    pendingByKey.clear();
  }, DEBOUNCE_MS);
}

function enqueue(payload: LiveWagerPayload, handler: WagerUpdateHandler): void {
  const key = `${payload.period}:${payload.userId}`;
  pendingByKey.set(key, payload);
  emitDebounced(handler);
}

export function connectLiveWagers(handler: WagerUpdateHandler): () => void {
  const s = getSocket();

  const onWager = (payload: LiveWagerPayload) => {
    enqueue(payload, handler);
  };

  s.on("wager", onWager);
  if (!s.connected) s.connect();

  return () => {
    s.off("wager", onWager);
    if (debounceTimer) {
      clearTimeout(debounceTimer);
      debounceTimer = null;
    }
    pendingByKey.clear();
  };
}

export function disconnect(): void {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}

export function isConnected(): boolean {
  return socket?.connected ?? false;
}
