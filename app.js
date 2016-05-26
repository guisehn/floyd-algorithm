var _ = require('lodash')

function floyd(d) {
  var s = mountFirstS(d.length)

  for (var i = 0; i < d.length; i++) {
    if (i > 0) {
      var nextD = mountNextD(d, i - 1)
      s = mountNextS(d, nextD, s, i)
      d = nextD
    }

    console.log('Iteration ' + i)
    console.log('----------')

    console.log('D' + i + ':')
    printSquare(d)

    console.log('S' + i + ':')
    printSquare(s)

    console.log()
  }
}

function printSquare(v) {
  var str = ''

  for (var i = 0; i < v.length; i++) {
    for (var j = 0; j < v.length; j++) {
      switch (v[i][j]) {
        case Infinity:
          str += '∞'
          break

        case 0:
          str += '-'
          break

        default:
          str += v[i][j]
      }

      str += '\t'
    }

    str += '\n'
  }

  console.log(str)
}

function mountFirstS(size) {
  var s = []

  for (var i = 0; i < size; i++) {
    s[i] = []

    for (var j = 0; j < size; j++) {
      s[i][j] = i == j ? 0 : j + 1
    }
  }

  return s
}

function mountNextD(v, n) {
  v = _.cloneDeep(v)

  for (var i = 0; i < v.length; i++) {
    for (var j = 0; j < v.length; j++) {
      if (i === n || j === n) {
        continue
      }

      var compare = v[n][j] + v[i][n]

      if (v[i][j] > compare) {
        v[i][j] = compare
      }
    }
  }

  return v
}

function mountNextS(v1, v2, s, n) {
  s = _.cloneDeep(s)

  for (var i = 0; i < v1.length; i++) {
    for (var j = 0; j < v2.length; j++) {
      if (v1[i][j] !== v2[i][j]) {
        s[i][j] = n
      }
    }
  }

  return s
}

/*floyd([
  [0, 3, 10, Infinity, Infinity],
  [3, 0, Infinity, 5, Infinity],
  [10, Infinity, 0, 6, 15],
  [Infinity, 5, 6, 0, 4],
  [Infinity, Infinity, Infinity, 4, 0]
])*/

floyd([
  [0,5,3,Infinity,Infinity,Infinity,Infinity],
  [5,0,1,5,2,Infinity,Infinity],
  [3,1,0,7,Infinity,Infinity,12],
  [Infinity,5,7,0,3,Infinity,3],
  [Infinity,2,Infinity,3,0,1,Infinity],
  [Infinity,Infinity,Infinity,1,1,0,Infinity],
  [Infinity,Infinity,12,3,Infinity,4,0]
])