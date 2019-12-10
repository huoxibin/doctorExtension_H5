export default [
    // 首页
    {
        path: "/index",
        name: "首页",
        meta: {
            requireAuth: false,
            defaultActive: "/index",
            bread: [
                {
                    name: "查看更多视频",
                    path: "/index"
                }
            ]
        },
        component: () => import("@/views/index/index")
    },
    // 查看更多视频
    {
        path: "/moreVideo",
        name: "查看更多视频",
        meta: {
            requireAuth: false,
            defaultActive: "/moreVideo",
            bread: [
                {
                    name: "查看更多视频",
                    path: "/moreVideo"
                }
            ]
            },
        component: () => import("@/views/moreVideo/index")
    },
    // 查看视频详情
    {
        path: "/videoDetail",
        name: "查看视频详情",
        meta: {
            requireAuth: false,
            defaultActive: "/videoDetail",
            bread: [
                {
                    name: "查看视频详情",
                    path: "/videoDetail"
                }
            ]
            },
        component: () => import("@/views/videoDetail/index")
    }
  ];