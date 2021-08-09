export function debounce(fn ,delay) {
  let timeId = null;
  return (function () {
    const context = this;
    let args = arguments
    if (timeId) {
      clearTimeout(timeId)
    }
    timeId = setTimeout(() => {
      console.log('debounce我的防抖技术你真的用了吗！！！');  
      fn.apply(context, args)
    }, delay);
  })();
}