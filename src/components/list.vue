<template>
	<div id="list">
		<view-box ref="viewBox">
			<h4>粘贴你的快递短信到这</h4>
			<group>
				<x-textarea v-model="msg_content"></x-textarea>
				<x-button type="primary" @click.native="submit_msg">确认</x-button>
			</group>
			<divider>·</divider>
			<form-preview
				v-for="item in lists"
				:name="item.id"
				:header-label="item.date"
				:header-value="item.time"
				:body-items="item.desc"
				:footer-buttons="item.buttons"
			></form-preview>
			<tabbar id="bottom">
				<tabbar-item selected :link='route_list'>
					<img slot="icon" src="../assets/img/list.png">
					<span slot="label">提交</span>
				</tabbar-item>
				<tabbar-item :show-dot="showdot" :link="route_user_center">
					<img slot="icon" src="../assets/img/user.png">
					<span slot="label">个人</span>
				</tabbar-item>
			</tabbar>
		</view-box>
		<confirm v-model="show_confirm"
	      :title="confirm_text"
	      @on-cancel="onCancel"
	      @on-confirm="onConfirm"
	    >
	        <p style="text-align:center;">三思啊</p>
      </confirm>
	</div>
</template>

<script>
import { Group, XInput, Tab, TabItem, XButton, Divider, XHeader, AjaxPlugin, Toast, Tabbar, TabbarItem, XTextarea, FormPreview, ViewBox, Confirm } from 'vux'

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
	    Confirm 
	},
	data () {
		const get_userinfo_url = "http://localhost/helpyou-server/sql_class/user_operation.php?method=get_userinfo_by_email&email=" + this.$route.params.email
		var userinfo = {},
			that = this
		AjaxPlugin.$http.get( get_userinfo_url ).then( ( res ) => {
			userinfo = res.data 
			that.userinfo = userinfo
			that.route_list = "/list/email/" + that.userinfo.email
			that.route_user_center = "/user_center/email/" + that.userinfo.email
		})

		return {
			userinfo : {},
			showdot : false,
			route_list: "",
			route_user_center : "",
			msg_content: "",
			//这个lists为模拟数据 真实数据从服务器请求过来
			lists: [{
				id: "1",
				date: "12:52:30",
				time: "2017.09.18",
				buttons: [{
			        style: 'default',
			        text: '取消',
			        onButtonClick: ( id ) => {
						console.log( "取消" + id )
						this.confirm_text = "确认取消吗"
						this.show_confirm = true
					}
			    },{
					style: 'primary',
					text: '确认收到',
					onButtonClick: ( id ) => {
						console.log( "确认" + id )
						this.confirm_text = "确认收到了吗"
						this.show_confirm = true
					}
				}],
				desc: [{
					label: "地址",
					value: "河西"
				},{
					label: "货架号",
					value: "12-5"
				},{
					label: "类型",
					value: "大件"
				},{
					label: "状态",
					value: "待接单"
				}]
			},{
				id: "2",
				date: "10:16:25",
				time: "2017.09.18",
				buttons: [{
			        style: 'default',
			        text: '取消',
			        onButtonClick: ( id ) => {
						console.log( "取消" + id )
						this.confirm_text = "确认取消吗"
						this.show_confirm = true
					}
			    },{
					style: 'primary',
					text: '确认收到',
					onButtonClick: ( id ) => {
						console.log( "确认" + id )
						this.confirm_text = "确认取消吗"
						this.show_confirm = true
					}
				}],
				desc: [{
					label: "地址",
					value: "西大门"
				},{
					label: "货架号",
					value: "14-1"
				},{
					label: "类型",
					value: "中件"
				},{
					label: "状态",
					value: "√ 已完成"
				}]
			}],
			confirm_text: "取消",
			show_confirm: false
		}
	},
	methods: {
		submit_msg : function ( ) {
			//解析短信内容
			console.log( msg_content )
		},
		onCancel: function () {
			console.log("取消了")
		},
		onConfirm: function () {
			console.log("确认了")
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
</style>