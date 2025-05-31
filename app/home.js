export function renderHome(data, eventClick) {
  const wrap = document.createElement("div");
  wrap.classList.add("app");
  const title = document.createElement("h1");
  title.classList.add("title");
  title.textContent = "Star Wars";

  const list = document.createElement("ul");
  list.classList.add("list-reset");

  data.forEach((element) => {
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.classList.add("link");
    link.href = `?serialNumber=${element.uid}`;
    link.addEventListener("click", eventClick);

    const desc = document.createElement("span");
    desc.textContent = `Episode  ${element.properties.episode_id}`;

    const itemTitle = document.createElement("h2");
    itemTitle.classList.add("itemTitle");
    itemTitle.textContent = element.properties.title;

    link.append(desc, itemTitle);

    item.append(link);
    list.append(item);
  });

  wrap.append(title, list);

  return wrap;
}
