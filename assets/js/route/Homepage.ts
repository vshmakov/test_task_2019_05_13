import {RouteInterface} from "./RouteInterface";
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
        return "Главная страница";
    }

    public supports(uri: URIComponents): boolean {
        return '/' === uri.path;
    }

    onLoad(uri: URIComponents): void {
        super.onLoad(uri);

        $.get('/api/projects', {}, (projects): void => this.setParameters({
            projects: projects,
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
                    projects: projects,
                    isLoading: false,
                });
            });
    }
}