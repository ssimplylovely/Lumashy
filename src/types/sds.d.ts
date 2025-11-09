// Type definitions for Somnia Data Streams SDK
// This is a mock type definition for demonstration purposes
// Replace with actual types from @somnia/data-streams package when available

declare module '@somnia/data-streams' {
  export interface SDSConfig {
    endpoint: string;
    apiKey: string;
    version?: string;
  }

  export interface StreamData {
    channel: string;
    timestamp: number;
    data: any;
  }

  export type StreamCallback = (data: StreamData) => void;

  export class SomniaDataStreams {
    constructor(config: SDSConfig);
    connect(): Promise<void>;
    disconnect(): void;
    subscribeToStream(channel: string, callback: StreamCallback): () => void;
    unsubscribeFromStream(channel: string): void;
    getConnectionStatus(): boolean;
  }
}
