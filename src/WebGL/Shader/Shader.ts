import EventEmitter, {AbstractEventMap} from "../../EventEmitter";

/**
 *
 */
export default class Shader extends EventEmitter<ShaderEventMap> {
    /**
     *
     */
    public readonly type: ShaderType;

    /**
     *
     * @private
     */
    private source: string;

    /**
     *
     * @param type
     * @param source
     */
    public constructor(type: ShaderType, source: string) {
        super();
        this.type = type;
        this.source = source;
    }

    /**
     *
     * @param source
     */
    public updateSource(source: string) {
        this.source = source;
        this.emitEvent("sourceUpdated");
    }

    /**
     *
     * @param gl
     */
    public compile(gl: WebGL2RenderingContext) : WebGLShader {
        let shader = gl.createShader(this.type);

        if(shader === null){
            throw new Error("Unable to create shader type of: " + this.type);
        }

        gl.shaderSource(shader, this.source);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            throw new Error("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
        }

        this.emitEvent("compiled", { status: true })

        return shader;
    }
}


export interface ShaderEventMap extends AbstractEventMap {
    compiled : { status: boolean };
    sourceUpdated : void;
}

export type ShaderType = WebGL2RenderingContext["FRAGMENT_SHADER"] | WebGL2RenderingContext["VERTEX_SHADER"];