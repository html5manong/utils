
/*
 * @file 签名校验
 * @author:wyw
 */
const md5 = require('js-md5');

module.exports =  {

	httpSign: function (originalURL, params, signData = null, appKey, appSecret) {
		const timestamp = new Date().getTime()
		const nonce = randomWord(30) // 长度30的随机字符串
		let queryString = '' // 固定字符串
		let bodyString = '' // body参数拼接字符串
		let sign = '' // md5加密后的queryString+bodyString
		for (let key in params) {
		   if (params[key] == undefined) delete params[key]
		}
		const queryStringObj = { appKey, nonce, timestamp }
		const queryStringObjKeys = Object.keys(queryStringObj).sort()
		for (const item in queryStringObjKeys) {
		  const key = queryStringObjKeys[item]
		  queryString += `${key}=${decodeURIComponent(queryStringObj[key])}&`
		}
		queryString = queryString.substring(0, queryString.length - 1) // 去除最后的&
		if (params instanceof FormData) {
		  bodyString = ''
		} else if (params && JSON.stringify(params) !== '{}') {
		  bodyString = processBodydata(params)
		}
		if (signData) {
		  if (bodyString) {
			bodyString = bodyString + '&' + processBodydata(signData)
		  } else {
			bodyString = processBodydata(signData)
		  }
		}
		sign = queryString + '&sign=' + md5(queryString + bodyString + appSecret)
		const resultURL = originalURL + (originalURL.indexOf('?') >= 0 ? '&' : '?') + sign
		return resultURL
	}
};
function processBodydata(params) {
  let bodyString = ''
  const copyParams = Object.assign({}, params)
  for (const item in copyParams) {
    const val = copyParams[item]
    if (val instanceof File) {
      delete copyParams[item]
    }
    if (val instanceof FormData) {
      delete copyParams[item]
    }
    const type = Object.prototype.toString.call(val)
    if (type === '[object Array]' || type === '[object Object]') {
      copyParams[item] = JSON.stringify(val)
    } else if (val == null || val === undefined || val === '') {
      copyParams[item] = ''
    }
  }
  const paramsKeys = Object.keys(copyParams).sort()
  for (const item in paramsKeys) {
    const key = paramsKeys[item]
    bodyString += `${key}=${copyParams[key]}&`
  }
  bodyString = bodyString.substring(0, bodyString.length - 1) // 去除最后的&
  return bodyString
}
function randomWord (charNum) {
  var str = ''
  var range = charNum
  var arr = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z'
  ]
  for (var i = 0; i < range; i++) {
    var pos = Math.round(Math.random() * (arr.length - 1))
    str += arr[pos]
  }
  return str
}

