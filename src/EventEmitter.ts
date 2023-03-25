/**
 *
 */
export default class EventEmitter<
    EventMap extends AbstractEventMap> {

    /**
     *
     * @private
     */
    private eventListenerList: Map<keyof EventMap, EventListener<EventMap, keyof EventMap>>
        = new Map<keyof EventMap, EventListener<EventMap, keyof EventMap>>();

    /**
     *
     * @private
     */
    private eventTarget = new EventTarget();

    /**
     *
     * @protected
     */
    protected constructor() {
        this.onEvent = this.onEvent.bind(this);
    }

    /**
     *
     * @param key
     * @param listener
     */
    public addEventListener(key: keyof EventMap, listener: EventListener<EventMap, keyof EventMap>) {
        this.eventListenerList.set(key, listener);
        this.eventTarget.addEventListener(key.toString(), this.onEvent);
    }

    /**
     *
     * @param key
     * @param data
     */
    public emitEvent(key: keyof EventMap, data: EventMap[keyof EventMap]) {
        this.eventTarget.dispatchEvent(new CustomEvent(key.toString(), {
            detail: data
        }));
    }

    /**
     *
     * @param key
     */
    public removeEventListener(key: keyof EventMap) {
        this.eventListenerList.delete(key);
        this.eventTarget.removeEventListener(key.toString(), this.onEvent);
    }

    /**
     *
     * @param evt
     * @private
     */
    private onEvent(evt: Event) {
        const callBack = this.eventListenerList.get(evt.type as keyof EventMap);
        if (!callBack) return;

        callBack((<CustomEvent<EventMap[keyof EventMap]>>evt).detail);
    }

}


export type EventListener<T extends AbstractEventMap, E extends keyof T> = (evt: T[E]) => void;

export interface AbstractEventMap {
}

