const apiRoutes = {
	sms: 'sms',    // 发送验证码
	user: 'user',    // 注册
	editPhone: 'user/phone',  //  修改用户手机号
	editPassword: 'user/password',  //  修改用户密码
	mine: 'user/mine',    // 我的页面
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
	certList: 'user/certificates'  //  认证列表
};

export default apiRoutes;
