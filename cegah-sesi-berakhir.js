// ==UserScript==
// @name         Anti Sesi Timeout DJKN + Notifikasi
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Menjaga sesi tetap aktif di dashboard DJKN dengan ping ringan dan notifikasi visual di halaman
// @author       Pakde Wongso
// @match        https://admin.lelang.go.id/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Tambahkan notifikasi di atas halaman
    const banner = document.createElement('div');
    banner.textContent = '✅ Script Tampermonkey untuk pencegahan sesi berakhir telah aktif.';
    banner.style.position = 'fixed';
    banner.style.top = '0';
    banner.style.left = '0';
    banner.style.width = '100%';
    banner.style.backgroundColor = '#28a745';
    banner.style.color = 'white';
    banner.style.fontWeight = 'bold';
    banner.style.textAlign = 'center';
    banner.style.padding = '8px';
    banner.style.zIndex = '9999';
    banner.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
    document.body.appendChild(banner);

    // Fungsi ping ke endpoint referensi jenis lelang
    function keepSessionAlive() {
        const timestamp = new Date().toLocaleTimeString();
        console.log(`[Anti Timeout] ${timestamp} - Ping ke server untuk menjaga sesi...`);

        fetch('https://api-backoffice.lelang.go.id/api/v1/master-v2-service/ref/jenis-lelang', {
            method: 'GET',
            credentials: 'include',
            cache: 'no-store'
        }).then(response => {
            if (response.ok) {
                console.log(`[Anti Timeout] ${timestamp} - Ping berhasil: ${response.status}`);
            } else {
                console.warn(`[Anti Timeout] ${timestamp} - Ping gagal: ${response.status}`);
            }
        }).catch(error => {
            console.error(`[Anti Timeout] ${timestamp} - Error saat ping:`, error);
        });
    }

    // Jalankan setiap 9 menit (540.000 ms)
    setInterval(keepSessionAlive, 540000);

    // Jalankan sekali saat script dimuat
    keepSessionAlive();
})();
