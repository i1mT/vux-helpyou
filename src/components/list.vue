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
import { Group, XInput, Tab, TabItem, XButton, Divider, XHeader, AjaxPlugin, Toast, Tabbar, TabbarItem, XTextarea, FormPreview, ViewBox, Confirm, Radio } from 'vux'

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
	    Radio
	},
	mounted() {
		const get_userinfo_url = "http://localhost/helpyou-server/sql_class/user_operation.php?method=get_userinfo_by_email&email=" + this.$route.params.email
		var userinfo = {},
			that = this,
			_email = this.$route.params.email

		AjaxPlugin.$http.get( get_userinfo_url ).then( ( res ) => {
			userinfo = res.data
			that.userinfo = userinfo
			that.route_list = "/list/email/" + _email
			that.route_user_center = "/user_center/email/" + _email
			const get_user_list_url = "http://localhost/helpyou-server/sql_class/user_operation.php?method=get_user_list&email=" + _email
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
					if ( data[i].state == "已确认") {
						list.buttons = []
					}else{
						list.buttons = [{
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
						}]
					}
					lists.push( list )
				}
				this.lists = lists
			})
		})
	},
	data () {

		//获取用户清单
		return {
			goods_type_options: [{
				key: '小件',
				value: "小件"
			},{
				key: '中件',
				value: "中件"
			},{
				key: '大件',
				value: '大件'
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
			goods_type: ""
		}
	},
	methods: {
		submit_msg : function ( ) {
			//解析短信内容
			var content = this.msg_content,
				res = {
					pick_pos: "",
					shelf_num: "",
					goods_type: this.goods_type
				}
			
			if ( content.indexOf("文理河西物流服务点") >= 0 ){
				//是河西快递超市的
				res.pick_pos = "文理河西物流服务点"
				var index_start = content.indexOf ( "『" ),
					index_end = content.indexOf ( "』" ),
					num = content.substr(index_start+1, index_end - index_start -1 )
				res.shelf_num = num
			}else if ( content.indexOf("文理河西西大门") >= 0 ) {
				res.pick_pos = "文理河西西大门"
				var index_start = content.indexOf ( "『" ),
					index_end = content.indexOf ( "』" ),
					num = content.substr(index_start+1, index_end - index_start - 1 )
				res.shelf_num = num

			} else if ( content.indexOf("风雅苑车库") >= 0 ) {
				res.pick_pos = "风雅苑车库"
				var index_start = content.indexOf ( "[" ),
					index_end = content.indexOf ( "]" ),
					num = content.substr(index_start + 1, index_end - index_start - 1 )
				res.shelf_num = num
			}
			console.log(res)
		},
		onCancel: function () {
			console.log("取消了")
		},
		onConfirm: function () {
			console.log("确认了")
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
</style>