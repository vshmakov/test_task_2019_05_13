import {RouteInterface} from "./RouteInterface";
import {Templates} from "../templates";
import AbstractRoute from "./AbstractRoute";
import * as $ from 'jquery';
import {URIComponents} from "uri-js";

export default new class extends AbstractRoute {
    protected parameters = {
        projects: [],
        isLoading: true,
    };

    protected getTemplate(): any {
        return Templates.homepage;
    }

    protected getTitle(): string {
        return "Главная страница";
    }

    public supports(uri: URIComponents): boolean {
        return '/' === uri.path;
    }

    onLoad(uri: URIComponents): void {
        super.onLoad(uri);

        $.get('/projects.json', {}, (data): void => this.setParameters({
            projects: data.issues,
            isLoading: false,
        }));
    }
}