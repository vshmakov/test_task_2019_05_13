import {RouteInterface} from "./RouteInterface";
import {Templates} from "../templates";
import AbstractRoute from "./AbstractRoute";
import {URIComponents} from "uri-js";
import * as $ from 'jquery';
import {App} from '../app';

export default new class extends AbstractRoute {
    private urlRegExp = /^\/project\/(\d+)\/$/;

    protected getTemplate(): any {
        return Templates.project;
    }

    protected getTitle(parameters): string {
        return parameters.project.subject;
    }

    public supports(uri: URIComponents): boolean {
        return this.urlRegExp.test(uri.path);
    }

    public onLoad(uri: URIComponents): void {
        const projectId = this.getProjectId(uri.path);
        this.getProject(
            projectId,
            (project): void => this.setParameters({
                project: project,
            }),
            (): void => App.showNotFoundPage(uri)
        )
        ;
    }

    private getProjectId(path: string): number {
        return parseInt(path.match(this.urlRegExp)[1]);
    }

    private getProject(id: number, onSuccess: (project) => void, onFail: () => void): void {
        $.get(`/api/projects/${id}`, {}, (project): void => onSuccess(project))
            .fail(onFail);
    }
}