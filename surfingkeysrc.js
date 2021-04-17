// Constants --------------------

const VIDEO_SKIP_SECONDS = 5;

// Settings ----------

// Scroll
settings.smoothScroll = false;
settings.scrollStepSize = 100;

// Hints
Hints.characters = "fjkl;asdghqwertyuiopzxcvbnm";

// Utilities ----------

const blacklist = b => {
    const comment = "## ";

    const lines = s => s.split("\n");

    const parseFormat = s =>
        lines(s)
            .map(s => s.trim())
            .filter(s => !s.startsWith(comment))
            .filter(s => s.length > 0);

    const escapeRegex = s => s.replace(/\//g, "\\$&");

    const joinRegex = ls => new RegExp(ls.join("|"), "i");

    settings.blacklistPattern = joinRegex(
        parseFormat(b).map(s => escapeRegex(s))
    );
};

function mappings(x) {
    for (const [domainStr, maps] of Object.entries(x)) {
        const domain = new RegExp(domainStr, "i");

        for (const [function$, ...params] of maps) {
            switch (function$.name) {
                case "aceVimMap":
                    function$(...params);
                    break;
                case "mapkey":
                    function$(...params, { domain });
                    break;
                default:
                    function$(...params, domain);
            }
        }
    }
}

function openSelf(url) {
    window.open(url, "_self");
}

// Blacklist --------------------

blacklist(`

## General

.*mail.google.com.*
.*inbox.google.com.*
.*docs.google.com.*
.*lastpass.com.*
.*facebook.com.*
.*mega.nz.*
.*google.com.au/maps.*
.*calendar.google.com.*
.*ticktick.com/webapp.*
.*localhost.*

## Work

.*app.resourceguruapp.com.*
.*atlassian.net.*
.*pi.pardot.com.*
.*thinkfwd.com.au/system.*
.*lenovo.prometstaging.com.*
.*lenovo-preprod.prometstaging.com.*
.*qboard.lgcom.lge.com.*
.*app-ab28.marketo.com.*
.*teams.microsoft.com.*

## Personal Projects

.*app.cloudcraft.co.*
.*ims.benglitsos.com.au.*

`);

// Mappings ----------

mappings({
    ".*": [
        // Emoji Completion
        [iunmap, ":"],
        // Select Tab
        [map, "e", "T"],
        // Tab Switching
        [map, "J", "E"],
        [map, "K", "R"],
        [map, "[", "E"],
        [map, "]", "R"],
        // Tab History Switching
        [map, "go", "B"],
        [map, "gw", "F"],
        // Switch To First/Last Tab
        [map, "gH", "g0"],
        [map, "gL", "g$"],
        // Re-open closed tab
        [map, "p", "X"],
        // History Navigation
        [map, "b", "S"],
        [map, "W", "D"],
        // Move Tabs
        [map, "H", "<<"],
        [map, "L", ">>"],
        // Clicking Links
        [map, "m", "cf"],
        [map, "t", "gf"],
        // Bookmark page
        [map, "a", "ab"],
        // Page Up/Down
        [map, "<Space>", "d"],
        [map, "<S-Space>", "u"],
        // Edit url in ace editor and open in a new tab
        [map, "zu", "su"],
        // Edit url in ace editor and open in the current tab
        [map, "zU", "sU"],
        // Bookmark page
        [unmap, "af"],
        // Go to certain pages
        [
            mapkey,
            "sh",
            "Go to Home (New Tab Page)",
            () => openSelf("http://www.google.com")
        ],
        [
            mapkey,
            "gt",
            "Go to TickTick",
            () => openSelf("https://ticktick.com/webapp/#q/all/today")
        ],
        // Reload
        [
            mapkey,
            "gr",
            "Hard reload (reload without cache)",
            () => {
                location.reload(true);
            }
        ],
        // Copy from the URL
        [
            mapkey,
            "ys",
            "Copy the url slug",
            () => {
                Clipboard.write(
                    location.pathname.split("/").slice(-1).toString()
                );
            }
        ],
        [
            mapkey,
            "yP",
            "Copy the url path",
            () => {
                Clipboard.write(location.pathname.substring(1));
            }
        ],
        // Actual vs display line navigation
        [aceVimMap, "j", "gj", "normal"],
        [aceVimMap, "j", "gj", "normal"],
        [aceVimMap, "k", "gk", "normal"],
        [aceVimMap, "j", "gj", "visual"],
        [aceVimMap, "k", "gk", "visual"],
        [aceVimMap, "J", "j", "normal"],
        [aceVimMap, "K", "k", "normal"],
        [aceVimMap, "J", "j", "visual"],
        [aceVimMap, "K", "k", "visual"],
        // 'vv' Visual Line Mode
        [aceVimMap, "v", "V", "visual"],
        // Jump To Start/End Of Line
        [aceVimMap, "H", "0", "normal"],
        [aceVimMap, "H", "0", "visual"],
        [aceVimMap, "L", "$", "normal"],
        [aceVimMap, "L", "$", "visual"],
        // Go to last used tab
        [aceVimMap, "<Ctrl-6>", "go"]
    ],
    ".*youtube.com.*": [
        [
            mapkey,
            "<Space>",
            "Play/Pause Video",
            () => {
                const video = document.getElementsByTagName("video")[0];
                video.paused ? video.play() : video.pause();
            }
        ],
        [
            mapkey,
            "h",
            `Rewind ${VIDEO_SKIP_SECONDS} seconds`,
            () => {
                document.getElementsByTagName(
                    "video"
                )[0].currentTime -= VIDEO_SKIP_SECONDS;
            }
        ],
        [
            mapkey,
            "l",
            `Skip ${VIDEO_SKIP_SECONDS} seconds`,
            () => {
                document.getElementsByTagName(
                    "video"
                )[0].currentTime += VIDEO_SKIP_SECONDS;
            }
        ],
        [
            mapkey,
            "f",
            "Toggle Fullscreen",
            () => {
                document
                    .querySelector(".ytp-button.ytp-fullscreen-button")
                    .click();
            }
        ],
        [
            mapkey,
            "m",
            "Toggle Mute",
            () => {
                document.querySelector(".ytp-button.ytp-mute-button").click();
            }
        ]
    ]
});

// Styling ----------

// Hints
settings.hintAlign = "left";

// Link Hints
Hints.style(`
    border: solid 3px #552a48;
    color: #efe1eb;
    background: initial;
    background-color: #552a48;
    font-size: 11pt;
    font-family: Times New Roman, Charcoal, sans-serif !important;
`);

// Text Hints
Hints.style(
    `
    border: solid 3px #0642ce;
    color: #efe1eb;
    background: initial;
    background-color: #0642ce;
    font-size: 11pt;
    font-family: Times New Roman, Charcoal, sans-serif !important;
    `,
    "text"
);

// Theme
settings.theme = `
.sk_theme {
    font-family: Times New Roman, Charcoal, sans-serif !important;
    font-size: 10pt;
    background: #24272e;
    color: #abb2bf;
}

.sk_theme tbody {
    color: #fff;
}

.sk_theme input {
    color: #d0d0d0;
}

.sk_theme .url {
    color: #61afef;
}

.sk_theme .annotation {
    color: #56b6c2;
}

.sk_theme .omnibar_highlight {
    color: #528bff;
}

.sk_theme .omnibar_timestamp {
    color: #e5c07b;
}

.sk_theme .omnibar_visitcount {
    color: #98c379;
}

.sk_theme #sk_omnibarSearchResult>ul>li:nth-child(odd) {
    background: #303030;
}

.sk_theme #sk_omnibarSearchResult>ul>li.focused {
    background: #3e4452;
}

#sk_status, #sk_find {
    font-size: 20pt;
}
`;
