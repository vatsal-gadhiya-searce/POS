const ReactApp = require("../build_ssr/main").default;
const assetManifest = require("../build_ssr/asset-manifest.json")
const path = require("path");
const express = require("express");
const PORT = process.env.PORT || 5555;
const app = express();

app.use('/static', express.static(path.join(__dirname, '../build/static')));

/*app.get('/favicon.ico', function(req, res) {
    res.status(204);
});*/

app.get('*', async function(req, res) {
    const html = await ReactApp.getHTML(req.url, assetManifest['main.css']);
    res.send(html.html);
});


app.listen(PORT, function() {
    console.log("Running on http://localhost:" + PORT);
});