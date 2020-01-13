// Utilities ----------

const comment = "## ";

const separator = " ";

const lines = s => s.split("\n");

const parseFormat = s =>
    lines(s)
        .map(s => s.trim())
        .filter(s => !s.startsWith(comment))
        .filter(s => s.length > 0);

const escapeRegex = s => s.replace(/\//g, "\\$&");

const joinRegex = ls => new RegExp(ls.join("|"), "i");

const blacklist = b => {
    settings.blacklistPattern = joinRegex(
        parseFormat(b).map(s => escapeRegex(s))
    );
};

const keys = ks => {
    const parse = x => {
        if (Array.isArray(x)) {
            return [x];
        } else if (typeof x === "string") {
            return parseFormat(x).map(s => s.split(separator));
        } else {
            return null;
        }
    };

    const loop = ({ fun, list }) => {
        if (list.length > 0) {
            const head = list[0];
            const tail = list.slice(1);
            if (head instanceof Function) {
                return loop({ fun: head, list: tail });
            } else if (fun instanceof Function) {
                parse(head).map(k => fun(...k));
                return loop({ fun, list: tail });
            } else if (tail.length !== 0) {
                return loop({ fun: null, list: tail });
            } else {
                return null;
            }
        } else {
            return null;
        }
    };

    loop({ fun: null, list: ks });
};

// Settings ----------

// Scroll
settings.smoothScroll = false;
settings.scrollStepSize = 100;

// Hints
Hints.characters = "fjkl;asdghqwertyuiopzxcvbnm";

// Blacklist

blacklist(`
## Domain
.*mail.google.com.*
.*inbox.google.com.*
.*docs.google.com.*
.*youtube.com.*
.*lastpass.com.*
.*facebook.com.*
.*mega.nz.*

## Other
.*google.com.au/maps.*
`);

// Mappings ----------

keys([
    iunmap,
    `
## Emoji completion
:
    `,
    map,
    `
## Select Tab
e T

## Tab Switching
J E
K R
[ E
] R

## Tab History Switching
go B
gw F

## Switch To First/Last Tab
gH g0
gL g$

## Re-open closed tab
p X

## History Navigation
b S
W D

## Move Tabs
H <<
L >>

## Clicking Links
m cf
t gf

## Bookmark page
a ab

## Page Up/Down
<Space> d
<S-Space> u

## Edit url in ace editor and open in a new tab
zu su

## Edit url in ace editor and open in the current tab
zU sU
    `,
    unmap,
    `
## Bookmark page
af
    `,
    mapkey,
    [
        "sh",
        "Go to Home (New Tab Page)",
        () => {
            window.open("http://www.google.com", "_self");
        }
    ],
    [
        "gr",
        "Hard reload (reload without cache)",
        () => {
            location.reload(true);
        }
    ],
    [
        "ys",
        "Copy the url slug",
        () => {
            Clipboard.write(
                location.pathname
                    .split("/")
                    .slice(-1)
                    .toString()
            );
        }
    ],
    [
        "yP",
        "Copy the url path",
        () => {
            Clipboard.write(location.pathname.substring(1));
        }
    ],
    aceVimMap,
    `
## Actual vs display line navigation
j gj normal
k gk normal
j gj visual
k gk visual
J j normal
K k normal
J j visual
K k visual

## 'vv' Visual Line Mode
v V visual

## Jump To Start/End Of Line
H 0 normal
H 0 visual

L $ normal
L $ visual

## 'Entire' Textobj
ae ggoG$ visual
    `
]);

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
