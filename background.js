function buildSearchUrl(searchTerm) {
  return `https://untappd.com/search?q=${searchTerm}&type=beer`;
}

function onCreated() {
  if (browser.runtime.lastError) {
    console.log(`Error: ${browser.runtime.lastError}`);
  } else {
    console.log("Item created successfully");
  }
}

function onTabCreated(tab) {
  console.log(`Created new tab: ${tab.id}`);
}

function onError(error) {
  console.log(`Error: ${error}`);
}

browser.contextMenus.create(
  {
    id: "untapped-search",
    title: "Search on Untappd",
    contexts: ["selection"],
  },
  onCreated
);

browser.contextMenus.onClicked.addListener((info) => {
  switch (info.menuItemId) {
    case "untapped-search":
      if (info.selectionText) {
        browser.tabs
          .create({
            url: buildSearchUrl(info.selectionText),
          })
          .then(onCreated, onError);
      }
  }
});
