const apiRoutes = {
	sms: 'sms',    // 发送验证码
	user: 'user',    // 注册
	editPhone: 'user/phone',  //  修改用户手机号
	editPassword: 'user/password',  //  修改用户密码
	userProfile: 'user/profile',  //  用户信息
	userProfileEdit: 'user',  //  修改用户信息
	login: 'user/login',  //  登陆
	logout: 'user/logout',  //  退出登陆
	forget: 'user/password/forget',  //  忘记密码
	flow: 'flow/packages',  //  套餐列表 dx项目至此
	flowCheck: 'flow/balance',  //  流量查询
	flowRecord: 'package/record',  //  消费记录
	address: 'option/area',  //  地址列表
	certPost: 'user/certificate',  //  实名认证
	certList: 'user/certificates',  //  认证列表
	cardsList: 'user/cards',  //  卡列表
	editCardNick: 'card',  //  id是卡id, 接受参数是nick_name卡昵称
	postOrder: 'package',  //  下订单
	msgList: 'user/messages',  //  信息列表
	msgRead: 'user/message/read',  //  信息已读（全部）
	getAddressList: 'delivery/address',  //  收货地址列表
	createAddress: 'delivery/address/create',  //  创建收货地址
	getSingleAddress: 'delivery/address',  //  对某个id的收货地址操作
	defaultAddress: 'delivery/address/default',  //  获取默认地址
	getPackageDetail: 'card/packages',  //  购卡的套餐
	buyCard: 'card/packages',  //  购卡下单接口 接受一个参数address，必填项
	getQrcode: 'user/qrcode',  //  参数url必填，是发起申请的当前url
	pointGetCash: 'points/drawing',  //  积分提现状况
	pointRule: 'points/drawing/rule',  //  积分兑换规则
	pointList: 'points',  //  积分记录列表
	pointCountMoney: 'points/drawing/rate',  //  积分换算金额
	pointCashApply: 'points/drawing/apply'  //  积分提现申请
};

export default apiRoutes;
