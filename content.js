chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'getArticleData') {
        const title = document.querySelector('h1').innerText;
        const url = window.location.href;

        sendResponse({ title, url });
    }
});
