/**
 * 登出google账号的接口
 * 需要放在用户手动操作的地方，比如说点击事件里边
 * @note: 需要加载auth2模块
 * @export
 */
export function gapiSignOut() {
  // 我们使用gapi.load指定了auth2
  // @ts-ignore
  gapi.auth2 && gapi.auth2.getAuthInstance().signOut();
}
