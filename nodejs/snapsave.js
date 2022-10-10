const axios = require('axios');
const { JSDOM } = require('jsdom')

async function snapsave(url) {
    const { data } = await axios.post(
        'https://snapsave.app/action.php',
        'url=' + encodeURIComponent(url),
        {
            headers: {
                referer: 'https://snapsave.app'
            }
        })
    const script = data.split(/<script type=".+?">(.*?)<\/script>/)[1]
    const fun = script.split('}(')[1].replace(/"/g, '').split(')')[0].split(',')
    const decoded = decode(...fun).split('</style>')[1].split('";')[0]
    let dom = new JSDOM(decoded).window.document
    let list = [...dom.querySelectorAll('table > tbody > tr')].filter(x => x.querySelector('td > a'))
    return {
        videoUrl: list[0].querySelector('td > a').href.replace(/\\|"/g, ''),
    }
}

function x(d, e, f) {
    const g = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/'.split('')
    const h = g.slice(0, e)
    const i = g.slice(0, f)
    let j = d.split('').reverse().reduce(function (a, b, c) {
        if (h.indexOf(b) !== -1) return a += h.indexOf(b) * (Math.pow(e, c))
    }, 0)
    let k = ''
    while (j > 0) {
        k = i[j % f] + k
        j = (j - (j % f)) / f
    }
    return k || '0'
}

function decode(h, u, n, t, e, r) {
    r = ''
    for (let i = 0, len = h.length; i < len; i++) {
        let s = ''
        while (h[i] !== n[e]) {
            s += h[i]
            i++
        }
        for (let j = 0; j < n.length; j++) {
            s = s.replace(new RegExp(n[j], 'g'), j.toString())
        }
        r += String.fromCharCode((x(s, e, 10) - t))
    }
    return decodeURIComponent(encodeURIComponent(r))
}


snapsave('https://www.facebook.com/reel/1520888021721238/?s=single_unit').then(console.log)
