export interface RouteInterface {
    getTemplate(): any;

    getParameters(callback): void;

    getTitle(): string;

    supportsUrl(url: string): boolean;
}