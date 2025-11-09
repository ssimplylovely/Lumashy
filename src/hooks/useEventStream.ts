import { useState, useEffect } from 'react';
import { eventStreamService, OnChainEvent } from '../services/eventService';

export function useEventStream(limit: number = 5) {
  const [events, setEvents] = useState<OnChainEvent[]>([]);

  useEffect(() => {
    // Start the event stream
    eventStreamService.startEventStream();

    // Subscribe to new events
    const unsubscribe = eventStreamService.subscribe((newEvent) => {
      setEvents((prevEvents) => {
        const updated = [newEvent, ...prevEvents];
        return updated.slice(0, limit);
      });
    });

    // Get initial events
    setEvents(eventStreamService.getRecentEvents(limit));

    return () => {
      unsubscribe();
    };
  }, [limit]);

  return events;
}
