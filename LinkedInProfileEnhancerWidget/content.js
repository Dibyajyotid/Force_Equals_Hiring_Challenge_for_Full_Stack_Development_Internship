// const sampleData = {
//   companyName: "TechCorp",
//   matchScore: 86,
//   accountStatus: "Target",
// };

function createWidget(data) {
  const widget = document.createElement("div");
  widget.className = "linkedin-enhancer-widget";
  widget.innerHTML = `
      <div class="widget-header">Company Information</div>
      <div class="company-name">${data.companyName}</div>
      <div class="score-container">
        <div class="score-label">
          <span>Match Score</span>
          <span class="score-value">${data.matchScore}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${data.matchScore}%"></div>
        </div>
      </div>
      <div class="status-container">
        <span class="status-label">Account Status:</span>
        <span class="status-tag status-${data.accountStatus
          .toLowerCase()
          .replace(" ", "-")}">
          ${data.accountStatus}
        </span>
      </div>
    `;

  document.body.appendChild(widget);

  chrome.storage.sync.get(["widgetVisible"], function (result) {
    if (result.widgetVisible === false) {
      widget.classList.add("hidden");
    }
  });
}

// Load data from JSON file
fetch(chrome.runtime.getURL("data.json"))
  .then((response) => response.json())
  .then((data) => {
    if (
      window.location.href.includes("/in/") ||
      window.location.href.includes("/company/")
    ) {
      createWidget(data);
    }
  })
  .catch((error) => {
    console.error("Error loading data:", error);
  });

// Listen for messages from popup
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "toggleWidget") {
    const widget = document.querySelector(".linkedin-enhancer-widget");
    if (widget) {
      if (request.visible) {
        widget.classList.remove("hidden");
      } else {
        widget.classList.add("hidden");
      }
    }
  }
});

// Checking if we are on a profile page and inject the widget
if (
  window.location.href.includes("/in/") ||
  window.location.href.includes("/company/")
) {
  createWidget(data);
}
