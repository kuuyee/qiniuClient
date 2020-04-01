<style lang="scss" scoped>
@import "../style/params";
@import "./login/login.less";

.layout {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.title {
  width: 100%;
  text-align: center;
  padding: 10px;
}

.table {
  width: 60%;
}

.buttons {
  margin-top: 50px;
}

.item {
  padding: 5px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;

  .name {
    font-size: 14px;
    margin-left: 20px;
  }

  .long {
    flex-grow: 1;
  }

  &:nth-child(2n) {
    background-color: $bg-item-selected;
  }

  &:hover {
    background: rgba(28, 36, 56, 0.2);
  }
}
</style>
<style>
.ivu-select-dropdown {
  max-height: 100px;
}
</style>
<template>
  <div class="layout drag">
    <Tabs v-model="tabName" class="no-drag table" type="card" ref="tabs" @on-click="onTabClick">
      <TabPane :disabled="!(this.coses && this.coses.length > 0)" name="已登录" label="已登录">
        <div class="item" v-for="(item,index) in this.coses" :key="index" @click="openCOS(item)">
          <span :class="`iconfont icon-${item.key}`" style="font-size: 20px"></span>
          <span class="name long">{{item.name}}</span>
          <Icon type="ios-trash-outline" size="20" @click.stop="removeCOS(item)" />
        </div>
      </TabPane>
      <TabPane name="username" label="GoMK企业云盘">
        <div class="login">
          <Row type="flex" justify="center" align="middle" @keydown.enter.native="submitLogin">
            <Col style="width: 368px;">
              <Form
                ref="usernameLoginForm"
                :model="form"
                :rules="rules"
                class="form"
                v-if="tabName=='username'"
              >
                <FormItem prop="username">
                  <Input
                    v-model="form.username"
                    prefix="ios-contact"
                    size="large"
                    clearable
                    placeholder="请输入用户名"
                    autocomplete="off"
                  />
                </FormItem>
                <FormItem prop="password">
                  <Input
                    type="password"
                    v-model="form.password"
                    prefix="ios-lock"
                    size="large"
                    password
                    placeholder="请输入密码"
                    autocomplete="off"
                  />
                </FormItem>

                <FormItem prop="imgCode">
                  <Row
                    type="flex"
                    justify="space-between"
                    style="align-items: center;overflow: hidden;"
                  >
                    <Input
                      v-model="form.imgCode"
                      size="large"
                      clearable
                      placeholder="请输入图片验证码"
                      :maxlength="10"
                      class="input-verify"
                    />
                    <div style="position:relative;font-size:12px">
                      <Spin v-if="loadingCaptcha" fix></Spin>
                      <img
                        :src="captchaImg"
                        @click="getCaptchaImg"
                        alt="加载验证码失败"
                        style="width:110px;cursor:pointer;display:block"
                      />
                    </div>
                  </Row>
                </FormItem>
              </Form>
              <Row>
                <Button
                  class="login-btn"
                  type="primary"
                  size="large"
                  :loading="loading"
                  @click="submitLogin"
                  long
                >
                  <span v-if="!loading">{{ $t('login') }}</span>
                  <span v-else>{{ $t('logining') }}</span>
                </Button>
              </Row>
            </Col>
            <!--国际化切换-->
          </Row>
        </div>
      </TabPane>
      <TabPane v-for="(item) in brands" :key="item.key" :name="item.key" :label="item.name">
        <h3 class="title">设置{{item.name}}密钥</h3>
        <Form :model="formItem" :ref="item.key" :rules="ruleItem" :label-width="150">
          <template v-if="item.key === brands.upyun.key">
            <Form-item label="别名" prop="name">
              <Input v-model="formItem.name" placeholder="别名" />
            </Form-item>
            <Form-item label="服务名称" prop="service_name">
              <Input v-model="formItem.service_name" placeholder="请填入服务名称" />
            </Form-item>
            <Form-item label="操作员名" prop="access_key">
              <Input v-model="formItem.access_key" placeholder="请填入操作员名" />
            </Form-item>
            <Form-item label="操作员密码" prop="secret_key">
              <Input v-model="formItem.secret_key" placeholder="请填入操作员密码" />
            </Form-item>
          </template>
          <template v-else>
            <Form-item label="别名" prop="name">
              <Input v-model="formItem.name" placeholder="别名" />
            </Form-item>
            <Form-item label="ACCESS_KEY" prop="access_key">
              <Input v-model="formItem.access_key" placeholder="请填入你的ACCESS_KEY" />
            </Form-item>
            <Form-item label="SECRET_KEY" prop="secret_key">
              <Input v-model="formItem.secret_key" placeholder="请填入你的SECRET_KEY" />
            </Form-item>
            <Form-item label="ENDPOINT" prop="endpoint" v-if="item.key === brands.minio.key">
              <Input v-model="formItem.endpoint" placeholder="请填入服务的endpoint" />
            </Form-item>
            <Form-item
              label="区域"
              prop="region"
              v-if="item.key === brands.aws.key || item.key === brands.jd.key"
            >
              <Select v-model="formItem.region">
                <Option
                  v-for="item in regions"
                  :value="item.region"
                  :key="item.region"
                >{{ item.name }}</Option>
              </Select>
            </Form-item>
            <Form-item label="内网访问" prop="internal" v-if="item.key === brands.aliyun.key">
              <i-switch v-model="formItem.internal" />
            </Form-item>
          </template>

          <Form-item>
            <div class="buttons">
              <Button type="primary" @click="handleSubmit(item.key)">设置</Button>
              <Button @click="handleReset(item.key)" style="margin-left: 8px">重置</Button>
            </div>
          </Form-item>
          <div style="margin-left: 150px">
            ＊如何获取密钥信息:登录
            <template v-if="item.key === brands.qiniu.key">
              <a @click="openBrowser('https://portal.qiniu.com/user/key')">{{item.name}}</a>->个人面板->密钥管理
            </template>
            <template v-else-if="item.key === brands.tencent.key">
              <a @click="openBrowser('https://console.cloud.tencent.com/cos5')">{{item.name}}</a>->密钥管理
            </template>
            <template v-else-if="item.key === brands.qingstor.key">
              <a @click="openBrowser('https://console.qingcloud.com/')">{{item.name}}</a>->头像->API密钥
            </template>
            <template v-else-if="item.key === brands.aliyun.key">
              <a @click="openBrowser('https://oss.console.aliyun.com/')">{{item.name}}</a>->Access
              Key
            </template>
            <template v-else-if="item.key === brands.upyun.key">
              <a @click="openBrowser('https://console.upyun.com/dashboard/')">{{item.name}}</a>->Access
              Key
            </template>
          </div>
        </Form>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import * as types from "../vuex/mutation-types";
import * as storagePromise from '../service/storagePromise';
import { login, initCaptcha, drawCodeImage } from "../api/index";
import { validateMobile } from "../libs/validate";
import { Constants, mixins, util } from "../service";
import brand from "@/cos/brand";
import Regions from "@/cos/Regions";

export default {
  mixins: [mixins.base],
  data() {
    return {
      captchaId: "",
      captchaImg: "",
      loadingCaptcha: true,
      tabName: "username",
      loading: false,
      form: {
        username: "test",
        password: "123456",
        mobile: "阿里云短信0.045/条 若余额不足联系作者充值",
        code: ""
      },
      rules: {
        username: [
          {
            required: true,
            message: "账号不能为空",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空且不能少于6位",
            min: 6,
            trigger: "blur"
          }
        ],
        imgCode: [
          {
            required: true,
            message: "验证码不能为空",
            trigger: "blur"
          }
        ],
        mobile: [
          {
            required: true,
            message: "手机号不能为空",
            trigger: "blur"
          },
          {
            validator: validateMobile,
            trigger: "blur"
          }
        ]
      },

      selectBrand: brand.qiniu,
      formItem: {
        service_name: "",
        access_key: "",
        secret_key: "",
        region: "",
        endpoint: "",
        internal: false,
        name: ""
      },
      ruleItem: {
        access_key: [
          { required: true, message: "access_key不能为空", trigger: "blur" }
        ],
        secret_key: [
          { required: true, message: "secret_key不能为空", trigger: "blur" }
        ],
        region: [
          { required: true, message: "region不能为空", trigger: "blur" }
        ],
        service_name: [
          { required: true, message: "service_name不能为空", trigger: "blur" }
        ]
      },
      brands: brand,
      coses: [],
      regions: []
    };
  },
  computed: {},
  created: function() {
    this.getCOS();
    this.handleReset();
  },
  mounted() {
    this.getCaptchaImg(); //默认初始化加载验证码
  },
  methods: {
     ...mapActions([types.app.access_token]),
    //获取验证码图片
    getCaptchaImg() {
      this.loadingCaptcha = true;
      initCaptcha().then(res => {
        console.log(res);
        this.loadingCaptcha = false;
        if (res.success) {
          this.captchaId = res.result;
          this.captchaImg = drawCodeImage + this.captchaId;
        }
      });
    },
    //gomk登录提交
    submitLogin() {
      if (this.tabName == "username") {
        console.log(this.tabName);
        //默认账号密码登录
        this.$refs.usernameLoginForm.validate(valid => {
          if (valid) {
            this.loading = true;
            login({
              username: this.form.username,
              password: this.form.password,
              code: this.form.imgCode,
              captchaId: this.captchaId,
              saveLogin: this.saveLogin
            }).then(res => {
              if (res.success) {
                //this.afterLogin(res);
                this[types.app.access_token](res.result);
                this.$storage.setAccesstoken(res.result)
                this.$router.push({
                  name: Constants.PageName.netdisk,
                });
              } else {
                this.loading = false;
                this.getCaptchaImg();
              }
            });
          }
        });
      } else if (this.tabName == "mobile") {
        this.$refs.mobileLoginForm.validate(valid => {
          if (valid) {
            if (this.form.code == "") {
              this.errorCode = "验证码不能为空";
              return;
            } else {
              this.errorCode = "";
            }
            this.loading = true;
            this.form.saveLogin = this.saveLogin;
            smsLogin(this.form).then(res => {
              if (res.success) {
                console.log(res);
                this.afterLogin(res);
              } else {
                this.loading = false;
              }
            });
          }
        });
      }
    },

    onTabClick(key) {
      if (key !== "已登录") {
        this.selectBrand = this.brands[key];
        this.handleReset();
      }
      if (key === this.brands.aws.key) {
        this.regions = Regions.s3;
      } else if (key === this.brands.jd.key) {
        this.regions = Regions.jd;
      }
    },
    handleSubmit(key) {
      if (key !== brand.upyun.key) {
        this.formItem.service_name = "-";
      }
      this.$refs[key][0].validate(valid => {
        if (valid) {
          this.validateKey();
        } else {
          console.log("表单不能提交");
        }
      });
    },
    handleReset() {
      this.formItem = this.$options.data().formItem;
      this.formItem.name = this.selectBrand.name;
    },
    validateKey() {
      let item = Object.assign(
        {
          key: this.selectBrand.key
        },
        this.formItem
      );

      this.$storage.initCOS(item);
      this.$storage.getBuckets(error => {
        if (error) {
          util.notification({
            title: this.selectBrand.name,
            body: error.message
          });
        } else {
          this.$storage.saveCosKey(item, () => {
            this.openCOS(item);
          });
        }
      });
    },
    openCOS(item) {
      this.$router.push({
        name: Constants.PageName.main,
        params: { cos: item }
      });
    },
    removeCOS(item) {
      this.$storage.cleanCosKey(item, () => {
        this.getCOS();
      });
    },
    getCOS() {
      this.$storage.getBindCoses(({ coses }) => {
        this.coses = coses;
        if (this.coses.length === 0) {
          this.$refs["tabs"].activeKey = this.$refs["tabs"].getTabs()[1].name;
        }
      });
    },
    openBrowser(url) {
      this.$electron.shell.openExternal(url);
    }
  }
};
</script>
