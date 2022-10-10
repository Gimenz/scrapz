const axios = require('axios')
const { JSDOM } = require('jsdom');



async function kataGaul(q) {
    const res = await axios.get('https://www.bahasadaring.com/arti-kata?kata=' + encodeURIComponent(q))
    const dom = new JSDOM(res.data).window.document
    const selected = dom.querySelector('div.jarak > div.row.mt-3')
    let result = {
        status: false,
        words: []
    }
    if (selected.querySelector('div.card-body').textContent.match(/Waduh! Kata (.+?) tidak ada/g)) return (result);

    const list = selected.querySelectorAll('div.col-lg-7 > div')
    let words = []
    for (let i of list) {
        const author = i.querySelector('div > div:nth-child(5) > small')
        words.push({
            word: i.querySelector('div > div.row > div.col-10 > h5 > a').textContent,
            topWord: i.querySelector('div > div.row > div.col-10 > h5 > span') !== null,
            meaning: i.querySelector('div > p:nth-child(2)').textContent.trim(),
            example: i.querySelector('div > p:nth-child(3) > i').innerHTML.replace(/<br>/g, '\n'),
            can_be_found_at: i.querySelector('div > small').textContent.replace('Sering ditemui di:', '').trim(),
            author: {
                name: /<a href="(.+?)" class="link">/g.test(author.innerHTML) ? /<a href=".+?" class="link">(.+?)<\/a>/g.exec(author.innerHTML)[1] : 'anonim',
                link: /<a href="(.+?)" class="link">/g.test(author.innerHTML) ? author.querySelector('a').getAttribute('href') : null
            },
            posted_at: /pada (.+?)\n/g.exec(author.textContent)[1].trim(),
            agree: i.querySelector('div > span:nth-child(8)').textContent.trim(),
            disagree: i.querySelector('div > span:nth-child(10)').textContent.trim(),
        })
    }
    return {
        status: true,
        words
    }
}

kataGaul('gabut').then(console.log)