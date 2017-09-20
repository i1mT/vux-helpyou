<template>
	<div id="tfhhh">
		<div class="checker">
			<checker v-model="pos" default-item-class="selecte" selected-item-class="selecte-selected">
				<checker-item value="1">西大门({{ pos_num.a }})</checker-item>
				<checker-item value="2">河西菜鸟({{ pos_num.b }})</checker-item>
				<checker-item value="3">风雅苑({{ pos_num.c }})</checker-item>
				<checker-item value="4">其他({{ pos_num.d }})</checker-item>
		     </checker>
		</div>
		<divider @click.native="refresh_page">点击刷新</divider>
		<view-box ref="viewBox">
			<form-preview
					v-for="item in lists"
					:name="item.id"
					:header-label="item.time"
					:header-value="item.date"
					:body-items="item.desc"
					:footer-buttons="item.buttons"
					v-show="item.show"
			></form-preview>
		</view-box>
		<tabbar id="tabbar">
			<tabbar-item selected class="tab">
				<img slot="icon" src="../assets/img/list.png">
				<span slot="label">管理端</span>
			</tabbar-item>
			<tabbar-item class="tab" link="/count">
				<img slot="icon" src="../assets/img/list.png">
				<span slot="label">统计</span>
			</tabbar-item>
		</tabbar>
		<confirm v-model="confirm_show"
	      :title="confirm_text"
	      @on-cancel="onCancel"
	      @on-confirm="onConfirm"
	    >     
	    	<p style="text-align:center;">三思啊</p>
      	</confirm>
      	<toast v-model="toast_show">{{ toast_content }}</toast>
	</div>
</template>

<script>
import { Group, XInput, Tab, TabItem, XButton, Divider, XHeader, AjaxPlugin, Toast, Tabbar, TabbarItem, ViewBox,Checker,CheckerItem,FormPreview,Confirm } from 'vux'

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
	    ViewBox,
	    Checker,
	    CheckerItem,
	    FormPreview,
	    Confirm
	},
	data () {
		const get_data_url = "http://www.iimt.me/helpyou-server/sql_class/get_admin_info.php"
		var data = {},
			lists = [],
			pos_num = {a:0,b:0,c:0,d:0}

		AjaxPlugin.$http.get( get_data_url ).then( ( res ) => {
			data = res.data
			for ( var i = data.length - 1; i >=0; i-- ) {
					if (data[i].pick_pos=="文理河西物流服务点")
						pos_num.b++
					else if ( data[i].pick_pos=="文理河西西大门" )
						pos_num.a++
					else if ( data[i].pick_pos=="风雅苑车库" )
						pos_num.c++
					else if ( data[i].pick_pos=="其他" )
						pos_num.d++

				var list = {
					id: data[i].id,
					date: data[i].time.toString().substr( 11 ),
					time: data[i].time.toString().substr( 0, 10 ),
					desc: [{
						label: "用户地址",
						value: data[i].address
					},{
						label: "性别",
						value: data[i].gender
					},{
						label: "名字",
						value: data[i].name
					},{
						label: "电话",
						value: data[i].tel
					},{
						label: "取件点",
						value: data[i].pick_pos
					},{
						label: "货架号",
						value: data[i].shelf_num
					},{
						label: "类型",
						value: data[i].goods_type
					}],
					buttons: [{
				        style: 'primary',
				        text: '确认送到',
				        onButtonClick: ( id ) => {
							console.log( "确认" + id )
							this.confirm_show = true
							this.operate_id = id
						}
				    }],
				    show: true
				}
				lists.push( list )
			}
			this.lists = lists
			this.pos_num = pos_num
		})
		return {
			lists: [],
			pos: "",
			confirm_show: false,
			confirm_text: "确认送到了吗？",
			operate_id: "",
			toast_show: false,
			toast_content: "",
			pos_num: {}
		}
	},
	methods: {
		onCancel: function () {
			console.log("取消了")
		},
		onConfirm: function () {
			const url = "http://www.iimt.me/helpyou-server/sql_class/set_list_state.php?id="+this.operate_id+"&state=已确认"
			AjaxPlugin.$http.get( url ).then( ( res ) => {
				if( res.data ){
					this.toast_show = true
					this.toast_type = "success"
					this.toast_content = "操作成功"
					setTimeout(function () {
						location.reload()
					}, 800 )
					
				}else{
					this.toast_show = true
					this.toast_type = "cancle"
					this.toast_content = "操作失败"
				}
			})
		},
		refresh_page: function () {
			location.reload()
		}
	},
	watch: {
		pos: function ( val ) {
			var pos = ""
			switch ( val ) {
				case "1":
					pos = "西大门对面"
					break;
				case "2":
					pos = "文理河西物流服务点"
					break;
				case "3":
					pos = "风雅苑车库"
					break;
				case "4":
					pos = "其他"
					break;
			}
			var lists = this.lists
			for ( var i = lists.length - 1; i >=0; i-- ) {
				if ( lists[i].desc[4].value != pos ){
					lists[i].show = false
				}else{
					lists[i].show = true
				}
			}
			this.lists = lists
		}
	}
}
</script>

<style>
#tabbar {
	position: fixed;
	bottom: 0;
}
.selecte {
  border: 1px solid #ececec;
  padding: 3px 15px;
}
.selecte-selected {
  border: 1px solid green;
}
.checker {
	text-align: center;
}
</style>