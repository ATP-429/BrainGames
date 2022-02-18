//We've done all of this so we don't have to keep including the files on every single pages
//Basically, we're calling an async function which waits for each file to load
//After all the included files are loaded, we then call includeAll(), which loads all the urls that we passed using include() function
//The reason we have to do that, is when we include a react js file, for eg, it needs the react development cdns loaded
//If they're not loaded, we get errors. So we can't directly use <script>, since the react cdns wouldn't have been loaded when <script> tag gets executed
//So, we use include() function in that html file instead, so the url to be included gets pushed to the array, which will then get evaluated after all the cdns are evaluated.

let urls = [];

var include = (url) => {
    urls.push(url);
}

let includeAll = async () => {
    for(url of urls) {
        addJS(url);
        //await fetch(url).then(file => file.text()).then((text) => eval.call(window, text));
    }
}

let addCSS = (url) => {
    let head  = document.getElementsByTagName('head')[0];
    let link  = document.createElement('link');
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = url;
    link.media = 'all';
    head.appendChild(link);
}

let addJS = (url) => {
    var script = document.createElement("script");
    script.src = url;
    script.type = "text/javascript";
    script.onload = function () {
        console.log('script was loaded successfully');
    }
    script.onerror = function (e) {
        console.error('script.onerror');
    }
    document.getElementsByTagName("head")[0].appendChild(script);
}

(async () => {
    // await fetch('https://unpkg.com/react@17/umd/react.development.js').then(file => file.text()).then((text) => eval.call(window, text));
    // await fetch('https://unpkg.com/react-dom@17/umd/react-dom.development.js').then(file => file.text()).then((text) => eval.call(window, text));
    // await fetch('/js/request.js').then(file => file.text()).then((text) => eval.call(window, text));
    includeAll();
})();
