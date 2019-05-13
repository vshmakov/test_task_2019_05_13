import '../css/app.css';
import * as $ from "jquery";
import NotFound from "./route/NotFound";
import {RouteInterface} from "./route/RouteInterface";
import {Routes} from './route/routes';

const UI = {
    title: $('title'),
    content: $('#app'),
};


new class {
    public constructor() {
        this.bindHandlers();
        this.renderPage(this.getRoute(location.href));
    }

    private getPath(href: string): string {
        return '/';
    }

    private getRoute(href: string): RouteInterface {
        let currentRoute;

        for (let key in Routes) {
            if (Routes[key].supportsUrl(this.getPath(href))) {
                currentRoute = Routes[key];
                break;
            }
        }

        return currentRoute || NotFound;
    }

    private bindHandlers(): void {
        $(document).on('click', 'a', (event): void => this.navigate(event));
        window.onpopstate = (event): void => this.popState(event);
    }

    private popState(event): void {
        const url = (event.state && event.state.page) || '/';
        this.loadPage(url);
    }

    private navigate(event): void {
        event.stopPropagation();
        event.preventDefault();

        this.loadPage(event.target.href);
    }

    private loadPage(url: string): void {
        this.renderPage(
            this.getRoute(url)
        );

        history.pushState({page: url}, '', url);
    }

    private renderPage(route: RouteInterface): void {
        UI.title.html(route.getTitle());
        route.getParameters((parameters): void => {
            UI.content.html(
                route.getTemplate().call(null, parameters)
            );
        });
    }
}