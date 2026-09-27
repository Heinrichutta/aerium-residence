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
        highway: { label: 'Akses Tol', color: '#555F5B', icon: '⇄' },
        park: { label: 'Taman & Jogging', color: '#5E8C4A', icon: '♣' }
    };

    // Coordinates from Google Maps place data & OpenStreetMap (verified 27 Sep 2026).
    // time = route distance & free-flow drive time (OSRM); null = straight-line km is shown.
    var HOTSPOTS = [
        {
            "id": "aerium",
            "name": "Aerium Residence",
            "cats": [
                "home"
            ],
            "lat": -6.1671576,
            "lng": 106.7427794,
            "desc": "Jl. Pulau Melintang A No. 20, Taman Permata Buana. Apartemen siap huni, 75% area hijau, dog-friendly.",
            "time": "Rumah Anda",
            "link": null,
            "ig": null,
            "web": null
        },
        {
            "id": "naked-papa",
            "name": "Naked Papa",
            "cats": [
                "cafe"
            ],
            "lat": -6.1670399,
            "lng": 106.7430318,
            "desc": "Bakmi & kopi, Jl. Pulau Melintang 7 — ± 30 m dari lobi Aerium. Non-halal.",
            "time": null,
            "link": "/artikel/cafe-resto-permata-buana/",
            "ig": "nakedpapa.id",
            "web": null
        },
        {
            "id": "kulo",
            "name": "Kedai Kopi Kulo, Permata Buana",
            "cats": [
                "cafe"
            ],
            "lat": -6.1703602,
            "lng": 106.7461225,
            "desc": "Kopi di Ruko Taman Permata Buana, Jl. Pulau Bira.",
            "time": null,
            "link": "/artikel/cafe-resto-permata-buana/",
            "ig": "kedaikopikulo",
            "web": null
        },
        {
            "id": "joglo",
            "name": "Garden by the Joglo",
            "cats": [
                "cafe"
            ],
            "lat": -6.1705341,
            "lng": 106.7394835,
            "desc": "Restoran taman & event space, Jl. Pulau Pramuka.",
            "time": null,
            "link": "/artikel/cafe-resto-permata-buana/",
            "ig": "gardenbythejoglo",
            "web": "http://linktr.ee/gardenbythejoglo"
        },
        {
            "id": "eowa",
            "name": "EOWA Coffee & Bakery",
            "cats": [
                "cafe"
            ],
            "lat": -6.1707871,
            "lng": 106.746101,
            "desc": "Coffee & bakery, Jl. Pulau Bira Blok D1.",
            "time": null,
            "link": "/artikel/cafe-resto-permata-buana/",
            "ig": "eowa.coffee",
            "web": null
        },
        {
            "id": "haohao",
            "name": "Haohao Dimsum & Chinese Food",
            "cats": [
                "cafe"
            ],
            "lat": -6.1711899,
            "lng": 106.7461672,
            "desc": "Dimsum & Chinese food, Jl. Pulau Bira Blok D1 No. 41.",
            "time": null,
            "link": "/artikel/cafe-resto-permata-buana/",
            "ig": "haohaodimsum",
            "web": null
        },
        {
            "id": "korpa",
            "name": "Korpa Cafe",
            "cats": [
                "cafe"
            ],
            "lat": -6.171192,
            "lng": 106.7462383,
            "desc": "Kafe di Ruko Jl. Pulau Bira III Blok D1 No. 43.",
            "time": null,
            "link": "/artikel/cafe-resto-permata-buana/",
            "ig": null,
            "web": "https://linktr.ee/korpacafe"
        },
        {
            "id": "olivetree",
            "name": "OLIVE TREE House of Croissants",
            "cats": [
                "cafe"
            ],
            "lat": -6.1741037,
            "lng": 106.7440579,
            "desc": "Croissant, Jl. Pulau Sebaru Blok M4.",
            "time": null,
            "link": "/artikel/cafe-resto-permata-buana/",
            "ig": "olivetreecroissants",
            "web": null
        },
        {
            "id": "hyugo",
            "name": "Hyūgo Matcha",
            "cats": [
                "cafe"
            ],
            "lat": -6.1742295,
            "lng": 106.741123,
            "desc": "Matcha bar, Jl. Pulau Laki.",
            "time": null,
            "link": "/artikel/cafe-resto-permata-buana/",
            "ig": null,
            "web": null
        },
        {
            "id": "bakmi-pulau-laki",
            "name": "Bakmi Pulau Laki",
            "cats": [
                "cafe"
            ],
            "lat": -6.1740453,
            "lng": 106.7398841,
            "desc": "Bakmi legendaris Permata Buana, Jl. Pulau Laki.",
            "time": null,
            "link": "/artikel/cafe-resto-permata-buana/",
            "ig": "bakmipulaulaki",
            "web": null
        },
        {
            "id": "starbucks-pb",
            "name": "Starbucks Permata Buana",
            "cats": [
                "cafe"
            ],
            "lat": -6.1791677,
            "lng": 106.7424502,
            "desc": "Tujuan jalan sore warga Aerium, di dalam kawasan Taman Permata Buana.",
            "time": null,
            "link": "/artikel/cafe-resto-permata-buana/",
            "ig": "starbucksindonesia",
            "web": null
        },
        {
            "id": "tentang-kopi",
            "name": "Tentang Kopi Puri",
            "cats": [
                "cafe"
            ],
            "lat": -6.1761623,
            "lng": 106.7470489,
            "desc": "Coffee shop, Jl. Puri Kembangan No. 81C.",
            "time": null,
            "link": "/artikel/cafe-resto-permata-buana/",
            "ig": "tentangkopi.puri",
            "web": null
        },
        {
            "id": "tawke",
            "name": "Tawke Kopitiam",
            "cats": [
                "cafe"
            ],
            "lat": -6.1776059,
            "lng": 106.7397867,
            "desc": "Kopitiam, Jl. Buana Biru Besar Blok F2.",
            "time": null,
            "link": "/artikel/cafe-resto-permata-buana/",
            "ig": "tawke.id",
            "web": null
        },
        {
            "id": "miss-marly",
            "name": "Miss Marly",
            "cats": [
                "cafe"
            ],
            "lat": -6.1793151,
            "lng": 106.7424634,
            "desc": "British brunch & Asian, Jl. Kembangan Raya Blok E2 No. 21B. Buka 06.30.",
            "time": null,
            "link": "/artikel/cafe-resto-permata-buana/",
            "ig": "missmarly.id",
            "web": null
        },
        {
            "id": "pim",
            "name": "Puri Indah Mall",
            "cats": [
                "mall",
                "cafe"
            ],
            "lat": -6.1882497,
            "lng": 106.7338175,
            "desc": "96 tenant F&B resmi, termasuk Tiong Bahru Bakery, ZUS Coffee, Din Tai Fung Chef's Table, Sushiro.",
            "time": "± 4,5 km · 8 mnt",
            "link": "/artikel/restoran-puri-indah-mall-lippo-mall-puri/",
            "ig": "puriindahmall",
            "web": null
        },
        {
            "id": "pim2",
            "name": "Puri Indah Mall 2",
            "cats": [
                "mall",
                "cafe"
            ],
            "lat": -6.1876987,
            "lng": 106.7325636,
            "desc": "26 tenant F&B: UNION, Hi George!, Smara Kitchen, Bakerzin, Oma Elly Trattoria, Roemah Koffie.",
            "time": "± 4,4 km · 8 mnt",
            "link": "/artikel/restoran-puri-indah-mall-lippo-mall-puri/",
            "ig": "puriindahmall",
            "web": null
        },
        {
            "id": "lmp",
            "name": "Lippo Mall Puri · St. Moritz",
            "cats": [
                "mall",
                "cafe"
            ],
            "lat": -6.1888981,
            "lng": 106.7390006,
            "desc": "143 tenant F&B: Ramen Ippudo, Gyu-Kaku, Fogo Brazilian BBQ, Starbucks, Toby's Estate, Food Avenue.",
            "time": "± 3,2 km · 7 mnt",
            "link": "/artikel/restoran-puri-indah-mall-lippo-mall-puri/",
            "ig": "lippomalpuri",
            "web": null
        },
        {
            "id": "springfield-pb3",
            "name": "Springfield School PB3",
            "cats": [
                "school"
            ],
            "lat": -6.166528,
            "lng": 106.7466761,
            "desc": "Internasional (Cambridge), Jl. Pulau Tidung, Taman Permata Buana.",
            "time": "± 0,4 km · 1 mnt",
            "link": "/artikel/sekolah-dekat-aerium/",
            "ig": null,
            "web": null
        },
        {
            "id": "trinitas",
            "name": "Sekolah Trinitas (TK–SMA)",
            "cats": [
                "school"
            ],
            "lat": -6.1662854,
            "lng": 106.7411645,
            "desc": "Sekolah Kristen TK, SD, SMP, SMA — ± 200 m dari Aerium.",
            "time": null,
            "link": "/artikel/sekolah-dekat-aerium/",
            "ig": null,
            "web": null
        },
        {
            "id": "springfield-pb1",
            "name": "Springfield School PB1",
            "cats": [
                "school"
            ],
            "lat": -6.174532,
            "lng": 106.7440109,
            "desc": "Jl. Pulau Sebaru Blok L4, Taman Permata Buana.",
            "time": "± 1,0 km · 3 mnt",
            "link": "/artikel/sekolah-dekat-aerium/",
            "ig": null,
            "web": null
        },
        {
            "id": "springfield-pb2",
            "name": "Springfield School PB2",
            "cats": [
                "school"
            ],
            "lat": -6.1757307,
            "lng": 106.7386767,
            "desc": "Jl. Pulau Selayar I Blok B1, Taman Permata Buana.",
            "time": "± 1,4 km · 4 mnt",
            "link": "/artikel/sekolah-dekat-aerium/",
            "ig": null,
            "web": null
        },
        {
            "id": "sevilla",
            "name": "Global Sevilla Puri Indah",
            "cats": [
                "school"
            ],
            "lat": -6.1765751,
            "lng": 106.7465005,
            "desc": "Internasional (Cambridge IGCSE/A-Level, IPC), Jl. Kembangan Raya Blok JJ.",
            "time": "± 1,7 km · 4 mnt",
            "link": "/artikel/sekolah-dekat-aerium/",
            "ig": null,
            "web": null
        },
        {
            "id": "kinderworld",
            "name": "Kinderworld Montessori",
            "cats": [
                "school"
            ],
            "lat": -6.1825471,
            "lng": 106.737357,
            "desc": "Preschool & kindergarten Montessori, Jl. Pulau Kelor Blok A2.",
            "time": "± 2,3 km · 5 mnt",
            "link": "/artikel/sekolah-dekat-aerium/",
            "ig": null,
            "web": null
        },
        {
            "id": "ipeka",
            "name": "IPEKA Puri Christian School",
            "cats": [
                "school"
            ],
            "lat": -6.1866343,
            "lng": 106.7503683,
            "desc": "Jl. Puri Indah Raya Blok I No. 1.",
            "time": "± 3,5 km · 7 mnt",
            "link": "/artikel/sekolah-dekat-aerium/",
            "ig": null,
            "web": null
        },
        {
            "id": "notredame",
            "name": "Sekolah Notre Dame Puri Indah",
            "cats": [
                "school"
            ],
            "lat": -6.1872454,
            "lng": 106.7426419,
            "desc": "Yayasan Santa Maria, Puri Indah.",
            "time": "± 4,3 km · 8 mnt",
            "link": "/artikel/sekolah-dekat-aerium/",
            "ig": null,
            "web": null
        },
        {
            "id": "ciputra",
            "name": "Universitas Ciputra Jakarta",
            "cats": [
                "school"
            ],
            "lat": -6.1742547,
            "lng": 106.7300829,
            "desc": "Kampus universitas di Puri, Jakarta Barat.",
            "time": "± 3,6 km · 8 mnt",
            "link": "/artikel/sekolah-dekat-aerium/",
            "ig": null,
            "web": null
        },
        {
            "id": "rspi",
            "name": "RS Pondok Indah – Puri Indah",
            "cats": [
                "hospital"
            ],
            "lat": -6.186178,
            "lng": 106.7353465,
            "desc": "Rumah sakit rujukan keluarga, Jl. Puri Indah Raya Blok S-2.",
            "time": "± 3,6 km · 7 mnt",
            "link": null,
            "ig": null,
            "web": null
        },
        {
            "id": "grha",
            "name": "RS Grha Kedoya",
            "cats": [
                "hospital"
            ],
            "lat": -6.168127,
            "lng": 106.7648571,
            "desc": "Rumah sakit di Kedoya, Jakarta Barat.",
            "time": "± 5,7 km · 10 mnt",
            "link": null,
            "ig": null,
            "web": null
        },
        {
            "id": "siloam",
            "name": "Siloam Hospitals Kebon Jeruk",
            "cats": [
                "hospital"
            ],
            "lat": -6.1908254,
            "lng": 106.7636252,
            "desc": "Jl. Perjuangan Kav. 8, Kebon Jeruk.",
            "time": "± 5,4 km · 9 mnt",
            "link": null,
            "ig": null,
            "web": null
        },
        {
            "id": "stmoritz-office",
            "name": "Lippo St. Moritz Office Tower",
            "cats": [
                "office"
            ],
            "lat": -6.1884269,
            "lng": 106.7385661,
            "desc": "Office tower di superblok St. Moritz, Puri Indah CBD.",
            "time": "± 3,0 km · 6 mnt",
            "link": null,
            "ig": null,
            "web": null
        },
        {
            "id": "pift",
            "name": "Puri Indah Financial Tower",
            "cats": [
                "office"
            ],
            "lat": -6.1882733,
            "lng": 106.7364929,
            "desc": "Gedung perkantoran di Puri Indah CBD.",
            "time": "± 3,6 km · 8 mnt",
            "link": null,
            "ig": null,
            "web": null
        },
        {
            "id": "propan",
            "name": "Propan Tower",
            "cats": [
                "office"
            ],
            "lat": -6.1731057,
            "lng": 106.7295946,
            "desc": "Gedung perkantoran di Jl. Kembangan Raya.",
            "time": "± 3,5 km · 8 mnt",
            "link": null,
            "ig": null,
            "web": null
        },
        {
            "id": "tokopedia",
            "name": "Tokopedia Care Tower",
            "cats": [
                "office"
            ],
            "lat": -6.1729829,
            "lng": 106.7302411,
            "desc": "Gedung perkantoran di Puri.",
            "time": "± 3,6 km · 8 mnt",
            "link": null,
            "ig": null,
            "web": null
        },
        {
            "id": "walikota",
            "name": "Kantor Walikota Jakarta Barat",
            "cats": [
                "office"
            ],
            "lat": -6.1859734,
            "lng": 106.7376571,
            "desc": "Pusat pemerintahan Jakarta Barat, Puri Kembangan.",
            "time": null,
            "link": null,
            "ig": null,
            "web": null
        },
        {
            "id": "tol-kembangan",
            "name": "Gerbang Tol JORR Kembangan Utara",
            "cats": [
                "highway"
            ],
            "lat": -6.1814366,
            "lng": 106.7289913,
            "desc": "Tol Lingkar Luar (JORR W1) — ke bandara, Tangerang, pusat kota.",
            "time": "± 4,4 km · 7 mnt",
            "link": null,
            "ig": null,
            "web": null
        },
        {
            "id": "tol-rawabuaya",
            "name": "Gerbang Tol Rawa Buaya",
            "cats": [
                "highway"
            ],
            "lat": -6.1574339,
            "lng": 106.727581,
            "desc": "Akses JORR arah Bandara Soekarno-Hatta.",
            "time": "± 6,8 km · 9 mnt",
            "link": null,
            "ig": null,
            "web": null
        },
        {
            "id": "tol-meruya",
            "name": "Gerbang Tol Meruya",
            "cats": [
                "highway"
            ],
            "lat": -6.1916704,
            "lng": 106.7442391,
            "desc": "Tol Jakarta–Tangerang–Merak.",
            "time": "± 8,4 km · 11 mnt",
            "link": null,
            "ig": null,
            "web": null
        },
        {
            "id": "basket",
            "name": "Lapangan Basket Permata Buana",
            "cats": [
                "park"
            ],
            "lat": -6.1667523,
            "lng": 106.7427627,
            "desc": "Lapangan basket tepat di depan Aerium.",
            "time": null,
            "link": null,
            "ig": null,
            "web": null
        },
        {
            "id": "bojong",
            "name": "Taman Kota Bojong",
            "cats": [
                "park"
            ],
            "lat": -6.1652705,
            "lng": 106.7416274,
            "desc": "Taman kota ± 250 m dari Aerium — untuk jalan pagi & anjing Anda.",
            "time": null,
            "link": null,
            "ig": null,
            "web": null
        },
        {
            "id": "bpn",
            "name": "Taman BPN",
            "cats": [
                "park"
            ],
            "lat": -6.1703122,
            "lng": 106.7471216,
            "desc": "Taman lingkungan di Kembangan Utara.",
            "time": null,
            "link": null,
            "ig": null,
            "web": null
        },
        {
            "id": "hutan-kota",
            "name": "Hutan Kota Kembangan",
            "cats": [
                "park"
            ],
            "lat": -6.1702753,
            "lng": 106.7510598,
            "desc": "Hutan kota ± 1 km dari Aerium — jogging di bawah pepohonan.",
            "time": null,
            "link": null,
            "ig": null,
            "web": null
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

    function metaLine(h) {
        if (h.id === 'aerium') return h.time;
        if (h.time) return h.time + ' (rute, lancar)';
        return fmtKm(h.km) + ' garis lurus dari Aerium';
    }

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
                '<small>' + metaLine(h) + '</small></span>' +
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
            markers[id].getElement().style.visibility = show ? '' : 'hidden';
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
            '<em>' + metaLine(h) + '</em>' +
            '<span class="map-pop-links">' +
            (h.ig ? '<a href="https://www.instagram.com/' + h.ig + '/" target="_blank" rel="noopener">Instagram @' + h.ig + '</a>' : '') +
            (h.web ? '<a href="' + h.web + '" target="_blank" rel="noopener">Website</a>' : '') +
            (h.link ? '<a href="' + h.link + '">Baca artikel →</a>' : '') +
            '</span>' +
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
            // Outer element is positioned by MapLibre (inline transform);
            // all visual styling/animation lives on the inner pin.
            var el = document.createElement('button');
            el.type = 'button';
            el.className = 'map-marker-wrap' + (h.id === 'aerium' ? ' is-home' : '');
            el.setAttribute('aria-label', h.name);
            el.innerHTML = '<span class="map-marker" style="--pin:' + cat.color + '"><span>' + cat.icon + '</span></span>';
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
