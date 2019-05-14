import '../css/app.css';
import * as $ from "jquery";
import NotFound from "./route/NotFound";
import {RouteInterface} from "./route/RouteInterface";
import {Routes} from './route/routes';
import {parse as parseURI, URIComponents} from 'uri-js';

export const App = new class {
    private currentRoute: RouteInterface | null;

    public init(): void {
        this.bindHandlers();
        this.renderPage(location.href);
    }

    public showNotFoundPage(uri: URIComponents): void {
        this.setCurrentRoute(uri, NotFound);
    }

    private getRoute(uri: URIComponents): RouteInterface {
        let currentRoute;

        for (let key in Routes) {
            if (Routes[key].supports(uri)) {
                currentRoute = Routes[key];
                break;
            }
        }

        return currentRoute || NotFound;
    }

    private bindHandlers(): void {
        $(document).on('click', 'a', (event): void => this.navigate(event));
        $(document).on('submit', 'form', (event): void => this.submit(event));
        window.onpopstate = (event): void => this.popState(event);
    }

    private submit(event): void {
        event.stopPropagation();
        event.preventDefault();

        if (this.currentRoute) {
            this.currentRoute.onSubmit(event);
        }
    }

    private popState(event): void {
        const href = (event.state && event.state.page) || '/';
        this.loadPage(href);
    }

    private navigate(event): void {
        event.stopPropagation();
        event.preventDefault();

        this.loadPage(event.target.href);
    }

    private loadPage(href: string): void {
        history.pushState({page: href}, '', href);
        this.renderPage(href);
    }

    private renderPage(href: string): void {
        const uri = parseURI(href);
        const route = this.getRoute(uri);

        this.setCurrentRoute(uri, route);
    }


    private setCurrentRoute(uri: URIComponents, route: RouteInterface): void {
        this.currentRoute = route;
        route.onLoad(uri);
    }
}

App.init();