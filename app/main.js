const appWrap = document.getElementById("app");
const apiUrl = "https://www.swapi.tech/api/films";

const cssPromises = {};

function loadResource(src) {
  if (src.endsWith(".js")) {
    return import(src);
  }

  if (src.endsWith(".css")) {
    if (!cssPromises[src]) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = src;
      cssPromises[src] = new Promise((resolve) => {
        link.addEventListener("load", resolve());
      });
      document.head.append(link);
    }

    return cssPromises[src];
  }

  return fetch(src).then((res) => res.json());
}

function eventClick(event) {
  event.preventDefault();
  history.pushState(null, "", event.currentTarget.href);
  renderApp();
}

function renderHomePage() {
  allPromise([
    "./home.js",
    "https://www.swapi.tech/api/films",
    "../css/normalize.css",
    "../css/style.css",
  ]).then(([module, data]) => {
    data.result.sort((a, b) => {
      if (a.properties.episode_id < b.properties.episode_id) return -1;
    });

    appWrap.append(module.renderHome(data.result, eventClick));
  });
}

function renderFilmPage(filmNumber) {
  loadResource(`${apiUrl}/${filmNumber}`).then((data) => {
    const titleName = data.result.properties.title;
    Promise.all([
      Promise.all(
        [data.result.properties.planets, data.result.properties.species].map(
          (res1) => allPromise(res1)
        )
      ),
      allPromise(["./film.js", "../css/normalize.css", "../css/style.css"]),
    ]).then(([arr, [module]]) =>
      appWrap.append(module.renderFilm(arr, data.result, titleName, eventClick))
    );
  });
}

function allPromise(arr) {
  return Promise.all(arr.map((src) => loadResource(src)));
}

function renderApp() {
  const searchParams = new URLSearchParams(location.search);
  const serialNumber = searchParams.get("serialNumber");

  appWrap.innerHTML = "";

  if (serialNumber) {
    renderFilmPage(serialNumber);
  } else {
    renderHomePage();
  }
}

window.addEventListener("popstate", () => {
  renderApp();
});

renderApp();
