import  {URIComponents} from  'uri-js';

export interface RouteInterface {
    supports(uri: URIComponents): boolean;

    onLoad(uri: URIComponents): void;

}