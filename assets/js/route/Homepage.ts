import {Templates} from "../templates";
import AbstractRoute from "./AbstractRoute";
import * as $ from 'jquery';
import {URIComponents} from "uri-js";

export default new class extends AbstractRoute {
    protected parameters = {
        subject: '',
        updatedOn: '',
        projects: [],
        isLoading: true,
    };

    protected getTemplate(): any {
        return Templates.homepage;
    }

    protected getTitle(): string {
        return "Homepage";
    }

    public supports(uri: URIComponents): boolean {
        return '/' === uri.path;
    }

    public onLoad(uri: URIComponents): void {
        super.onLoad(uri);

        $.get('/api/projects', {}, (projects): void => this.setParameters({
            projects: this.processProjects(projects),
            isLoading: false,
        }));
    }

    public onSubmit(event): void {
        this.setParameters({
            isLoading: true,
        });

        const form = $(event.target);
        const subject = form.find('input[name=subject]').val();
        const updatedOn = form.find('input[name=updated-on]').val();

        $.get(
            '/api/projects',
            {
                subject: subject,
                'updatedOn[before]': updatedOn,
            },
            (projects): void => {
                this.setParameters({
                    subject: subject,
                    updatedOn: updatedOn,
                    projects: this.processProjects(projects),
                    isLoading: false,
                });
            });
    }

    private processProjects(projects) {
        return projects.map((project) => {
            project.summery = this.createSummery(project.description);

            return project;
        });
    }

    private createSummery(text: string): string {
        let summery = text.slice(0, 125);
        let lastSpace = summery.lastIndexOf(' ');

        if (-1 !== lastSpace) {
            summery = summery.slice(0, lastSpace);
        }

        return summery + "...";
    }
}