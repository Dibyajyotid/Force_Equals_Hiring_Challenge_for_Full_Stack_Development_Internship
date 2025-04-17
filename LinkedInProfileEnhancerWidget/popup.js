document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("toggleWidget");

  // Load saved state
  chrome.storage.sync.get(["widgetVisible"], function (result) {
    toggle.checked = result.widgetVisible !== false;
  });

  // Save state when toggled
  toggle.addEventListener("change", function () {
    chrome.storage.sync.set({ widgetVisible: this.checked });

    // Send message to content script to update visibility
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "toggleWidget",
        visible: toggle.checked,
      });
    });
  });
});
