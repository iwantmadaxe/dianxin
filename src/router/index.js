import Vue from 'vue';
import Router from 'vue-router';
import Register from '../views/register/register.vue'; // 注册页面
import Login from '../views/login/login.vue'; // 登陆页面
import Forget from '../views/login/forget.vue'; // 忘记密码页面
import Index from '../views/index/index.vue'; // 首页
import Search from '../views/search/index.vue'; // 搜索
import UserContactCreate from '../views/user-contact/user-contact-create.vue'; // 创建联系人页面
import Mine from '../views/mine/mine.vue'; // 我的页面
import MineInfo from '../views/mine/mine-info.vue'; // 个人信息页面
import MineInfoEdit from '../views/mine/mine-info-edit.vue'; // 个人信息修改页面
import MineAddress from '../views/user-contact/address-manage.vue'; // 地址管理页面

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/register',
			name: 'Register',
			component: Register,
			meta: {
				title: '注册'
			}
		},
		{
			path: '/login',
			name: 'Login',
			component: Login,
			meta: {
				title: '登陆'
			}
		},
		{
			path: '/forget',
			name: 'Forget',
			component: Forget,
			meta: {
				title: '忘记密码'
			}
		},
		{
			path: '/index',
			name: 'Index',
			component: Index,
			meta: {
				title: '首页'
			}
		},
		{
			path: '/search',
			name: 'Search',
			component: Search,
			meta: {
				title: '搜索'
			}
		},
		{
			path: '/mine',
			name: 'Mine',
			component: Mine,
			meta: {
				title: '我的'
			}
		},
		{
			path: '/mine/info',
			name: 'MineInfo',
			component: MineInfo,
			meta: {
				title: '个人信息'
			}
		},
		{
			path: '/mine/info-edit',
			name: 'MineInfoEdit',
			component: MineInfoEdit,
			meta: {
				title: '个人信息修改'
			}
		},
		{
			path: '/mine/address',
			name: 'MineAddress',
			component: MineAddress,
			meta: {
				title: '地址管理'
			}
		},
		{
			path: '/contact/create',
			name: 'UserContactCreate',
			component: UserContactCreate,
			query: {
				redirect: ''
			},
			meta: {
				title: '创建联系人'
			}
		},
		{
			path: '*',
			redirect: {
				name: 'Index'
			}
		}
	]
});
