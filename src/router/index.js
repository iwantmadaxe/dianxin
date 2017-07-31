import Vue from 'vue';
import Router from 'vue-router';
import Register from '../views/register/register.vue'; // 注册页面
import Login from '../views/login/login.vue'; // 登陆页面
import Forget from '../views/login/forget.vue'; // 忘记密码页面
import Index from '../views/index/index.vue'; // 首页
import Search from '../views/search/index.vue'; // 搜索
import Mine from '../views/mine/mine.vue'; // 我的页面
import MineQrcode from '../views/mine/mine-qrcode.vue'; // 我的二维码页面
import MineInfoEdit from '../views/mine/mine-info-edit.vue'; // 个人信息修改页面
import PackageList from '../views/package/list.vue'; // 套餐列表页面
import QueryData from '../views/query/data.vue'; // 查询流量页面
import RecordList from '../views/query/record-list.vue'; // 消费记录页面
import EditPhone from '../views/edit/phone.vue'; // 修改手机号页面
import BindPhone from '../views/edit/newPhone.vue'; // 绑定手机号页面
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
import BuyFlow from '../views/buy/flow.vue'; // 订购流量页面
import BuyPost from '../views/buy/post.vue'; // 在线购买页面
// import MyPoint from '../views/mine/point.vue'; // 我的积分页面
import Binding from '../views/binding/index.vue'; // 绑定页面
import WithdrawCash from '../views/point/cash.vue'; // 积分提现页面
import PointExchange from '../views/point/exchange.vue'; // 积分兑换页面
import PointExchangeList from '../views/point/exchangeList.vue'; // 积分兑换列表页面
import AddAddress from '../views/address/add.vue'; // 添加地址页面
import EditAddress from '../views/address/edit.vue'; // 编辑地址页面
import AddressList from '../views/address/list.vue'; // 地址列表页面
import AddressChoose from '../views/address/choose.vue'; // 选择地址页面
import PointList from '../views/point/list.vue'; // 积分列表页面
import CardList from '../views/card/list.vue'; // 卡列表页面
import PointCenter from '../views/point/center.vue'; // 积分管理页面

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/register',
			name: 'Register',
			query: {
				redict: null
			},
			component: Register,
			meta: {
				title: '注册'
			}
		},
		{
			path: '/login',
			name: 'Login',
			query: {
				redict: null
			},
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
			path: '/mine/qrcode',
			name: 'MineQrcode',
			query: {
				img: null
			},
			component: MineQrcode,
			meta: {
				title: '我的二维码'
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
			path: '/edit/newPhone',
			name: 'BindPhone',
			component: BindPhone,
			meta: {
				title: '绑定手机号'
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
			path: '/card/list',
			name: 'CardList',
			component: CardList,
			meta: {
				title: '卡列表'
			}
		},
		{
			path: '/point/center',
			name: 'PointCenter',
			component: PointCenter,
			meta: {
				title: '积分管理'
			}
		},
		{
			path: '/point/list',
			name: 'PointList',
			component: PointList,
			meta: {
				title: '积分列表'
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
			path: '/binding',
			name: 'Binding',
			component: Binding,
			meta: {
				title: '绑定'
			}
		},
		{
			path: '/buy-flow',
			name: 'BuyFlow',
			component: BuyFlow,
			meta: {
				title: '购买流量'
			}
		},
		{
			path: '/buy-post',
			name: 'BuyPost',
			query: {
				recommend: null,
				address: null,
				num: null
			},
			component: BuyPost,
			meta: {
				title: '在线购买'
			}
		},
		{
			path: '/address/choose',
			name: 'AddressChoose',
			query: {
				recommend: null,
				num: null
			},
			component: AddressChoose,
			meta: {
				title: '选择地址'
			}
		},
		{
			path: '/address/add',
			name: 'AddAddress',
			component: AddAddress,
			meta: {
				title: '添加地址'
			}
		},
		{
			path: '/address/edit/:id',
			name: 'EditAddress',
			component: EditAddress,
			meta: {
				title: '编辑地址'
			}
		},
		{
			path: '/address/list',
			name: 'AddressList',
			component: AddressList,
			meta: {
				title: '地址列表'
			}
		},
		// {
		// 	path: '/my-point',
		// 	name: 'MyPoint',
		// 	component: MyPoint,
		// 	meta: {
		// 		title: '我的积分'
		// 	}
		// },
		{
			path: '/point/cash',
			name: 'WithdrawCash',
			component: WithdrawCash,
			meta: {
				title: '积分提现'
			}
		},
		{
			path: '/point/exchange',
			name: 'PointExchange',
			component: PointExchange,
			meta: {
				title: '积分兑换'
			}
		},
		{
			path: '/point/exchange/list',
			name: 'PointExchangeList',
			component: PointExchangeList,
			meta: {
				title: '积分兑换列表'
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
