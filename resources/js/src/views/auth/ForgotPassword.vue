<template>
    <div class="login-container">
        <el-form ref="forgotPassword" :model="forgotPassword" :rules="forgotPasswordRules" class="login-form" auto-complete="on"
                 label-position="left">

            <div class="title-container">
                <h3 class="title">Forgot Password</h3>
            </div>

            <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user"/>
        </span>
                <el-input
                    ref="email"
                    v-model="forgotPassword.email"
                    placeholder="Enter Email Address"
                    name="email"
                    type="email"
                    tabindex="1"
                    auto-complete="on"
                />
            </el-form-item>

            <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;"
                       @click.native.prevent="handleForgotPassword">Send Reset Password Link
            </el-button>
            <el-link type="warning" href="/#/login">Back To Login</el-link>
        </el-form>
    </div>
</template>

<script>
    import {validEmail} from '../../utils/validate'
    import {requestForgotPasswordEmail} from "../../api/user";
    import {  Message } from 'element-ui'

    export default {
        name: 'ForgotPassword',
        data() {
            const validateUsername = (rule, value, callback) => {
                if (!validEmail(value)) {
                    callback(new Error('Please enter the Email Address'))
                } else {
                    callback()
                }
            }
            return {
                forgotPassword: {
                    email: '',
                },
                forgotPasswordRules: {
                    email: [{required: true, trigger: 'blur', validator: validateUsername}],
                },
                loading: false,
                redirect: undefined
            }
        },
        watch: {
            $route: {
                handler: function (route) {
                    this.redirect = route.query && route.query.redirect
                },
                immediate: true
            }
        },
        methods: {
            handleForgotPassword() {
                this.$refs.forgotPassword.validate(valid => {
                    if (valid) {
                        this.loading = true
                        requestForgotPasswordEmail(this.forgotPassword).then(response => {
                            this.loading = false;
                            Message.success('Please Check Your Email For Reset Link');
                        }).catch(error => {
                            Message.error(error.response.data.errors.email[0]);
                            this.loading =false;
                        });
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
    /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

    $bg: #283443;
    $light_gray: #fff;
    $cursor: #fff;

    @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
        .login-container .el-input input {
            color: $cursor;
        }
    }

    /* reset element-ui css */
    .login-container {
        .el-input {
            display: inline-block;
            height: 47px;
            width: 85%;

            input {
                background: transparent;
                border: 0px;
                -webkit-appearance: none;
                border-radius: 0px;
                padding: 12px 5px 12px 15px;
                color: $light_gray;
                height: 47px;
                caret-color: $cursor;

                &:-webkit-autofill {
                    box-shadow: 0 0 0px 1000px $bg inset !important;
                    -webkit-text-fill-color: $cursor !important;
                }
            }
        }

        .el-form-item {
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            color: #454545;
        }
    }
</style>

<style lang="scss" scoped>
    $bg: #2d3a4b;
    $dark_gray: #889aa4;
    $light_gray: #eee;

    .login-container {
        min-height: 100%;
        width: 100%;
        background-color: $bg;
        overflow: hidden;

        .login-form {
            position: relative;
            width: 520px;
            max-width: 100%;
            padding: 160px 35px 0;
            margin: 0 auto;
            overflow: hidden;
        }

        .tips {
            font-size: 14px;
            color: #fff;
            margin-bottom: 10px;

            span {
                &:first-of-type {
                    margin-right: 16px;
                }
            }
        }

        .svg-container {
            padding: 6px 5px 6px 15px;
            color: $dark_gray;
            vertical-align: middle;
            width: 30px;
            display: inline-block;
        }

        .title-container {
            position: relative;

            .title {
                font-size: 26px;
                color: $light_gray;
                margin: 0px auto 40px auto;
                text-align: center;
                font-weight: bold;
            }
        }

        .show-pwd {
            position: absolute;
            right: 10px;
            top: 7px;
            font-size: 16px;
            color: $dark_gray;
            cursor: pointer;
            user-select: none;
        }
    }
</style>
