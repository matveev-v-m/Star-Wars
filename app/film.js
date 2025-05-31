function createList(arr) {
  const list = document.createElement("ul");
  list.classList.add("list-reset", "list");

  arr.forEach((element) => {
    const li = document.createElement("li");
    li.classList.add("li");
    li.textContent = element.result.properties.name;

    list.append(li);
  });

  return list;
}

export function renderFilm(arr, data, titleName, eventClick) {
  const wrap = document.createElement("div");
  wrap.classList.add("app");
  const title = document.createElement("h1");
  title.classList.add("film_title");
  title.textContent = `${titleName} - Episode ${data.properties.episode_id}`;

  const backBtn = document.createElement("a");
  backBtn.classList.add("link");
  backBtn.textContent = "Back to episodes";
  backBtn.href = "index.html";
  backBtn.addEventListener("click", eventClick);

  const descr = document.createElement("p");
  descr.classList.add("descr");
  descr.textContent = data.properties.opening_crawl;

  const planetsTitle = document.createElement("h2");
  planetsTitle.textContent = "Planets";
  planetsTitle.classList.add("film_itemTitle");

  const planetsList = createList(arr[0]);

  const speciesTitle = document.createElement("h2");
  speciesTitle.textContent = "Species";
  speciesTitle.classList.add("film_itemTitle");

  const speciesList = createList(arr[1]);

  wrap.append(
    title,
    backBtn,
    descr,
    planetsTitle,
    planetsList,
    speciesTitle,
    speciesList
  );

  return wrap;
}
