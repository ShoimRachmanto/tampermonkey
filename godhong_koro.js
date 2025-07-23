// ==UserScript==
// @name         Godhong Koro v1.5 - Kompas, Chordtela, GliaStudio, Detik
// @namespace    http://tampermonkey.net/
// @version      1.6
// @description  Sapu iklan popup, sticky video, dan iklan GliaStudio. Klik otomatis tombol tutup jika perlu!
// @author       Pakde
// @match        https://www.kompas.com/*
// @match        https://*.kompas.com/*
// @match        https://www.msn.com/*
// @match        https://*.msn.com/*
// @match        https://www.chordtela.com/*
// @match        https://s.id/*
// @match        https://www.detik.com/*
// @match        https://www.detik.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // 🍃 Utility: hapus semua elemen yang cocok dengan daftar selektor
    function removeElements(selectors) {
        selectors.forEach(sel => {
            document.querySelectorAll(sel).forEach(el => el.remove());
        });
    }

    // 🍂 Kompas Cleanup
    function bersihkanKompas() {
        const selektorKompas = [
            '[id*="ads"]',
            '[class*="ads"]',
            '[class*="banner"]',
            '[class*="advert"]',
            '[class*="promo"]',
            '[class*="sponsor"]',
            '[class*="pop"]',
            '.parallax-ad',
            '.bottom-sticky-ads',
            '.top-sticky-ads',
            '.gdn-overlay',
            '.overlay',
            '.sticky-ads',
            '.video-ads',
            'iframe[src*="ads"]',
            'iframe[src*="doubleclick"]',
            'iframe[src*="googlesyndication"]',
            '.kompas-tv-wrapper',
            '.bx-wrapper'
        ];

        removeElements(selektorKompas);

        const adblockPopup = document.querySelector('.fc-ab-root, .fc-dialog-container, .gdn-overlay, .popup__wrapper, .popup-adblock');
        if (adblockPopup) adblockPopup.remove();

        const closeBtn = document.querySelector('.kcm__close__icon, .popup__close, .popup-adblock .close, .popup-adblock button');
        if (closeBtn) {
            closeBtn.click();
            console.log('[Godhong Koro] Kompas: klik tombol close popup.');
        }
    }

    // 🎶 Chordtela Cleanup
    function bersihkanChordtela() {
        const stickyVideo = document.querySelector('div[style*="position: fixed"], .video-float, .sticky-player');
        if (stickyVideo) {
            stickyVideo.remove();
            console.log('[Godhong Koro] Chordtela: video sticky dibuang.');
        }

        const svgClosePath = document.querySelector('svg path[d*="l4.5 4.5"]');
        if (svgClosePath) {
            const parentBtn = svgClosePath.closest('button, div, span');
            if (parentBtn) {
                parentBtn.click();
                console.log('[Godhong Koro] Chordtela: klik tombol close mini player.');
            }
        }

        const popupBawah = document.querySelectorAll('div[style*="position: fixed"], .popup, .ads-float, .bottom-popup');
        popupBawah.forEach(popup => {
            const tombolClose = popup.querySelector('svg path[d*="l4.5 4.5"]')?.closest('button, span, div');
            if (tombolClose) {
                tombolClose.click();
                console.log('[Godhong Koro] Chordtela: tutup popup semak-semak.');
            } else if (popup.querySelector('svg')) {
                popup.querySelector('svg').click();
                console.log('[Godhong Koro] Chordtela: klik SVG langsung (fallback).');
            }
        });
    }

    // 📺 GliaStudio Cleanup
    function bersihkanGliaStudio() {
        document.querySelectorAll('.material-icons').forEach(el => {
            if (el.textContent.trim().toLowerCase() === 'close') {
                const btn = el.closest('button, div');
                if (btn) {
                    btn.click();
                    console.log('[Godhong Koro] GliaStudio: klik tombol "close".');
                }
            }
        });
    }

    // 📰 Detik Cleanup
    function bersihkanDetik() {
        const tombolCloseAd = document.querySelector('.balloon_close');
        if (tombolCloseAd && tombolCloseAd.innerText.includes('CLOSE AD')) {
            tombolCloseAd.click();
            console.log('[Godhong Koro] Detik: klik tombol CLOSE AD.');
        }
    }

    // 🪷 Tambahkan sambutan khusus Pakde
    function sambutanPakde() {
        if (!document.querySelector('#pakde-sambutan')) {
            const header = document.createElement('div');
            header.id = 'pakde-sambutan';
            header.textContent = '📰 Monggo Pakde, wis resik kabeh. Baca & nyanyi sing anteng...';
            header.style = 'font-size: 18px; font-weight: bold; background: #f9f9f9; padding: 10px; margin-bottom: 10px; border-left: 5px solid #4b0082;';
            document.body.prepend(header);
        }

        document.body.style.overflow = 'auto';
        document.body.classList.remove('no-scroll');
    }

    // 🪷 Bersihkan iklan sticky di s.id
    function bersihkanIklanStickySId() {
        document.querySelectorAll('button').forEach(btn => {
            if (btn.innerText.includes('0 Items')) {
                const parentDiv = btn.closest('div.fixed');
                if (parentDiv) {
                    parentDiv.remove();
                    console.log('[Godhong Koro] Iklan sticky s.id (0 Items) dihapus.');
                }
            }
        });
    }

    // 🪷 Klik Hero Icons Hilangkan iklan sticky
    function klikSVGHeroiconsX() {
        const paths = document.querySelectorAll('svg path');
        paths.forEach(path => {
            const d = path.getAttribute('d') || '';
            if (d.includes('M5.47 5.47') && d.includes('L12 10.94')) {
                const parent = path.closest('button, div, span');
                if (parent) {
                    parent.click();
                    console.log('[Godhong Koro] Klik SVG silang Heroicons.');
                }
            }
        });
    }

    // 🌿 Fungsi utama
    function sebarGodhongKoro() {
        if (location.hostname.includes('kompas.com')) bersihkanKompas();
        if (location.hostname.includes('chordtela.com')) bersihkanChordtela();
        if (location.hostname.includes('s.id')) {
            bersihkanGliaStudio();
            bersihkanIklanStickySId();
            klikSVGHeroiconsX();
        }
        if (location.hostname.includes('detik.com')) bersihkanDetik();
        sambutanPakde();
    }

    // 🌀 Jalankan saat load dan berkala
    window.addEventListener('load', () => {
        sebarGodhongKoro();
        setInterval(sebarGodhongKoro, 2000); // ngawasi terus
    });

})();
