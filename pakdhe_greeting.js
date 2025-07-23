// ==UserScript==
// @name         Monggo Pakde Greeting (Persistent via MutationObserver)
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Tampilkan sambutan "Monggo Pakde, mbahas nopo malih?" setiap new chat ChatGPT dibuka
// @author       Pakde
// @match        https://chatgpt.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const showGreeting = () => {
        const h1 = document.querySelector('h1');
        if (!h1 || document.getElementById('pakde-greeting')) return;

        h1.style.display = 'none';

        const greeting = document.createElement('div');
        greeting.id = 'pakde-greeting';
        greeting.textContent = 'Monggo Pakde, mbahas nopo malih?';
        greeting.style = `
            font-size: 1.5em;
            font-weight: bold;
            color: #006400;
            margin-bottom: 10px;
        `;

        h1.parentElement.insertBefore(greeting, h1);
    };

    const observer = new MutationObserver(() => {
        showGreeting();
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();