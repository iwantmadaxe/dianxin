import Vue from 'vue';
import Router from 'vue-router';
import Register from '../views/register/register.vue'; // 注册页面
import Login from '../views/login/login.vue'; // 登陆页面
import Forget from '../views/login/forget.vue'; // 忘记密码页面
import Index from '../views/index/index.vue'; // 首页
import Search from '../views/search/index.vue'; // 搜索
import Mine from '../views/mine/mine.vue'; // 我的页面
import MineInfo from '../views/mine/mine-info.vue'; // 个人信息页面
import MineInfoEdit from '../views/mine/mine-info-edit.vue'; // 个人信息修改页面
import PackageList from '../views/package/list.vue'; // 套餐列表页面
import QueryData from '../views/query/data.vue'; // 查询流量页面
import RecordList from '../views/query/record-list.vue'; // 消费记录页面
import EditPhone from '../views/edit/phone.vue'; // 修改手机号页面
import EditPassword from '../views/edit/password.vue'; // 修改密码页面
import CertAdd from '../views/cert/certAdd.vue'; // 认证添加页面
import CertWait from '../views/cert/certWait.vue'; // 认证添加已提交页面
import CertFail from '../views/cert/certFail.vue'; // 认证添加失败页面
import CertSuccess from '../views/cert/certSuccess.vue'; // 认证添加成功页面
import CertList from '../views/cert/list.vue'; // 认证列表页面
import MsgCenter from '../views/msg/list.vue'; // 消息中心页面
import CardChoose from '../views/card/choose.vue'; // 卡选择页面
import RecordListChoose from '../views/query/listChoose.vue'; // 选择套餐列表页面
import QueryDataChoose from '../views/query/dataChoose.vue'; // 选择查询流量页面
import PackageListChoose from '../views/package/listChoose.vue'; // 选择套餐列表页面

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
			path: '/package/list/:id',
			name: 'PackageList',
			component: PackageList,
			params: {
				id: null
			},
			meta: {
				title: '套餐列表'
			}
		},
		{
			path: '/query/data/:id',
			name: 'QueryData',
			component: QueryData,
			params: {
				id: null
			},
			meta: {
				title: '查询流量'
			}
		},
		{
			path: '/package/list/choose',
			name: 'PackageListChoose',
			component: PackageListChoose,
			meta: {
				title: '套餐列表选择'
			}
		},
		{
			path: '/query/list/choose',
			name: 'RecordListChoose',
			component: RecordListChoose,
			meta: {
				title: '选择消费记录'
			}
		},
		{
			path: '/query/data/choose',
			name: 'QueryDataChoose',
			component: QueryDataChoose,
			meta: {
				title: '选择查询流量'
			}
		},
		{
			path: '/query/record-list/:id',
			name: 'RecordList',
			component: RecordList,
			params: {
				id: null
			},
			meta: {
				title: '消费记录'
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
			path: '/edit/phone',
			name: 'EditPhone',
			component: EditPhone,
			meta: {
				title: '修改手机号'
			}
		},
		{
			path: '/edit/password',
			name: 'EditPassword',
			component: EditPassword,
			meta: {
				title: '修改密码'
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
			path: '/cert/list',
			name: 'CertList',
			component: CertList,
			meta: {
				title: '认证列表'
			}
		},
		{
			path: '/cert/add',
			name: 'CertAdd',
			component: CertAdd,
			meta: {
				title: '实名认证'
			}
		},
		{
			path: '/cert/wait',
			name: 'CertWait',
			component: CertWait,
			meta: {
				title: '实名认证-已提交'
			}
		},
		{
			path: '/cert/success',
			name: 'CertSuccess',
			component: CertSuccess,
			meta: {
				title: '实名认证-已经通过'
			}
		},
		{
			path: '/cert/fail',
			name: 'CertFail',
			component: CertFail,
			meta: {
				title: '实名认证-失败'
			}
		},
		{
			path: '/msg/center',
			name: 'MsgCenter',
			component: MsgCenter,
			meta: {
				title: '消息通知'
			}
		},
		{
			path: '/card/choose',
			name: 'CardChoose',
			component: CardChoose,
			meta: {
				title: '卡选择'
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
