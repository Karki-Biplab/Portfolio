(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/app/blog/[slug]/ReadingProgress.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ReadingProgress)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function ReadingProgress() {
    _s();
    const [progress, setProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ReadingProgress.useEffect": ()=>{
            const updateProgress = {
                "ReadingProgress.useEffect.updateProgress": ()=>{
                    // Look for the article content using multiple selectors
                    const article = document.querySelector('.blog-content') || document.querySelector('article') || document.querySelector('.prose');
                    if (!article) {
                        console.log('Article element not found for reading progress');
                        return;
                    }
                    const articleTop = article.offsetTop;
                    const articleHeight = article.offsetHeight;
                    const windowHeight = window.innerHeight;
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    // Calculate progress based on how much of the article has been scrolled past
                    let newProgress = 0;
                    if (scrollTop >= articleTop) {
                        const scrolledPastArticleTop = scrollTop - articleTop;
                        const articleScrollableHeight = Math.max(articleHeight - windowHeight, 1);
                        newProgress = Math.min(100, scrolledPastArticleTop / articleScrollableHeight * 100);
                    }
                    // Smooth the progress a bit
                    setProgress(Math.max(0, newProgress));
                }
            }["ReadingProgress.useEffect.updateProgress"];
            // Set initial progress
            const initialUpdate = {
                "ReadingProgress.useEffect.initialUpdate": ()=>{
                    setTimeout(updateProgress, 100); // Give DOM time to render
                }
            }["ReadingProgress.useEffect.initialUpdate"];
            initialUpdate();
            // Add event listeners with passive flag for better performance
            window.addEventListener('scroll', updateProgress, {
                passive: true
            });
            window.addEventListener('resize', updateProgress, {
                passive: true
            });
            // Update progress when DOM changes (useful for dynamic content)
            const observer = new MutationObserver({
                "ReadingProgress.useEffect": ()=>{
                    setTimeout(updateProgress, 100);
                }
            }["ReadingProgress.useEffect"]);
            observer.observe(document.body, {
                childList: true,
                subtree: true,
                attributes: false
            });
            // Cleanup
            return ({
                "ReadingProgress.useEffect": ()=>{
                    window.removeEventListener('scroll', updateProgress);
                    window.removeEventListener('resize', updateProgress);
                    observer.disconnect();
                }
            })["ReadingProgress.useEffect"];
        }
    }["ReadingProgress.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed top-0 left-0 w-full h-1 bg-gray-700 z-50",
        style: {
            height: '3px'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-150 ease-out",
            style: {
                width: `${progress}%`
            }
        }, void 0, false, {
            fileName: "[project]/src/app/blog/[slug]/ReadingProgress.js",
            lineNumber: 74,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/blog/[slug]/ReadingProgress.js",
        lineNumber: 70,
        columnNumber: 5
    }, this);
}
_s(ReadingProgress, "ZVQpwjU6Dz5R8VBOzPsnxGRmMVo=");
_c = ReadingProgress;
var _c;
__turbopack_context__.k.register(_c, "ReadingProgress");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/blog/[slug]/TableOfContents.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>TableOfContents)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function TableOfContents({ headings, mobile = false }) {
    _s();
    const [activeId, setActiveId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isExpanded, setIsExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(!mobile);
    const tocRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TableOfContents.useEffect": ()=>{
            if (!headings || headings.length === 0) return;
            const addIdsToHeadings = {
                "TableOfContents.useEffect.addIdsToHeadings": ()=>{
                    headings.forEach({
                        "TableOfContents.useEffect.addIdsToHeadings": (heading)=>{
                            const elements = document.querySelectorAll(`h${heading.level}`);
                            elements.forEach({
                                "TableOfContents.useEffect.addIdsToHeadings": (element)=>{
                                    if (element.textContent?.trim() === heading.text.trim() && !element.id) {
                                        element.id = heading.id;
                                        element.style.scrollMarginTop = '120px';
                                    }
                                }
                            }["TableOfContents.useEffect.addIdsToHeadings"]);
                        }
                    }["TableOfContents.useEffect.addIdsToHeadings"]);
                }
            }["TableOfContents.useEffect.addIdsToHeadings"];
            const timer = setTimeout(addIdsToHeadings, 100);
            const observerOptions = {
                root: null,
                rootMargin: '-100px 0px -66% 0px',
                threshold: [
                    0,
                    0.25,
                    0.5,
                    0.75,
                    1
                ]
            };
            const observer = new IntersectionObserver({
                "TableOfContents.useEffect": (entries)=>{
                    let mostVisible = null;
                    let highestRatio = 0;
                    entries.forEach({
                        "TableOfContents.useEffect": (entry)=>{
                            if (entry.isIntersecting && entry.intersectionRatio > highestRatio) {
                                mostVisible = entry;
                                highestRatio = entry.intersectionRatio;
                            }
                        }
                    }["TableOfContents.useEffect"]);
                    if (mostVisible) {
                        const newActiveId = mostVisible.target.id;
                        setActiveId(newActiveId);
                        // Scroll the TOC to show the active item
                        const tocElement = tocRef.current?.querySelector(`[data-id="${newActiveId}"]`);
                        if (tocElement && tocRef.current) {
                            const containerTop = tocRef.current.scrollTop;
                            const containerHeight = tocRef.current.clientHeight;
                            const elementTop = tocElement.offsetTop;
                            const elementHeight = tocElement.clientHeight;
                            // Scroll only if out of view
                            if (elementTop < containerTop || elementTop + elementHeight > containerTop + containerHeight) {
                                tocRef.current.scrollTo({
                                    top: elementTop - containerHeight / 2 + elementHeight / 2,
                                    behavior: 'smooth'
                                });
                            }
                        }
                    } else {
                        const headingElements = headings.map({
                            "TableOfContents.useEffect.headingElements": (h)=>document.getElementById(h.id)
                        }["TableOfContents.useEffect.headingElements"]).filter(Boolean);
                        let closestElement = null;
                        let smallestDistance = Infinity;
                        headingElements.forEach({
                            "TableOfContents.useEffect": (element)=>{
                                const rect = element.getBoundingClientRect();
                                const distance = Math.abs(rect.top - 100);
                                if (distance < smallestDistance && rect.top <= 200) {
                                    smallestDistance = distance;
                                    closestElement = element;
                                }
                            }
                        }["TableOfContents.useEffect"]);
                        if (closestElement) {
                            setActiveId(closestElement.id);
                        }
                    }
                }
            }["TableOfContents.useEffect"], observerOptions);
            const observeHeadings = {
                "TableOfContents.useEffect.observeHeadings": ()=>{
                    headings.forEach({
                        "TableOfContents.useEffect.observeHeadings": (heading)=>{
                            const element = document.getElementById(heading.id);
                            if (element) {
                                observer.observe(element);
                            }
                        }
                    }["TableOfContents.useEffect.observeHeadings"]);
                }
            }["TableOfContents.useEffect.observeHeadings"];
            const observeTimer = setTimeout(observeHeadings, 200);
            const handleScroll = {
                "TableOfContents.useEffect.handleScroll": ()=>{
                    if (window.scrollY < 100) {
                        setActiveId('');
                        return;
                    }
                    const headingElements = headings.map({
                        "TableOfContents.useEffect.handleScroll.headingElements": (h)=>document.getElementById(h.id)
                    }["TableOfContents.useEffect.handleScroll.headingElements"]).filter(Boolean);
                    for(let i = headingElements.length - 1; i >= 0; i--){
                        const element = headingElements[i];
                        const rect = element.getBoundingClientRect();
                        if (rect.top <= 120) {
                            setActiveId(element.id);
                            break;
                        }
                    }
                }
            }["TableOfContents.useEffect.handleScroll"];
            window.addEventListener('scroll', handleScroll, {
                passive: true
            });
            return ({
                "TableOfContents.useEffect": ()=>{
                    clearTimeout(timer);
                    clearTimeout(observeTimer);
                    observer.disconnect();
                    window.removeEventListener('scroll', handleScroll);
                }
            })["TableOfContents.useEffect"];
        }
    }["TableOfContents.useEffect"], [
        headings
    ]);
    const scrollToHeading = (id)=>{
        const element = document.getElementById(id);
        if (element) {
            const yOffset = -100;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({
                top: y,
                behavior: 'smooth'
            });
            setActiveId(id);
            // Scroll TOC to show the active item
            const tocElement = tocRef.current?.querySelector(`[data-id="${id}"]`);
            if (tocElement && tocRef.current) {
                const containerTop = tocRef.current.scrollTop;
                const containerHeight = tocRef.current.clientHeight;
                const elementTop = tocElement.offsetTop;
                const elementHeight = tocElement.clientHeight;
                if (elementTop < containerTop || elementTop + elementHeight > containerTop + containerHeight) {
                    tocRef.current.scrollTo({
                        top: elementTop - containerHeight / 2 + elementHeight / 2,
                        behavior: 'smooth'
                    });
                }
            }
        }
        if (mobile) {
            setIsExpanded(false);
        }
    };
    if (!headings || headings.length === 0) {
        return null;
    }
    const tocContent = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-1",
        ref: tocRef,
        children: headings.map((heading, index)=>{
            const isActive = activeId === heading.id;
            const levelIndent = Math.max(0, heading.level - 1) * 12;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                "data-id": heading.id,
                onClick: ()=>scrollToHeading(heading.id),
                className: `
              block w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 
              hover:bg-gray-700/50 group relative
              ${isActive ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-400 border-l-2 border-blue-400' : 'text-gray-400 hover:text-gray-200'}
            `,
                style: {
                    paddingLeft: `${12 + levelIndent}px`
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex items-center",
                        children: [
                            heading.level > 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "mr-2 text-gray-600 text-xs",
                                children: '•'.repeat(Math.min(heading.level - 2, 3))
                            }, void 0, false, {
                                fileName: "[project]/src/app/blog/[slug]/TableOfContents.jsx",
                                lineNumber: 198,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `
                ${heading.level === 1 ? 'font-bold' : heading.level === 2 ? 'font-semibold' : 'font-medium'}
              `,
                                children: heading.text
                            }, void 0, false, {
                                fileName: "[project]/src/app/blog/[slug]/TableOfContents.jsx",
                                lineNumber: 202,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/blog/[slug]/TableOfContents.jsx",
                        lineNumber: 196,
                        columnNumber: 13
                    }, this),
                    isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-blue-400 rounded-r-full"
                    }, void 0, false, {
                        fileName: "[project]/src/app/blog/[slug]/TableOfContents.jsx",
                        lineNumber: 213,
                        columnNumber: 15
                    }, this)
                ]
            }, index, true, {
                fileName: "[project]/src/app/blog/[slug]/TableOfContents.jsx",
                lineNumber: 182,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/src/app/blog/[slug]/TableOfContents.jsx",
        lineNumber: 176,
        columnNumber: 5
    }, this);
    if (mobile) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>setIsExpanded(!isExpanded),
                    className: "w-full flex items-center justify-between p-4 text-left hover:bg-gray-700/30 transition-colors",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-2 bg-blue-500/20 rounded-lg",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "w-5 h-5 text-blue-400",
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: "2",
                                            d: "M4 6h16M4 10h16M4 14h16M4 18h16"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/blog/[slug]/TableOfContents.jsx",
                                            lineNumber: 231,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/blog/[slug]/TableOfContents.jsx",
                                        lineNumber: 230,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/blog/[slug]/TableOfContents.jsx",
                                    lineNumber: 229,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-bold text-white",
                                            children: "Table of Contents"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/blog/[slug]/TableOfContents.jsx",
                                            lineNumber: 235,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-gray-400",
                                            children: [
                                                headings.length,
                                                " section",
                                                headings.length !== 1 ? 's' : '',
                                                activeId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "ml-2 text-blue-400",
                                                    children: [
                                                        "• ",
                                                        headings.find((h)=>h.id === activeId)?.text
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/blog/[slug]/TableOfContents.jsx",
                                                    lineNumber: 239,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/blog/[slug]/TableOfContents.jsx",
                                            lineNumber: 236,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/blog/[slug]/TableOfContents.jsx",
                                    lineNumber: 234,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/blog/[slug]/TableOfContents.jsx",
                            lineNumber: 228,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            className: `w-5 h-5 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`,
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: "2",
                                d: "M19 9l-7 7-7-7"
                            }, void 0, false, {
                                fileName: "[project]/src/app/blog/[slug]/TableOfContents.jsx",
                                lineNumber: 252,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/blog/[slug]/TableOfContents.jsx",
                            lineNumber: 246,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/blog/[slug]/TableOfContents.jsx",
                    lineNumber: 224,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-96' : 'max-h-0'}`,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-4 pb-4 border-t border-gray-700/50",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pt-4",
                            children: tocContent
                        }, void 0, false, {
                            fileName: "[project]/src/app/blog/[slug]/TableOfContents.jsx",
                            lineNumber: 258,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/blog/[slug]/TableOfContents.jsx",
                        lineNumber: 257,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/blog/[slug]/TableOfContents.jsx",
                    lineNumber: 256,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/blog/[slug]/TableOfContents.jsx",
            lineNumber: 223,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-xl sticky top-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3 mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-2 bg-blue-500/20 rounded-lg",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            className: "w-5 h-5 text-blue-400",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: "2",
                                d: "M4 6h16M4 10h16M4 14h16M4 18h16"
                            }, void 0, false, {
                                fileName: "[project]/src/app/blog/[slug]/TableOfContents.jsx",
                                lineNumber: 272,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/blog/[slug]/TableOfContents.jsx",
                            lineNumber: 271,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/blog/[slug]/TableOfContents.jsx",
                        lineNumber: 270,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-bold text-white",
                                children: "Table of Contents"
                            }, void 0, false, {
                                fileName: "[project]/src/app/blog/[slug]/TableOfContents.jsx",
                                lineNumber: 276,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-400",
                                children: [
                                    headings.length,
                                    " section",
                                    headings.length !== 1 ? 's' : ''
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/blog/[slug]/TableOfContents.jsx",
                                lineNumber: 277,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/blog/[slug]/TableOfContents.jsx",
                        lineNumber: 275,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/blog/[slug]/TableOfContents.jsx",
                lineNumber: 269,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                ref: tocRef,
                className: "max-h-96 overflow-y-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600",
                children: tocContent
            }, void 0, false, {
                fileName: "[project]/src/app/blog/[slug]/TableOfContents.jsx",
                lineNumber: 283,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 pt-4 border-t border-gray-700/50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center text-xs text-gray-500",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"
                        }, void 0, false, {
                            fileName: "[project]/src/app/blog/[slug]/TableOfContents.jsx",
                            lineNumber: 292,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: activeId ? `Reading: ${headings.find((h)=>h.id === activeId)?.text || 'Current section'}` : 'Start reading'
                        }, void 0, false, {
                            fileName: "[project]/src/app/blog/[slug]/TableOfContents.jsx",
                            lineNumber: 293,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/blog/[slug]/TableOfContents.jsx",
                    lineNumber: 291,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/blog/[slug]/TableOfContents.jsx",
                lineNumber: 290,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/blog/[slug]/TableOfContents.jsx",
        lineNumber: 268,
        columnNumber: 5
    }, this);
}
_s(TableOfContents, "B5s9Px+tqYFAAxQFx2TJRTsN93c=");
_c = TableOfContents;
var _c;
__turbopack_context__.k.register(_c, "TableOfContents");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_app_blog_%5Bslug%5D_75cb481f._.js.map