import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';
const source=path.resolve(process.argv[2]||'../contentss');if(!fs.existsSync(path.join(source,'data/catalogue.json')))throw Error('Pass the source contentss directory as an argument.');
const raw=JSON.parse(fs.readFileSync(path.join(source,'data/catalogue.json'),'utf8'));const version=crypto.createHash('sha256').update(JSON.stringify(raw)+'learn-import-v2').digest('hex').slice(0,12);
const corrections=[];
// The three source activities repeat complete rounds. Keep their first valid sets,
// replace only repeats with distinct combinations of existing, valid question cards.
for(const a of raw.activities.filter(a=>['MATH-K-024','MATH-K-104','MATH-K-118'].includes(a.id))){const seen=new Set();const pool=[...new Map(a.questions.flatMap(q=>q.cards).map(q=>[String(q.answer),q])).values()];for(const q of a.questions){let key=JSON.stringify(q.cards.map(c=>c.answer));if(!seen.has(key)){seen.add(key);continue;}const count=q.cards.length;let cards;for(let n=0;n<pool.length**count;n++){cards=Array.from({length:count},(_,i)=>pool[Math.floor(n/pool.length**i)%pool.length]);key=JSON.stringify(cards.map(c=>c.answer));if(!seen.has(key))break;}q.cards=cards.map((c,i)=>({...structuredClone(c),id:q.id+'-replacement-'+(i+1)}));q.answer=q.cards.map(c=>c.answer);seen.add(key);corrections.push({activityId:a.id,questionId:q.id,change:'Replaced duplicate round with a distinct combination of existing valid cards; stable top-level ID retained.'});}}
const out='public/learn';fs.mkdirSync(out+'/data',{recursive:true});fs.mkdirSync('doc/reports',{recursive:true});
const slug=s=>s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/-$/,'');
function explanation(q,a){const p=q.prompt;let steps=[];const numbers=(p.match(/\d+/g)||[]).map(Number);const ans=Array.isArray(q.answer)?q.answer.join(', '):q.answer;
 if(q.cards) return q.cards.flatMap((c,i)=>[`Card ${i+1}: ${c.prompt}`,...explanation(c,a)]);
 const arithmetic=p.match(/(\d+)\s*([+−-])\s*(\d+)\s*=\s*\?/);const gap=p.match(/(\d+)\s*\+\s*\?\s*=\s*(\d+)/);
 if(arithmetic){const [,x,op,y]=arithmetic;steps=[`Start with ${x}.`,op==='+'?`Add ${y} more. Count all the objects together.`:`Take away ${y}. Count only the objects left.`,`${x} ${op} ${y} = ${op==='+'?+x + +y:+x - +y}.`];}
 else if(gap)steps=[`The whole group has ${gap[2]}.`,`We already have ${gap[1]}. Count on to ${gap[2]}.`,`We need ${+gap[2]-+gap[1]} more.`];
 else if(/apples are in a bowl/.test(p)){const [x,y]=numbers;const subtract=/taken out/.test(p);steps=[`Start with ${x} apples.`,subtract?`Take away ${y} apples.`:`Put in ${y} more apples.`,`${x} ${subtract?'−':'+'} ${y} = ${subtract?x-y:x+y}. Count ${subtract?'the apples left':'all the apples'}.`];}
 else if(/one more|one less/.test(p))steps=[`Start at ${numbers[0]}.`,`Move one step ${/one more/.test(p)?'forward':'back'} on the number line.`,`You reach ${ans}.`];
 else if(q.mode==='buildpair')steps=[`Make ${q.answer[0]} apples in group A.`,`Make ${q.answer[1]} leaves in group B.`,`Count each group separately to check.`];
 else if(q.mode==='order')steps=['Find the smallest number first.','Choose the next smallest number each time.',`Read your row: ${ans}.`];
 else if(q.mode==='equation')steps=['Count the first group. Look for objects joining or being taken away.',`Use ${q.parts.includes('+')?'plus to join groups':'minus to take away'}.`,`The number sentence is ${q.parts.join(' ')}.`];
 else if(q.mode==='ordinal')steps=['Start with the object on the left.','Say first, second, third as you move along.',`Stop at position ${ans}.`];
 else if(q.audio)steps=['Press Listen and say the number you hear.','Look for the numeral that names the same number.'];
 else if(/pattern/i.test(a.topic))steps=['Read the pattern from left to right.','Find the little group that repeats. Say that group again.','Choose the next part of the repeating group.'];
 else if(/comparing/i.test(a.topic))steps=['Count group A. Then count group B.','Match one object in A to one in B.','A group with objects left over has more. Equal groups have the same number.'];
 else if(/Time/.test(a.topic))steps=/clock|time is/.test(p)?['The short hand tells the hour.','The long hand at 12 means o’clock. At 6 it means half past.',`Read the time: ${ans}.`]:['Think about what happens first in a day.','Put the events in the order they happen.'];
 else if(a.topic==='Money')steps=['These are United States coins. Look at the name and value.','A penny is 1 cent, nickel 5 cents, dime 10 cents, quarter 25 cents.','For a group of coins, add their values one at a time.'];
 else if(/Financial/.test(a.topic))steps=['Earning means doing work for pay. Saving means keeping money for later.','A need is something we must have. A want is something we would like.','Read the choices and find the one that fits the question.'];
 else if(/Measurement/.test(a.topic))steps=['Look at what we are comparing: length, height, weight or space.','For length, line up the starting ends. Compare where the other ends reach.','For a balance, the heavier side is lower. Count equal units without gaps.'];
 else if(/Fractions/.test(a.topic))steps=['Look at the whole shape.','Equal parts must have the same size. Count all the equal parts.','Two equal parts are halves. Four equal parts are quarters.'];
 else if(/shape/i.test(a.topic))steps=['Trace the edge of the shape with your finger.','Count straight sides and corners. Look for curved edges.','A triangle has 3 sides; a square has 4 equal sides; a circle is round. Solid shapes take up space.'];
 else if(/Classifying|Same and different/.test(a.topic))steps=['Look at one object at a time.','Check the rule: shape, colour or size.','Put together objects that follow the same rule.'];
 else if(/Data/.test(a.topic))steps=['Read each label on the graph.','Count the marks for each label.','Compare each count with the question.'];
 else if(/Positions/.test(a.topic))steps=['Find the object named in the question.','Look at where it is compared with the other object.','Say its position: above, below, beside, in front or behind.'];
 else if(/tens/.test(a.topic))steps=['Each full group has ten.','Count 10, 20, 30, adding ten for every group.','Count any extra ones after the tens.'];
 else if(/teen/i.test(a.topic))steps=['Find one full group of ten.','Count the extra ones.','Ten and the extra ones make the teen number.'];
 else if(/count|How many|group of/i.test(p))steps=['Touch each object once as you count.','Say one number for each object.','The last number tells how many. If there are no objects, the number is zero.'];
 else steps=['Read the number or listen to its name.','Say the counting numbers in order.','Match the numeral to the name or missing place.'];
 if(q.mode==='multi')steps.push('Check every choice. More than one can fit.');if(q.mode==='classify')steps.push('Check each answer against the rule and sort it into fits or does not fit.');return steps;
}
function answerText(q){if(q.mode==='equation')return q.parts.join(' ');const vals=Array.isArray(q.answer)?q.answer:[q.answer];return vals.map(v=>{const o=q.options?.find(o=>String(typeof o==='object'?o.label:o)===String(v));return typeof o==='object'?(o.accessible||o.text||o.label):String(v);}).join(', ');}
function refs(node,set=new Set()){if(!node||typeof node!=='object')return set;for(const [k,v]of Object.entries(node)){if(['image','itemImage','audio'].includes(k)&&typeof v==='string')set.add('/learn/'+v);else if(typeof v==='object')refs(v,set);}return set;}
const topics=raw.topics.map(t=>({...t,slug:slug(t.title),assets:[],activityIds:[]}));const activities=[];
for(const original of raw.activities){const topic=topics.find(t=>t.code===original.topicCode);const a={...original,topicSlug:topic.slug,subjectId:'maths',gradeId:'kindergarten',language:'en',ageRange:{min:4,max:6},schemaVersion:1,contentVersion:version,interactionType:original.questions[0].mode};
 const leaf=q=>q.mode==='rounds'?leaf(q.cards[0]):q;
 a.examples=a.questions.slice(0,3).map((q,i)=>({question:leaf(q),steps:explanation(leaf(q),a),answer:answerText(leaf(q)),tryQuestion:leaf(a.questions[(i+4)%a.questions.length])}));
 fs.writeFileSync(`${out}/data/${a.id}.json`,JSON.stringify(a));const allRefs=refs(a);topic.assets.push(`/learn/data/${a.id}.json`,...allRefs);topic.activityIds.push(a.id);const {questions,examples,...summary}=a;activities.push({...summary,questionCount:questions.length});
}
for(const t of topics)t.assets=[...new Set(t.assets)];
fs.writeFileSync(out+'/catalogue.json',JSON.stringify({schemaVersion:1,contentVersion:version,subjects:[{id:'maths',slug:'maths',title:'Maths'}],grades:[{id:'kindergarten',slug:'kindergarten',title:'Kindergarten',subjectId:'maths'}],topics,activities}));
for(const folder of ['images','data/audio'])fs.cpSync(path.join(source,folder),path.join(out,folder),{recursive:true});
fs.copyFileSync(path.join(source,'data/coverage.json'),'doc/reports/source-coverage.json');
fs.writeFileSync('doc/reports/corrections.json',JSON.stringify(corrections,null,2));
fs.writeFileSync('doc/reports/import.json',JSON.stringify({source,contentVersion:version,topics:topics.length,activities:activities.length,questions:raw.activities.reduce((n,a)=>n+a.questions.length,0),core:activities.filter(a=>!a.extension).length,extensions:activities.filter(a=>a.extension).length,skills:JSON.parse(fs.readFileSync(path.join(source,'data/coverage.json'))).length,preservedIds:true},null,2));
console.log('Imported',activities.length,'activities;',topics.length,'topics. Original files unchanged.');
