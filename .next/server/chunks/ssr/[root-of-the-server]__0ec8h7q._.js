module.exports=[93695,(a,b,c)=>{b.exports=a.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},26758,a=>{a.v("/_next/static/media/favicon.0x3dzn~oxb6tn.ico"+(globalThis.NEXT_CLIENT_ASSET_SUFFIX||""))},38872,a=>{"use strict";let b={src:a.i(26758).default,width:256,height:256};a.s(["default",0,b])},77011,a=>{"use strict";var b=a.i(7997),c=a.i(717),d=a.i(6156),e=a.i(54271),f=a.i(74004);async function g({product:a,source:b,intentType:c}){let e=d.supabase.from("leads").select(`
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
    `).eq("status","saved").order("intent_score",{ascending:!1}).limit(200);a&&(e=e.eq("product",a)),c&&(e=e.eq("intent_type",c));let{data:f,error:h}=await e;if(h)return console.error("Supabase error:",h.message),[];let i=f||[];return b&&(i=i.filter(a=>a.posts?.source===b)),i}async function h({searchParams:a}){let d=await a,i=d?.product||"",j=d?.source||"",k=d?.intentType||"",l=await g({product:i,source:j,intentType:k});return(0,b.jsxs)("div",{children:[(0,b.jsx)("div",{className:"flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6",children:(0,b.jsxs)("div",{children:[(0,b.jsx)("h1",{className:"text-xl font-semibold text-white",children:"Saved Leads"}),(0,b.jsxs)("p",{className:"text-sm text-gray-500 mt-0.5",children:[l.length," saved lead",1!==l.length?"s":""]})]})}),(0,b.jsx)("div",{className:"mb-5",children:(0,b.jsx)(c.Suspense,{children:(0,b.jsx)(f.default,{product:i,source:j,intentType:k,status:"saved"})})}),0===l.length?(0,b.jsxs)("div",{className:"text-center py-20 text-gray-600",children:[(0,b.jsx)("p",{className:"text-lg mb-2",children:"No saved leads yet"}),(0,b.jsx)("p",{className:"text-sm",children:"Save leads from the feed to keep track of them here."})]}):(0,b.jsx)("div",{className:"flex flex-col gap-3",children:l.map(a=>(0,b.jsx)(e.default,{lead:a},a.id))})]})}a.s(["default",0,h])},17511,a=>{a.n(a.i(77011))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__0ec8h7q._.js.map