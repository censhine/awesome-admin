export const topRouterMap = [
    {
        'parentName':'infoShow',
        'data':[
            {
                path: 'infoShow1',
                name: 'infoShow1',
                meta: {
                    title: '子菜单1',
                    icon: 'fa-asterisk',
                    routerType: 'topmenu'
                },
                component: () => import('@/views/system/index')
            },
            {
                path: 'infoShow2',
                name: 'infoShow2',
                meta: {
                    title: '子菜单2',
                    icon: 'fa-asterisk',
                    routerType: 'topmenu'
                },
                component: () => import('@/views/system/log')
            },
        ]
    },
]


