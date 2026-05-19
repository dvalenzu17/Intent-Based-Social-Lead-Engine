module.exports=[93695,(a,b,c)=>{b.exports=a.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},26758,a=>{a.v("/_next/static/media/favicon.0x3dzn~oxb6tn.ico"+(globalThis.NEXT_CLIENT_ASSET_SUFFIX||""))},38872,a=>{"use strict";let b={src:a.i(26758).default,width:256,height:256};a.s(["default",0,b])},66599,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/components/IngestButton.jsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/components/IngestButton.jsx <module evaluation>","default")},88354,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/components/IngestButton.jsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/components/IngestButton.jsx","default")},50775,a=>{"use strict";a.i(66599);var b=a.i(88354);a.n(b)},69375,a=>{"use strict";var b=a.i(7997),c=a.i(717),d=a.i(6156),e=a.i(54271),f=a.i(74004),g=a.i(50775);async function h({product:a,source:b,intentType:c,status:e}){let f=d.supabase.from("leads").select(`
      id,
      product,
      intent_score,
      intent_type,
      status,
      scored_at,
      posts (
        id,
        source,
        external_id,
        title,
        body,
        url,
        author,
        subreddit,
        created_at
      )
    `).order("intent_score",{ascending:!1}).limit(200);a&&(f=f.eq("product",a)),c&&(f=f.eq("intent_type",c)),e&&(f=f.eq("status",e));let{data:g,error:i}=await f;if(i)return console.error("Supabase error:",i.message),[];let j=g||[];return b&&(j=j.filter(a=>a.posts?.source===b)),j}async function i({searchParams:a}){let d=await a,j=d?.product||"",k=d?.source||"",l=d?.intentType||"",m=d?.status||"",n=await h({product:j,source:k,intentType:l,status:m});return(0,b.jsxs)("div",{children:[(0,b.jsxs)("div",{className:"flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6",children:[(0,b.jsxs)("div",{children:[(0,b.jsx)("h1",{className:"text-xl font-semibold text-white",children:"Lead Feed"}),(0,b.jsxs)("p",{className:"text-sm text-gray-500 mt-0.5",children:[n.length," lead",1!==n.length?"s":""," — sorted by intent score"]})]}),(0,b.jsx)(g.default,{})]}),(0,b.jsx)("div",{className:"mb-5",children:(0,b.jsx)(c.Suspense,{children:(0,b.jsx)(f.default,{product:j,source:k,intentType:l,status:m})})}),0===n.length?(0,b.jsxs)("div",{className:"text-center py-20 text-gray-600",children:[(0,b.jsx)("p",{className:"text-lg mb-2",children:"No leads found"}),(0,b.jsx)("p",{className:"text-sm",children:"Run ingestion to fetch new posts, or adjust your filters."})]}):(0,b.jsx)("div",{className:"flex flex-col gap-3",children:n.map(a=>(0,b.jsx)(e.default,{lead:a},a.id))})]})}a.s(["default",0,i])},28357,a=>{a.n(a.i(69375))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__0bdobgv._.js.map