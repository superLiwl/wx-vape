// 引入腾讯地图SDK核心类
var QQMapWX = require('../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


module.exports = {
  formatTime: formatTime,
  // 一维数组转二维数组
  listToMatrix(list, elementsPerSubArray) {
    let matrix = [], i, k;

    for (i = 0, k = -1; i < list.length; i += 1) {
      if (i % elementsPerSubArray === 0) {
        k += 1;
        matrix[k] = [];
      }

      matrix[k].push(list[i]);
    }

    return matrix;
  },

}
