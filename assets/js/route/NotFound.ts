import {RouteInterface} from "./RouteInterface";
import {Templates} from "../templates";

export default new class implements RouteInterface {
    public getTemplate(): any {
        return Templates.notFound;
    }

    getParameters(callback): void {
        callback({});
    }

    public getTitle(): string {
        return "404. Страница не найдена";
    }

    public supportsUrl(url: string): boolean {
        return true;
    }
}