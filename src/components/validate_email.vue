<template>
	<div id="validate_email">
		<x-header>验证邮箱</x-header>
		<div class="valid" v-show="valid_show_state">
			<div class="vux-demo">
		      <img class="logo" src="../assets/vux_logo.png">
		      <p class="hello"><inline-loading ref="load"></inline-loading> {{ msg }}</p>
		    </div>
		    <group class='tab-0'>
		    	<x-input title="验证码" v-model="user_valid_code"  placeholder="填写验证码" ></x-input>
		    	<divider></divider>
		    	<x-button type="primary" @click.native="validate">确认</x-button>
		    	<x-button :disabled="resend_button_dis" @click.native="resend">{{ resend_num }}重新发送</x-button>
		    </group>
		</div>
	    <div id="msg-success" v-show="msg_show_state">
	    	<msg title="验证成功" description="你已成功注册" :buttons="buttons" icon="success"></msg>
	  	</div>
	  	<toast v-model="toast_show" type="cancel">验证码错误</toast>
	</div>
</template>

<script>
import { Group, XInput, XButton, Divider, XHeader, InlineLoading, AjaxPlugin, Msg ,Toast } from 'vux'

export default {
	components: {
		XInput,
	    Group,
	    XButton,
	    Divider,
	    XHeader,
	    InlineLoading,
	    AjaxPlugin,
	    Msg,
	    Toast
	},
	mounted () {
		const send_email_url = 'http://www.iimt.me/helpyou-server/mail-server/sendMail.php?email='+this.$route.params.email+"&psw=tfhhh"
		AjaxPlugin.$http.get(send_email_url).then( (res) => {
			this.$route.params.code = res.data.toString().trim()
			this.$refs.load.$el.style.display='none'
		} )
		//隐藏加载
	},
	data () {
		return {
			msg: "我们向你发送了一封邮件，请填写你收到的验证码",
			text: "",
			user_valid_code: "",
			buttons: [{
		        type: 'primary',
		        text: '去登陆',
		        link: "/"
		    }],
		    valid_show_state: true,
		    msg_show_state: false,
		    toast_show: false,
		    resend_button_dis: false,
		    resend_num: ""
		}
	},
	methods: {
		validate: function () {
			console.log(this.$route.params.code)
			if(this.user_valid_code.toLowerCase() == this.$route.params.code){
				console.log("邮箱验证成功")
				//写入数据库
				const username = this.$route.params.username,
					  password = this.$route.params.password,
					  email = this.$route.params.email
				const url = "http://www.iimt.me/helpyou-server/sql_class/user_operation.php?method=add_user&username="+username+"&password="+password+"&email="+email
				AjaxPlugin.$http.get( url ).then( (res) => {
					console.log(res.data)
				})
				//显示成功信息
				this.valid_show_state = false
				this.msg_show_state = true
			}
			else{
				this.toast_show = true
				setTimeout(function () {
					this.toast_show = false
				},1500)
				console.log("邮箱验证失败")
			}
		},
		resend: function () {
			this.$refs.load.$el.style.display = 'table-column-group'
			const send_email_url = 'http://www.iimt.me/helpyou-server/mail-server/sendMail.php?email='+this.$route.params.email+"&psw=tfhhh"
			AjaxPlugin.$http.get(send_email_url).then( (res) => {
				this.$route.params.code = res.data.toString().trim()
				this.$refs.load.$el.style.display='none'
			})
			this.resend_button_dis = true
			const _this = this
			var num = 60
			_this.resend_num = "(60)"
			setInterval( function () {
				num--
				_this.resend_num = "(" + num + ")"
				if( num==0 ){
					_this.resend_button_dis = false
					clearInterval(this)
				}
			}, 1000)
		}
	}
}
</script>

<style>
.vux-demo {
  text-align: center;
}
.hello {
	width: 90%;
	margin: 0 auto;
}
#msg{
	display: none;
}
</style>