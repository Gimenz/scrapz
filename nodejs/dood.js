const axios = require('axios');

async function dood(url) {
    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.41 Safari/537.36',
        'Referer': url
    }
    if (!/\.(so|sh)\//.test(url)) {
        url = url.replace(/\.(.*?)\//, '.so/');
    }
    const baseURL = new URL(url).origin
    if (!/\/(e|f)\//.test(url)) {
        const get_iframe = await axios.get(url, { headers })
        const iframe = baseURL + /<iframe src="(.*?)"/.exec(get_iframe.data)[1]
        url = iframe
    } else if (/\/f\//.test(url)) {
        const get_single = await axios.get(url, { headers })
        const regexp = /"(https:\/\/dood\.(.*?)\/(.*?)\/(.*?))"/g;
        const str = get_single.data;
        const all_single = [...str.matchAll(regexp)].map(x => {
            return x[1]
        })
        url = all_single
    }
    const get_md5 = await axios.get(url, { headers })

    let pass_md5 = '/pass_md5/' + /\$\.get\('\/pass_md5\/(.*?)',/.exec(get_md5.data)[1]
    const token = pass_md5.slice(pass_md5.lastIndexOf('/')).substring(1)
    const md5 = await axios.get(baseURL + pass_md5, { headers })

    // from dood.to
    function makePlay(token) {
        for (var a = "", t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", n = t.length, o = 0; 10 > o; o++) a += t.charAt(Math.floor(Math.random() * n));
        return a + "?token=" + token + "&expiry=" + Date.now();
    };

    const media_url = md5.data + makePlay(token)
    console.log(media_url);
}

dood('https://dood.so/e/f35jc5caufb9')