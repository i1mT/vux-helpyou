<template>
	<div id="user_center">
		<div class="vux-demo">
			<img class="logo" src="../assets/vux_logo.png">
			<p class="username"> {{ userinfo.name }}</p>
			<p> <span class="gender">{{ gender_name }}</span><span class="tel">{{ tel }}</span> </p>
			<p class="add">{{ add }}</p>
    	</div>
    	<divider class="divider">·</divider>
    	<group>
    		<cell title="设置个人信息" is-link @click.native="set_userinfo"></cell>
    		<cell title="退出" @click.native="logout"></cell>
    	</group>
		<div class="pay">
			<img class="qrcode" src="../assets/weichat-pay.png">
			<p>长按微信支付</p>
			<p class="add">支付宝账号：17306566375</p>
			<p class="add">其他问题：QQ1298793121</p>
    	</div>
		<tabbar>
			<tabbar-item :link='route_list'>
				<img slot="icon" src="../assets/img/list.png">
				<span slot="label">清单</span>
			</tabbar-item>
			<tabbar-item selected :show-dot="showdot" :link="route_user_center">
				<img slot="icon" src="../assets/img/user.png">
				<span slot="label">个人</span>
			</tabbar-item>
		</tabbar>
	</div>
</template>

<script>
import { Group, XInput, Tab, TabItem, XButton, Divider, XHeader, AjaxPlugin, Toast, Tabbar, TabbarItem, Cell, Qrcode  } from 'vux'

export default {
	components: {
		XInput,
	    Tab,
	    TabItem,
	    Group,
	    XButton,
	    Divider,
	    XHeader,
	    AjaxPlugin,
	    Toast,
	    Tabbar,
	    TabbarItem,
	    Cell,
	    Qrcode
	},
	data () {
		if( window.localStorage.islogin == "false" ){
			this.$router.push("/")
		}

		const get_userinfo_url = "http://www.iimt.me/helpyou-server/sql_class/user_operation.php?method=get_userinfo_by_email&email=" + this.$route.params.email
		var userinfo = {},
			that = this
		AjaxPlugin.$http.get( get_userinfo_url ).then( ( res ) => {
			userinfo = res.data 
			that.userinfo = userinfo
			that.route_list = "/list/email/" + that.userinfo.email
			that.route_user_center = "/user_center/email/" + that.userinfo.email
			that.gender_name = userinfo.gender? "男":"女"
			that.tel = userinfo.tel
			that.add = userinfo.add
		})
		return {
			showdot: false,
			route_list: "",
			route_user_center : "",
			userinfo: {},
			gender_name: "",
			tel: "",
			add: ""
		}
	},
	methods: {
		set_userinfo: function () {
			this.$router.push({
				name: "set_userinfo",
				params: {
					email: this.userinfo.email
				}
			})
		},
		logout: function () {
			window.localStorage.islogin = false
			console.log("退出")
			this.$router.push("/")
		}
	}
}
</script>

<style>
.vux-demo {
  text-align: center;
  margin-top: 5px;
}
.logo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid #fff;
  box-shadow: 0px 0px 5px 0px #999;
}
.divider {
	padding: 0;
}
.pay {
	text-align: center;
	margin-top: 5px;
}
.qrcode {
	width: 100px;
	height: 100px;
}
.vux-demo .username {
	font-size: 20px;
}
.vux-demo p{
}
.gender {
	font-size: 15px;
	margin-right: 10px;
	color: #87CEFF;
	font-weight: bold;
}
.tel {
	font-size: 15px;
	color: #757575;
}
.add {
	font-size: 14px;
	color: #757575;
}
</style>