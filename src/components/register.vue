<template>
  <div id="register">
    <x-header>{{ msg }}</x-header>
    <div class="vux-demo">
      <img class="logo" src="../assets/vux_logo.png">
      <p>请先填写注册信息</p>
    </div>
    <group class='tab-0'>
      <x-input title="学号" v-model="username" ref="username" :is-type="is_en" placeholder="输入你的学号" max=10 ></x-input>
      <x-input title="密码" v-model="password" placeholder="密码简单点就行" type="password"></x-input>
      <x-input title="邮箱" v-model="email" ref="email" placeholder="请输入邮箱" is-type="email"></x-input>
      <divider></divider>
      <x-button type="primary" :disabled="is_inrule" @click.native="register">注册</x-button>
    </group>
    <toast v-model="toast_show" type="cancel">邮箱已被使用</toast>
  </div>
</template>

<script>
import { Group, XInput, Tab, TabItem, XButton, Divider, XHeader, AjaxPlugin,Toast } from 'vux'

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
    Toast
  },
  data () {
    return {
      is_inrule: "true",
      msg: '请先注册',
      username : "",
      password : "",
      email : "",
      toast_show: false,
      link_url: '',
      is_en : function ( text ) {
        const is_cn_patten = new RegExp("[\u4e00-\u9fa5]")
        const is_en_num = /[`~!@#$%^&*+<>{}()\/'[\]]/im;
        if ( is_cn_patten.test( text ) || is_en_num.test( text ) ) {
          return {
            valid : false,
            msg : "有中文或特殊字符"
          }
        }
        return {
          valid : true
        }
      }
    }
  },
  methods: {
    update_register_info : function () {
      this.link_url = '/validate_email/username/'+this.username+'/password/'+this.password+'/email/'+this.email
      if(this.$refs.username.value.length > 0 && this.$refs.email.value.length > 0 &&
          this.$refs.username.valid && this.$refs.email.valid)
        this.is_inrule = false
      else
        this.is_inrule = true
    },
    register: function () {
      var state
      const url = "http://www.iimt.me/helpyou-server/sql_class/is_email_repeat.php?email=" + this.email
      AjaxPlugin.$http.get(url).then( (res) => {
        console.log(res.data)
        state = res.data? true:false
        this.toast_show = state
        if( !state )
          this.$router.push(this.link_url)
        else{
          this.email = ""
          this.toast_show = true
        }
      })
    }
  },
  watch: {
    username: function() {
      this.update_register_info()
    },
    password: function() {
      this.update_register_info()
    },
    email: function() {
      this.update_register_info()
    },
  }
}
</script>

<style>
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px
}
</style>