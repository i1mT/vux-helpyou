<template>
	<div id="list">
		<view-box ref="viewBox">
			<h4>粘贴你的快递短信到这</h4>
			<group>
				<x-textarea v-model="msg_content"></x-textarea>
			</group>
			<group title="类别">
				<radio :options="goods_type_options" @on-change="radio_change"></radio>
			</group>
			<group>
				<x-button type="primary" @click.native="submit_msg">确认</x-button>
			</group>
			<divider>已提交清单</divider>
			<form-preview
				v-for="item in lists"
				:name="item.id"
				:header-label="item.time"
				:header-value="item.date"
				:body-items="item.desc"
				:footer-buttons="item.buttons"
			></form-preview>
			<tabbar id="bottom">
				<tabbar-item selected :link='route_list'>
					<img slot="icon" src="../assets/img/list.png">
					<span slot="label">清单</span>
				</tabbar-item>
				<tabbar-item :show-dot="showdot" :link="route_user_center">
					<img slot="icon" src="../assets/img/user.png">
					<span slot="label">个人</span>
				</tabbar-item>
			</tabbar>
		</view-box>
		<toast v-model="toast_show" :type="toast_type">{{ toast_content }}</toast>
		<confirm v-model="show_confirm"
	      :title="confirm_text"
	      @on-cancel="onCancel"
	      @on-confirm="onConfirm"
	    >
	        <p style="text-align:center;">三思啊</p>
      </confirm>
      <div v-transfer-dom>
			<x-dialog v-model="pic_show" class="dialog-demo">
				<div class="img-box">
					<img src="../assets/pay.png" style="max-width:100%">
				</div>
				<div @click="pic_show=false">
					<span class="vux-close">关闭</span>
				</div>
			</x-dialog>
		</div>
	</div>
</template>

