import Vue from 'vue'
import Router from 'vue-router'
import Register from "../pages/login/register"
import Home from "../pages/home/home"
import STAFF from '../pages/STAFF/STAFF'
import Configuration from '../pages/STAFF/configuration'
import Menu from '../pages/STAFF/menu'
import Apply from '../pages/STAFF/apply'
import Rename from '../pages/more/rename'
import Maintain from '../pages/more/maintain'
import Transfer from '../pages/more/transfer'
import Else from '../pages/more/else'

Vue.use(Router)

let router = new Router({
    routes: [
        {
            path: '/',
            name: 'register',
            component: Register,
            beforeEnter(to, from, next) {
                //console.log('enter login page')
                next()
            }
        },
        {
            name: 'home',
            path: '/home',
            component: Home,
            children: [
                {
                    name: 'STAFF',
                    path: 'STAFF',
                    component: STAFF
                },
                {
                    name: 'configuration',
                    path: 'configuration',
                    component: Configuration
                },
                {
                    name: 'menu',
                    path: 'menu',
                    component: Menu
                },
                {
                    name: 'apply',
                    path: 'apply',
                    component: Apply
                },
                {
                    name: 'rename',
                    path: 'rename',
                    component: Rename
                },
                {
                    name: 'transfer',
                    path: 'transfer',
                    component: Transfer
                },
                {
                    name: 'maintain',
                    path: 'maintain',
                    component: Maintain
                },
                {
                    name: 'else',
                    path: 'else',
                    component: Else
                }
                
            ]
        }
    ]
})
//导航守卫   
console.log(router)
router.beforeEach((to, from, next) => {
    //console.log(to)
    if (to.name === 'register') {
        next()
    } else {
        let islogin = sessionStorage.getItem('islogin')
        if (islogin) {
            next()
        } else {
            next('/register')
        }
    }
})
export default router