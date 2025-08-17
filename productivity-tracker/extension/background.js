let currentTab = null;
let startTime = null;

chrome.tabs.onActivated.addListener(({ tabId }) => {
  chrome.tabs.get(tabId, (tab) => {
    logTime();
    currentTab = tab.url;
    startTime = Date.now();
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.active && changeInfo.status === "complete") {
    logTime();
    currentTab = tab.url;
    startTime = Date.now();
  }
});

function logTime() {
  if (currentTab && startTime) {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    chrome.storage.local.get(["siteData"], (res) => {
      const data = res.siteData || {};
      const hostname = new URL(currentTab).hostname;
      data[hostname] = (data[hostname] || 0) + timeSpent;
      chrome.storage.local.set({ siteData: data });
    });
  }
}