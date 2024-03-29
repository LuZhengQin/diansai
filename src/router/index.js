import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home.vue'
import Baoming from "../views/baoming.vue";
import Login from '../views/login.vue'
import AdminLogin from "../views/adminLogin.vue";
import Shenhe from '../views/shenhe.vue';
import userHome from "../views/userHome.vue";
import userInfo from "../views/userInfo.vue";
import Register from "../views/register.vue";
import Course from "../views/course.vue";
import ScInfo from '../views/scInfo.vue';
import userCourse from "../views/userCourse.vue";
import userSc from "../views/userSc.vue";
import newsInfo from "../views/newsInfo.vue";
import addNews from "../views/addNews.vue";
import DeviceInfo from "../views/deviceInfo.vue";
import UserDeviceInfo from "../views/userDeviceInfo.vue";
import UserBorrowInfo from "../views/userBorrowInfo.vue";
import BorrowInfo from "../views/borrowInfo.vue";
Vue.use(VueRouter)

const routes = [
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/userHome',
        name: 'userHome',
        component: userHome,
        redirect: '/userInfo',
        children: [{path: '/userInfo', component: userInfo},
            {path: '/userCourse', component: userCourse},
            {path: '/userSc', component: userSc},
            {path: '/newsInfo', component: newsInfo},
            {path: '/userDeviceInfo', component: UserDeviceInfo},
            {path: '/userBorrowInfo', component: UserBorrowInfo},
        ]
    },
    {
        path: '/shenhe',
        name: 'Shenhe',
        component: Shenhe
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/adminLogin',
        name: 'AdminLogin',
        component: AdminLogin
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        redirect: '/baoming',
        children: [{path: '/baoming', component: Baoming},
            {path: '/course', component: Course},
            {path: '/scInfo', component: ScInfo},
            {path: '/addNews', component: addNews},
            {path: '/deviceInfo', component: DeviceInfo},
            {path: '/borrowInfo', component: BorrowInfo},
            {path: '/newsInfo', component: newsInfo},
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    // to 将访问哪一个路径
    // from 代表从哪个路径跳转而来
    // next 是一个函数,表示放行
    //   next() 放行 next('/login') 强制跳转
    if (to.path === '/login') return next()
    if (to.path === '/adminLogin') return next()
    if (to.path === '/register') return next()
    // 获取token
    const token = window.sessionStorage.getItem('token')
    if (!token) return next('/login')
    next()
})

export default router
