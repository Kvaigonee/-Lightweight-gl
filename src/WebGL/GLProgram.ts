import ShaderPair from "./Shader/ShaderPair";


/**
 *
 */
export default class GLProgram {
    /**
     *
     * @private
     */
    private program: WebGLProgram;

    /**
     *
     * @private
     */
    private gl: WebGL2RenderingContext;

    /**
     *
     * @private
     */
    private shaderPair: ShaderPair

    /**
     *
     * @param gl
     * @param shaderPair
     */
    public constructor(gl: WebGL2RenderingContext,
                       shaderPair: ShaderPair) {
        this.gl = gl;
        this.shaderPair = shaderPair;

        this.program = this.updateShaderProgram();
        this.shaderPair.addEventListener("sourceUpdated", this.onShaderPairUpdated.bind(this));
    }

    /**
     *
     */
    public onShaderPairUpdated() {
        this.program = this.updateShaderProgram();
    }

    /**
     *
     * @private
     */
    private updateShaderProgram(): WebGLProgram {
        const vertexShader = this.shaderPair.getVertex().compile(this.gl);
        const fragmentShader = this.shaderPair.getFragment().compile(this.gl);

        let shaderProgram = this.gl.createProgram();

        if (shaderProgram === null) {
            throw new Error("Unable to create WebGL Program!");
        }

        this.gl.attachShader(shaderProgram, vertexShader);
        this.gl.attachShader(shaderProgram, fragmentShader);
        this.gl.linkProgram(shaderProgram);

        if (!this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS)) {
            this.gl.deleteProgram(shaderProgram);

            let info = this.gl.getProgramInfoLog(shaderProgram);
            throw new Error("Unable to initialize the shader program." + info);
        }

        return shaderProgram;
    }
}