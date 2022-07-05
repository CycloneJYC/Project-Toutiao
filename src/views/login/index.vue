<template>
 <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录" />
    <!-- /导航栏 -->

    <!-- 登录表单 -->
    <van-form @submit="onSubmit" ref='form'>
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
        required
      >
      <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="验证码"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
        required
      >
       <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-count-down :time="time" v-if="isShowCountDown" @finish="isShowCountDown=false" format="ss 后重试"/>
          <van-button :loading="isDisable" class="send-sms-btn" round size="midel" type="default" @click="sendCode" v-else>发送验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
    <!-- /登录表单 -->
  </div>
</template>
<script>
import { login, getSmsCode } from '@/api/user.js'
import { Toast } from 'vant'
export default {
  name: 'LoginIndex',
  data () {
    return {
      isDisable: false,
      isShowCountDown: false,
      time: 5000,
      user: {
        mobile: '13911111112', // 手机号
        code: '' // 验证码
      },
      userFormRules: {
        mobile: [{
          // require 是否为必填项
          required: true,
          // 如果不满足条件则跳出message
          message: '手机号不能为空'
        }, {
          pattern: /^1[3|5|7|8]\d{9}$/,
          message: '手机号格式错误'
        }],
        code: [{
          required: true,
          message: '验证码不能为空'
        }, {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }]
      }
    }
  },
  methods: {
    async onSubmit () {
      // value 自动从表单里面获取的值
      // --获取到的值是对象： key(表单的name值), value(用户输入的值)
      // 捕获await的错误，用try catch
      try {
        const res = await login(this.user)
        console.log(res)
        // Toast Vant中的提示组件
        Toast.success('登录成功')
      } catch (e) {
        console.log(e)
        Toast.fail(e?.response?.data?.message || '服务器端错误')
      }
    },
    async sendCode () {
      try {
        // 点击验证码 校验手机号码，校验通过时进行发送请求
        await this.$refs.form.validate('mobile')
      } catch (e) {
        // 校验失败时，捕捉错误，并终止函数
        console.log(e)
        return
      }

      try {
        // 开始请求时，把发送验证码按钮设置为不可点击状态
        this.isDisable = true
        await getSmsCode(this.user.mobile)
        // 验证码发送成功开启倒计时
        this.isShowCountDown = true
        Toast.success('验证码发送成功')
      } catch (err) {
        // console.log(err)
        Toast.fail(err?.response?.data?.message || '系统错误')
        this.isShowCountDown = false
      } finally {
        // 发送完请求后，把发送验证码按钮设置为可点击状态
        this.isDisable = false
      }
    }
  }
}
</script>
<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 160px;
    height: 50px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
