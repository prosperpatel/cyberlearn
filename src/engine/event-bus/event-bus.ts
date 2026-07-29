import type { EngineEventName, EngineEventPayload } from './events'

type Listener<E extends EngineEventName> = (payload: EngineEventPayload<E>) => void

/**
 * Strongly-typed publish/subscribe event bus.
 *
 * Engine systems communicate through this bus to remain decoupled.
 * No system should import another system's implementation — only its types.
 *
 * Usage:
 *   const unsub = engineBus.on('scene:enter', ({ sceneId }) => { ... })
 *   engineBus.emit('scene:enter', { sceneId: 'boot' })
 *   unsub()
 */
export class EventBus {
  private readonly listeners = new Map<string, Set<Listener<EngineEventName>>>()

  /** Subscribe to an event. Returns an unsubscribe function. */
  on<E extends EngineEventName>(event: E, listener: Listener<E>): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set())
    }
    const bucket = this.listeners.get(event)!
    bucket.add(listener as Listener<EngineEventName>)
    return () => this.off(event, listener)
  }

  /** Subscribe to an event exactly once. Auto-unsubscribes after first fire. */
  once<E extends EngineEventName>(event: E, listener: Listener<E>): () => void {
    const wrapped: Listener<E> = (payload) => {
      listener(payload)
      this.off(event, wrapped)
    }
    return this.on(event, wrapped)
  }

  /** Unsubscribe a specific listener. */
  off<E extends EngineEventName>(event: E, listener: Listener<E>): void {
    this.listeners.get(event)?.delete(listener as Listener<EngineEventName>)
  }

  /** Emit an event with its required payload. */
  emit<E extends EngineEventName>(event: E, payload: EngineEventPayload<E>): void {
    this.listeners.get(event)?.forEach((listener) => {
      try {
        listener(payload)
      } catch (err) {
        console.error(`[EventBus] Uncaught error in "${event}" handler:`, err)
      }
    })
  }

  /** Remove all listeners for a specific event, or all events if omitted. */
  clear(event?: EngineEventName): void {
    if (event !== undefined) {
      this.listeners.delete(event)
    } else {
      this.listeners.clear()
    }
  }

  /** Number of active listeners for a given event. */
  listenerCount(event: EngineEventName): number {
    return this.listeners.get(event)?.size ?? 0
  }
}

/**
 * Application-wide singleton bus.
 * Import this in any module that needs to publish or subscribe to engine events.
 */
export const engineBus = new EventBus()
