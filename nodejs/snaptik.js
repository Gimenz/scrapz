const axios = require('axios');

async function tikmateApp(url) {
    const { data } = await axios.post('https://api.tikmate.app/api/lookup',
        'url=' + encodeURIComponent(url),
        {
            headers: {
                referer: 'https://tikmate.app',
            }
        })
    return {
        ...data,
        videoUrl: `https://tikmate.app/download/${data.token}/${data.id}.mp4`,
        videoUrlHd: `https://tikmate.app/download/${data.token}/${data.id}.mp4?hd=1`,
    }
}

tikmateApp('https://www.tiktok.com/@apsiiiiii1/video/7150569401257839899?is_from_webapp=1&sender_device=pc').then(console.log)