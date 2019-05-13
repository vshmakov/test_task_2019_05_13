import {RouteInterface} from "./RouteInterface";
import {Templates} from "../templates";

export  default  new class implements RouteInterface {
    public getTemplate(): any {
        return Templates.homepage;
    }

    getParameters(callback): void {
        callback({name: 'Alex'});
    }

    public getTitle(): string {
        return "Главная страница";
    }

   public supportsUrl(url: string): boolean {
        console.log(url);
        return '/' === url;
    }

}