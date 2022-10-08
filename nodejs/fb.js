const axios = require("axios")

async function fb2(url) {
const {data} = await axios('https://ssyoutube.com/api/convert', {method: "POST", data: `url=${url}`})
console.log(data)
return data
}

fb2("https://www.facebook.com/100009434116283/videos/1057351074965829")
