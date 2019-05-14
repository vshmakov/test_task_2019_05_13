import {RouteInterface} from "./RouteInterface";
import renderPage from '../renderPage';
import {URIComponents} from "uri-js";

export default abstract class AbstractRoute implements RouteInterface {
    protected parameters = {};

    protected setParameters(parameters): void {
        this.parameters = Object.assign({}, this.parameters, parameters);

        renderPage(this.getTitle(this.parameters), this.getTemplate().call(null, this.parameters));
    }

    protected abstract getTemplate(): any;

    protected abstract getTitle(parameters): string;

    public supports(uri: URIComponents): boolean {
        return false;
    }

    public onLoad(uri: URIComponents): void {
        this.setParameters(this.parameters);
    }

    public onSubmit(event): void {
    }
}