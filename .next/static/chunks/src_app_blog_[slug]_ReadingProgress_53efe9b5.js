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
                    const article = document.querySelector('.blog-content');
                    if (!article) return;
                    const articleTop = article.offsetTop;
                    const articleHeight = article.offsetHeight;
                    const windowHeight = window.innerHeight;
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    const articleBottom = articleTop + articleHeight;
                    const windowBottom = scrollTop + windowHeight;
                    let newProgress = 0;
                    if (scrollTop > articleTop) {
                        newProgress = Math.min(100, (windowBottom - articleTop) / articleHeight * 100);
                    }
                    setProgress(newProgress);
                }
            }["ReadingProgress.useEffect.updateProgress"];
            // Set initial progress
            updateProgress();
            // Add event listeners
            window.addEventListener('scroll', updateProgress);
            window.addEventListener('resize', updateProgress);
            // Cleanup
            return ({
                "ReadingProgress.useEffect": ()=>{
                    window.removeEventListener('scroll', updateProgress);
                    window.removeEventListener('resize', updateProgress);
                }
            })["ReadingProgress.useEffect"];
        }
    }["ReadingProgress.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "reading-progress",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "reading-progress-bar",
            style: {
                width: `${progress}%`
            }
        }, void 0, false, {
            fileName: "[project]/src/app/blog/[slug]/ReadingProgress.js",
            lineNumber: 46,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/blog/[slug]/ReadingProgress.js",
        lineNumber: 45,
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
}]);

//# sourceMappingURL=src_app_blog_%5Bslug%5D_ReadingProgress_53efe9b5.js.map