import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticAdapter } from 'mobx-state-router';
import { RootStore } from './stores/RootStore'
import { createLocation } from "history"
import App from './App';

const ReactApp = {
    getHTML: async(location, cssHref) => {
        const rootStore = new RootStore();
        const staticAdapter = new StaticAdapter(rootStore.routerStore);
        await staticAdapter.goToLocation(createLocation(location));

        await Promise.resolve(rootStore.pageStore.currentPageLoadPromise);

        const reactContent = ReactDOMServer.renderToString(
            <App rootStore={rootStore}/>
        );

        const html = (
            <Html content={reactContent} cssHref={cssHref}/>
        );

        return {
            html: `<!doctype html>\n${ReactDOMServer.renderToStaticMarkup(
                html
            )}`
        };
    }
};

function Html({ content, cssHref}) {
    return (
        <html>
        <head>
            <link href={cssHref} rel="stylesheet" />
        </head>
        <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
        </body>
        </html>
    );
}

export default ReactApp;