/* =========================================================
   AERIUM — INTERACTIVE 3D NEIGHBOURHOOD MAP
   MapLibre GL (self-hosted in /vendor) + OpenFreeMap tiles
   (free, no API key). Tiles load in the visitor's browser.

   To add a hotspot: copy one object in HOTSPOTS and paste the
   latitude/longitude from Google Maps (the two numbers after
   "!3d" and "!4d" in a place link, or right-click > copy).
   ========================================================= */
(function () {
    'use strict';

    var AERIUM = { lat: -6.1671576, lng: 106.7427794 };

    var CATEGORIES = {
        home: { label: 'Aerium', color: '#B8905A', icon: 'A' },
        cafe: { label: 'Kafe & Resto', color: '#B8664A', icon: '☕' },
        school: { label: 'Sekolah', color: '#3E6B5E', icon: '✎' },
        mall: { label: 'Mall', color: '#8E5AB8', icon: '◆' },
        hospital: { label: 'Rumah Sakit', color: '#C0392B', icon: '✚' },
        office: { label: 'Kantor & Hotel', color: '#2C5F8A', icon: '▣' },
        highway: { label: 'Akses Tol', color: '#555F5B', icon: '⇄' }
    };

    // Only coordinates verified from a published source are listed here.
    var HOTSPOTS = [
        {
            id: 'aerium',
            name: 'Aerium Residence',
            cats: ['home'],
            lat: -6.1671576,
            lng: 106.7427794,
            desc: 'Jl. Pulau Melintang A No. 20, Taman Permata Buana. Apartemen siap huni, 75% area hijau, dog-friendly.',
            time: 'Rumah Anda'
        },
        {
            id: 'springfield-pb3',
            name: 'Springfield School (PB3)',
            cats: ['school'],
            lat: -6.166217,
            lng: 106.7467304,
            desc: 'Sekolah internasional kurikulum Cambridge, Mandarin (HSK), akreditasi WASC. Kampus PB1, PB2, PB3 semuanya di dalam Taman Permata Buana.',
            time: 'Di dalam kompleks',
            link: '/artikel/sekolah-dekat-aerium/'
        },
        {
            id: 'pim',
            name: 'Puri Indah Mall & Puri Indah Mall 2',
            cats: ['mall', 'cafe'],
            lat: -6.188257,
            lng: 106.73389,
            desc: 'Tiong Bahru Bakery, ZUS Coffee, UNION, HiGeorge!, SMARA, Din Tai Fung, Sushi Tei, dan 100+ outlet F&B.',
            time: '± 11 menit',
            link: '/artikel/restoran-puri-indah-mall-lippo-mall-puri/'
        },
        {
            id: 'lmp',
            name: 'Lippo Mall Puri · St. Moritz',
            cats: ['mall', 'office', 'cafe'],
            lat: -6.188011,
            lng: 106.738755,
            desc: 'Superblok St. Moritz: Lippo Mall Puri, Living Plaza, JW Marriott Hotel, office tower. Eric Kayser, Ippudo, TGI Fridays, Pizza Marzano.',
            time: 'Koridor Puri Indah Raya',
            link: '/artikel/restoran-puri-indah-mall-lippo-mall-puri/'
        },
        {
            id: 'rspi',
            name: 'RS Pondok Indah – Puri Indah',
            cats: ['hospital'],
            lat: -6.18619,
            lng: 106.735355,
            desc: 'Rumah sakit rujukan keluarga di Jl. Puri Indah Raya.',
            time: '± 9 menit'
        }
    ];

    var section = document.getElementById('peta');
    if (!section) return;

    var mapEl = document.getElementById('aeriumMap');
    var listEl = document.getElementById('mapList');
    var chipsEl = document.getElementById('mapChips');
    var fallbackEl = document.getElementById('mapFallback');

    function distanceKm(a, b) {
        var R = 6371;
        var dLat = (b.lat - a.lat) * Math.PI / 180;
        var dLng = (b.lng - a.lng) * Math.PI / 180;
        var x = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(a.lat * Math.PI / 180) * Math.cos(b.lat * Math.PI / 180) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
        return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
    }

    function fmtKm(km) {
        if (km < 1) return '± ' + Math.round(km * 1000 / 10) * 10 + ' m';
        return '± ' + km.toFixed(1).replace('.', ',') + ' km';
    }

    HOTSPOTS.forEach(function (h) {
        h.km = h.id === 'aerium' ? 0 : distanceKm(AERIUM, h);
    });

    /* ---------- List + chips (work even without WebGL) ---------- */
    var activeCat = 'all';

    function renderChips() {
        var counts = {};
        HOTSPOTS.forEach(function (h) {
            h.cats.forEach(function (c) { counts[c] = (counts[c] || 0) + 1; });
        });
        var html = '<button class="map-chip is-active" data-cat="all">Semua <span>' + HOTSPOTS.length + '</span></button>';
        Object.keys(CATEGORIES).forEach(function (key) {
            if (key === 'home' || !counts[key]) return;
            html += '<button class="map-chip" data-cat="' + key + '"><i style="background:' + CATEGORIES[key].color + '"></i>' +
                CATEGORIES[key].label + ' <span>' + counts[key] + '</span></button>';
        });
        chipsEl.innerHTML = html;
        chipsEl.querySelectorAll('.map-chip').forEach(function (chip) {
            chip.addEventListener('click', function () {
                activeCat = chip.getAttribute('data-cat');
                chipsEl.querySelectorAll('.map-chip').forEach(function (c) {
                    c.classList.toggle('is-active', c === chip);
                });
                applyFilter();
            });
        });
    }

    function renderList() {
        var sorted = HOTSPOTS.slice().sort(function (a, b) { return a.km - b.km; });
        listEl.innerHTML = sorted.map(function (h) {
            var cat = CATEGORIES[h.cats[0]];
            return '<li class="map-item" data-id="' + h.id + '" data-cats="' + h.cats.join(' ') + '">' +
                '<button type="button">' +
                '<span class="map-dot" style="background:' + cat.color + '">' + cat.icon + '</span>' +
                '<span class="map-item-text"><strong>' + h.name + '</strong>' +
                '<small>' + (h.id === 'aerium' ? h.time : h.time + ' · ' + fmtKm(h.km) + ' garis lurus') + '</small></span>' +
                '</button></li>';
        }).join('');
    }

    function applyFilter() {
        listEl.querySelectorAll('.map-item').forEach(function (li) {
            var cats = li.getAttribute('data-cats').split(' ');
            var show = activeCat === 'all' || cats.indexOf(activeCat) > -1 || li.getAttribute('data-id') === 'aerium';
            li.hidden = !show;
        });
        Object.keys(markers).forEach(function (id) {
            var h = byId[id];
            var show = activeCat === 'all' || h.cats.indexOf(activeCat) > -1 || id === 'aerium';
            markers[id].getElement().style.display = show ? '' : 'none';
        });
    }

    var byId = {};
    HOTSPOTS.forEach(function (h) { byId[h.id] = h; });
    var markers = {};
    var map = null;

    renderChips();
    renderList();

    listEl.addEventListener('click', function (e) {
        var li = e.target.closest('.map-item');
        if (!li) return;
        focusHotspot(li.getAttribute('data-id'));
    });

    function popupHtml(h) {
        var cat = CATEGORIES[h.cats[0]];
        return '<div class="map-pop">' +
            '<span class="map-pop-cat" style="color:' + cat.color + '">' + h.cats.map(function (c) { return CATEGORIES[c].label; }).join(' · ') + '</span>' +
            '<strong>' + h.name + '</strong>' +
            '<p>' + h.desc + '</p>' +
            '<em>' + (h.id === 'aerium' ? h.time : h.time + ' dari Aerium · ' + fmtKm(h.km)) + '</em>' +
            (h.link ? '<a href="' + h.link + '">Baca selengkapnya →</a>' : '') +
            '</div>';
    }

    function focusHotspot(id) {
        var h = byId[id];
        listEl.querySelectorAll('.map-item').forEach(function (li) {
            li.classList.toggle('is-active', li.getAttribute('data-id') === id);
        });
        if (!map) return;
        map.flyTo({ center: [h.lng, h.lat], zoom: 16.2, pitch: 62, bearing: -25, speed: 0.8 });
        Object.keys(markers).forEach(function (k) {
            var p = markers[k].getPopup();
            if (k === id) { if (!p.isOpen()) markers[k].togglePopup(); }
            else if (p.isOpen()) markers[k].togglePopup();
        });
    }

    /* ---------- Lazy-load MapLibre when the section is near ---------- */
    function loadAsset(tag, attrs) {
        return new Promise(function (resolve, reject) {
            var el = document.createElement(tag);
            Object.keys(attrs).forEach(function (k) { el[k] = attrs[k]; });
            el.onload = resolve;
            el.onerror = reject;
            document.head.appendChild(el);
        });
    }

    function webglOK() {
        try {
            var c = document.createElement('canvas');
            return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl')));
        } catch (e) {
            return false;
        }
    }

    function initMap() {
        if (!webglOK()) {
            fallbackEl.hidden = false;
            return;
        }
        Promise.all([
            loadAsset('link', { rel: 'stylesheet', href: '/vendor/maplibre-gl/maplibre-gl.css' }),
            loadAsset('script', { src: '/vendor/maplibre-gl/maplibre-gl.js' })
        ]).then(buildMap).catch(function () {
            fallbackEl.hidden = false;
        });
    }

    function buildMap() {
        /* global maplibregl */
        map = new maplibregl.Map({
            container: mapEl,
            style: 'https://tiles.openfreemap.org/styles/liberty',
            center: [106.7395, -6.1775],
            zoom: 14.2,
            pitch: 58,
            bearing: -20,
            antialias: true,
            cooperativeGestures: true,
            attributionControl: { compact: true }
        });
        map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), 'top-right');

        map.on('load', function () {
            var style = map.getStyle();
            var has3d = style.layers.some(function (l) { return l.type === 'fill-extrusion'; });
            var src = Object.keys(style.sources).find(function (k) { return style.sources[k].type === 'vector'; });
            if (!has3d && src) {
                map.addLayer({
                    id: 'aerium-3d-buildings',
                    source: src,
                    'source-layer': 'building',
                    type: 'fill-extrusion',
                    minzoom: 14,
                    paint: {
                        'fill-extrusion-color': '#D9CBB2',
                        'fill-extrusion-height': ['coalesce', ['get', 'render_height'], ['get', 'height'], 8],
                        'fill-extrusion-base': ['coalesce', ['get', 'render_min_height'], ['get', 'min_height'], 0],
                        'fill-extrusion-opacity': 0.85
                    }
                });
            }
            // Soft radius ring around Aerium (1 km)
            var ring = [];
            for (var i = 0; i <= 64; i++) {
                var a = (i / 64) * Math.PI * 2;
                ring.push([
                    AERIUM.lng + (1 / (111.32 * Math.cos(AERIUM.lat * Math.PI / 180))) * Math.cos(a),
                    AERIUM.lat + (1 / 110.574) * Math.sin(a)
                ]);
            }
            map.addSource('aerium-ring', { type: 'geojson', data: { type: 'Feature', geometry: { type: 'Polygon', coordinates: [ring] } } });
            map.addLayer({ id: 'aerium-ring-fill', type: 'fill', source: 'aerium-ring', paint: { 'fill-color': '#B8905A', 'fill-opacity': 0.06 } });
            map.addLayer({ id: 'aerium-ring-line', type: 'line', source: 'aerium-ring', paint: { 'line-color': '#B8905A', 'line-width': 1.5, 'line-dasharray': [2, 2] } });

            // Slow cinematic intro
            map.easeTo({ bearing: -35, duration: 6000 });
        });

        HOTSPOTS.forEach(function (h) {
            var cat = CATEGORIES[h.cats[0]];
            var el = document.createElement('button');
            el.type = 'button';
            el.className = 'map-marker' + (h.id === 'aerium' ? ' is-home' : '');
            el.style.setProperty('--pin', cat.color);
            el.setAttribute('aria-label', h.name);
            el.innerHTML = '<span>' + cat.icon + '</span>';
            var popup = new maplibregl.Popup({ offset: 26, closeButton: true, maxWidth: '280px' }).setHTML(popupHtml(h));
            markers[h.id] = new maplibregl.Marker({ element: el, anchor: 'bottom' })
                .setLngLat([h.lng, h.lat])
                .setPopup(popup)
                .addTo(map);
            el.addEventListener('click', function () {
                listEl.querySelectorAll('.map-item').forEach(function (li) {
                    li.classList.toggle('is-active', li.getAttribute('data-id') === h.id);
                });
            });
        });
        applyFilter();

        // Show the fallback only if the base style never loads (not for a single failed tile)
        var styleLoaded = false;
        map.on('load', function () { styleLoaded = true; fallbackEl.hidden = true; });
        setTimeout(function () {
            if (!styleLoaded) fallbackEl.hidden = false;
        }, 12000);
    }

    var io = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) {
            io.disconnect();
            initMap();
        }
    }, { rootMargin: '400px 0px' });
    io.observe(section);
})();
