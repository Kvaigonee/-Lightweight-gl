import Shader from "./Shader";
import EventEmitter, {AbstractEventMap} from "../../EventEmitter";

export default class ShaderPair extends EventEmitter<ShaderPairEventMap> {

    private vertex: Shader;

    private fragment: Shader;

    public constructor(vertex: Shader,
                       fragment: Shader) {
        super();
        if (vertex.type !== WebGL2RenderingContext["VERTEX_SHADER"] ||
            fragment.type !== WebGL2RenderingContext["FRAGMENT_SHADER"]) {
            throw new Error("Shader types error!");
        }

        this.vertex = vertex;
        this.fragment = fragment;
    }

    public getVertex() {
        return this.vertex;
    }

    public getFragment() {
        return this.fragment;
    }

    /**
     *
     * @param vertexSource
     * @param fragmentSource
     */
    public updateSource(vertexSource: string, fragmentSource: string) {
        this.vertex.updateSource(vertexSource);
        this.fragment.updateSource(fragmentSource);

        this.emitEvent("sourceUpdated");
    }

}

interface ShaderPairEventMap extends AbstractEventMap {
    sourceUpdated: void;
}

