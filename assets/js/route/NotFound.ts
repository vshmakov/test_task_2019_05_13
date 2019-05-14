import {RouteInterface} from "./RouteInterface";
import {Templates} from "../templates";
import AbstractRoute from "./AbstractRoute";

export default new class extends AbstractRoute {
    protected getTemplate(): any {
        return Templates.notFound;
    }

    protected getTitle(): string {
        return "404. Страница не найдена";
    }
}