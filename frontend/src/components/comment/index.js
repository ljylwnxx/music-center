export const toTopAnimation = (target, scrollDom, ms = 500) => {
  let start
  let begin = scrollDom.scrollTop
  let size = (begin - target) / ms
  const step = (timestamp) => {
    if (start === undefined) start = timestamp
    const elapsed = timestamp - start
    /* 防止上滑过头 */
    scrollDom.scrollTop = Math.max(begin - size * elapsed, target)
    if (elapsed < ms) {
      // 在ms毫秒后停止动画
      window.requestAnimationFrame(step)
    }
  }
  window.requestAnimationFrame(step)
}
