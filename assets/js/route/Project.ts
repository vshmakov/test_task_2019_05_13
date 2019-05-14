import {RouteInterface} from "./RouteInterface";
import {Templates} from "../templates";
import AbstractRoute from "./AbstractRoute";
import {URIComponents} from "uri-js";
import * as $ from 'jquery';

export default new class extends AbstractRoute {
    private urlRegExp = /^\/project\/(\d+)\/$/;

    protected getTemplate(): any {
        return Templates.project;
    }

    protected getTitle(): string {
        return "Проект";
    }

    public supports(uri: URIComponents): boolean {
        console.log(uri.path, this.urlRegExp.test(uri.path));
        return this.urlRegExp.test(uri.path);
    }

    public onLoad(uri: URIComponents): void {
        const projectId = this.getProjectId(uri.path);
        this.getProject(projectId, (project): void => this.setParameters({
            project: project,
        }));
    }

    private getProjectId(path: string): number {
        return parseInt(path.match(this.urlRegExp)[1]);
    }

    private getProject(id: number, callback: (project) => void): void {
        $.get(`/api/projects/${id}`, {}, (project):void  => callback(project));
    }
}