import * as $ from "jquery";

const UI = {
    title: $('title'),
    content: $('#app'),
};

export default function renderPage(title: string, content: string): void {
    UI.title.html(title);
    UI.content.html(content);
}