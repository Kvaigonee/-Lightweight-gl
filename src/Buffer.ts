

/**
 *
 */
export default class Buffer {

    private data : BufferDataType;

    private BUFFER_TYPE : BUFFER_TYPE;

    private id : number;

    public constructor(data : BufferDataType = new Float32Array(0),
                       bufferType : BUFFER_TYPE = BUFFER_TYPE.ARRAY,
                       id: number) {
        this.data = data;
        this.BUFFER_TYPE = bufferType;
        this.id = id;
    }

    public getId() {
        return this.id;
    }

    public getData() {
        return this.data;
    }

    public getType() {
        return this.BUFFER_TYPE;
    }

    public update(data: BufferDataType) {
        this.data = data;
    }
}

/**
 *
 */
export type BufferDataType = ArrayBuffer | ArrayBufferView;

/**
 *
 */
export enum BUFFER_TYPE {
    ARRAY = WebGL2RenderingContext["ARRAY_BUFFER"],
    ELEMENTS = WebGL2RenderingContext["ELEMENT_ARRAY_BUFFER"]
}

