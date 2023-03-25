import { httpGet } from '@/utils/axios.js'
// 手机密码登录
export const doPhoneLogin = ({ phone, md5_password, captcha }) => httpGet('/api/login/cellphone', { phone, md5_password, captcha })

// 二维码登录
// 获取二维码key
export const getQrCodeKey = () => httpGet('/api/login/qr/key')
// 生成二维码
export const createQrCode = (key, qrimg = true) => httpGet('/api/login/qr/create', {key, qrimg})
// 轮询检查二维码状态
export const checkQrCode = (key) => httpGet('/api/login/qr/check', {key})

// 验证码登录
// 获取验证码
export const getVerificationCode = (phone) => httpGet('/api/captcha/sent', { phone })
// 验证验证码
export const testVerificationCode = ({ phone, captcha }) => httpGet('/api/captcha/verify', { phone, captcha })

// 刷新登录状态
export const refreshLoginStatus = () => httpGet('/api/login/refresh')