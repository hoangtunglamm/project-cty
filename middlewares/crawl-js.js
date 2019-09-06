let Crawler = require('js-crawler');
let fs = require('fs');
const cheerio = require('cheerio');

let crawler = new Crawler().configure({ ignoreRelative: false, depth: 3 });

let link = fs.readFileSync('./index.txt', 'utf-8');
let lst = link.split('\n');

lst.forEach((value, index, lst) => {
    crawler.crawl({
        url: value,
        success: (page) => {
            let $ = cheerio.load(page.body);
            let info = $('div.tbnow-info').text();


            if (info) {
                $('img').each((index, element) => {

                    console.log(element.attribs.src);

                })
                console.log(info + '\n\n\n');
            }
        },
        failure: (page) => {
            console.log(page.status);
        },
        finished: (crawledUrls) => {
            console.log(crawledUrls);
        },
    });
});