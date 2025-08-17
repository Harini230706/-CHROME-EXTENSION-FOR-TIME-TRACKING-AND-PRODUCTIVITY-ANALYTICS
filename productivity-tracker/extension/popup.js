chrome.storage.local.get("siteData", (res) => {
  const list = document.getElementById("siteList");
  const data = res.siteData || {};
  for (let [site, seconds] of Object.entries(data)) {
    const li = document.createElement("li");
    li.textContent =' ${site} - ${Math.floor(seconds / 60)} mins';
    list.appendChild(li);
  }
});