<script>
import { Group, XInput, Tab, TabItem, XButton, Divider, XHeader, AjaxPlugin, Toast, Tabbar, TabbarItem, XTextarea, FormPreview, ViewBox, Confirm, Radio,
	XDialog, TransferDomDirective as TransferDom} from 'vux'

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
	    XTextarea,
	    FormPreview,
	    ViewBox,
	    Confirm,
	    Radio,
	    XDialog
	},
	directives: {
	    TransferDom
	},
	mounted() {
		if( window.localStorage.islogin == "false" ){
			this.$router.push("/")
		}
		const get_userinfo_url = "http://www.iimt.me/helpyou-server/sql_class/user_operation.php?method=get_userinfo_by_email&email=" + this.$route.params.email
		var userinfo = {},
			that = this,
			_email = this.$route.params.email

		AjaxPlugin.$http.get( get_userinfo_url ).then( ( res ) => {
			userinfo = res.data
			console.log( userinfo )
			_email = userinfo.email
			const get_user_list_url = "http://www.iimt.me/helpyou-server/sql_class/user_operation.php?method=get_user_list&email=" + _email
			AjaxPlugin.$http.get( get_user_list_url ).then( ( res ) => {
				var data = res.data,
					lists = []
				for ( var i = data.length - 1; i >=0; i-- ) {
					var list = {
						id: data[i].id,
						date: data[i].time.toString().substr( 11 ),
						time: data[i].time.toString().substr( 0, 10 ),
						desc: [{
							label: "取件点",
							value: data[i].pick_pos
						},{
							label: "货架号",
							value: data[i].shelf_num
						},{
							label: "类型",
							value: data[i].goods_type
						},{
							label: "状态",
							value: data[i].state
						}]
					}
					if ( data[i].state == "已确认" || data[i].state=="已取消") {
						list.buttons = []
					}else{
						list.buttons = [{
					        style: 'default',
					        text: '取消代取',
					        onButtonClick: ( id ) => {
								console.log( "取消" + id )
								this.confirm_text = "确认取消吗"
								this.show_confirm = true
								this.cur_operate_id = id
								this.opreate_type = "cancle"
							}
					    },{
					    	style: 'paimary',
					        text: '支付',
					        onButtonClick: ( id ) => {
								console.log( "支付" + id )
								this.pic_show = true
							}
					    }]
					}
					lists.push( list )
				}
				this.lists = lists
			})
			this.userinfo = userinfo
			this.route_list = "/list/email/" + _email
			this.route_user_center = "/user_center/email/" + _email
			//判断用户信息是否设置
			if(!userinfo.name || !userinfo.add || !userinfo.tel || !userinfo.valid_pic){
				this.toast_content = "请先完善个人信息"
				this.toast_type = "text"
				this.toast_show = true
				var that = this
				setTimeout(function () {
					that.$router.push({
						name: "set_userinfo",
						params: {
							userinfo: that.userinfo
						}
					})
				}, 1000 )
			}
		})
	},
	data () {

		//获取用户清单
		return {
			goods_type_options: [{
				key: '小件',
				value: "小件  (1元)"
			},{
				key: '中件',
				value: "中件  (2元)"
			},{
				key: '大件',
				value: '大件  (3元)'
			}],
			userinfo : {},
			showdot : false,
			route_list: "",
			route_user_center : "",
			msg_content: "",
			//这个lists为模拟数据 真实数据从服务器请求过来
			lists: [],
			confirm_text: "取消",
			show_confirm: false,
			goods_type: "",
			toast_show: false,
			toast_content: "成功",
			toast_type: "success",
			cur_operate_id: "",
			pic_show: false
		}
	},
	methods: {
		submit_msg : function ( ) {
			if( !this.msg_content.length ) return;
			//解析短信内容
			
			const add_list_url = "http://www.iimt.me/helpyou-server/sql_class/user_operation.php?method=add_list&uid="+this.userinfo.id+"&goods_type="+this.goods_type,
				msg_content = this.msg_content

			AjaxPlugin.$http.post( add_list_url, {msg_content: msg_content}, {headers:{'Content-Type': 'application/x-www-form-urlencoded'}} ).then( ( res ) => {
				if( res.data ) {
					this.toast_content = "成功"
					this.toast_type = "success"
					this.toast_show = true
					setTimeout(function () {
						location.reload()
					}, 1500 )
				}else{
					this.toast_content = "添加失败\n请检查网络或反馈信息给开发者"
					this.toast_type = "cancel"
					this.toast_show = true
				}
			})
		},
		onCancel: function () {
			console.log("取消了")
		},
		onConfirm: function () {
			console.log( this.opreate_type, this.cur_operate_id )
			var state = ""
			if ( this.opreate_type=="confirm" )
				state = "已确认"
			else
				state = "已取消"
			
			const url = "http://www.iimt.me/helpyou-server/sql_class/set_list_state.php?id="+this.cur_operate_id+"&state="+state

			AjaxPlugin.$http.get( url ).then( ( res ) => {
				if( res.data ){
					this.toast_show = true
					this.toast_type = "success"
					this.toast_content = "操作成功"
					setTimeout(function () {
						location.reload()
					}, 1500 )
					
				}else{
					this.toast_show = true
					this.toast_type = "cancle"
					this.toast_content = "操作失败"
				}
			})
		},
		radio_change: function ( val ) {
			this.goods_type = val
		}
	}
}
</script>

<style>
	h4 {
		padding-top: 15px;
		text-align: center;
		color: #555;
	}
	textarea {
		height: 100px;
		margin-bottom: 10px;
	}
	#list {
		height: 100%;
	}
	#bottom {
		position: fixed;
		bottom: 0;
	}
	.dialog-demo .weui-dialog{
		border-radius: 8px;
		padding-bottom: 8px;
	}
	.dialog-demo .dialog-title {
		line-height: 30px;
		color: #666;
	}
	.dialog-demo .img-box {
		height: 350px;
		overflow: hidden;
	}
	.dialog-demo .vux-close {
		margin-top: 8px;
		margin-bottom: 8px;
		color: #0BB20C;
		font-size: 12px;
	}
</style>