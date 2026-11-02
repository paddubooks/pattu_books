import fs from 'node:fs';
const root='public/learn';
const catalogue=JSON.parse(fs.readFileSync(`${root}/catalogue.json`,'utf8'));
fs.mkdirSync(`${root}/topic-assets`,{recursive:true});
const topics=catalogue.topics.map(topic=>{
 const assetManifest=`/learn/topic-assets/${topic.code}.json`;
 fs.writeFileSync(`public${assetManifest}`,JSON.stringify({schemaVersion:1,assets:topic.assets}));
 return {...topic,assets:[],assetManifest};
});
fs.writeFileSync(`${root}/catalogue-summary.json`,JSON.stringify({...catalogue,topics}));
console.log('Prepared lightweight catalogue; offline file lists load on demand.');
