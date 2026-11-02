import {checkAnswer,flattenQuestions,optionText,optionValue,type Activity,type Answer,type GuideState,type Question,type Session} from './model';

export const newGuide=():GuideState=>({version:1,stage:'welcome',questionIndex:0,demoStep:0,answer:null,checked:false,attempts:0,mistakes:0});
export function validGuide(value:unknown):value is GuideState {
 const g=value as GuideState;
 return !!g&&g.version===1&&['welcome','demo','practice','success','done','skipped'].includes(g.stage)&&Number.isInteger(g.questionIndex)&&g.questionIndex>=0&&Number.isInteger(g.demoStep)&&g.demoStep>=0&&typeof g.checked==='boolean'&&Number.isInteger(g.attempts)&&g.attempts>=0&&Number.isInteger(g.mistakes)&&g.mistakes>=0&&(g.answer===null||typeof g.answer==='string'||typeof g.answer==='number'||Array.isArray(g.answer)&&g.answer.every(v=>typeof v==='number'||typeof v==='string'));
}
export const firstQuestions=(a:Activity)=>flattenQuestions(a.questions).filter(step=>step.set===0).map(step=>step.question);
export function checkedGuide(g:GuideState,q:Question):GuideState {
 const answer=g.answer===null?(q.mode==='build'?0:q.mode==='buildpair'?[0,0]:null):g.answer;
 const correct=checkAnswer(q,answer);
 return {...g,answer,checked:correct,attempts:g.attempts+1,mistakes:g.mistakes+(correct?0:1)};
}
export function advanceGuide(g:GuideState,count:number):GuideState {
 if(g.stage!=='practice'||!g.checked)return g;
 return g.questionIndex+1>=count?{...g,stage:'success'}:{...g,questionIndex:g.questionIndex+1,answer:null,checked:false,mistakes:0};
}
export function completeFirstSet(session:Session,a:Activity,guide:GuideState):Partial<Session>{
 const count=firstQuestions(a).length;
 if(session.step>=count||session.completed)return {tutorial:guide};
 return {tutorial:guide,step:count,answer:null,checked:false,completed:count===flattenQuestions(a.questions).length};
}
export function answerLabel(q:Question):string {
 if(q.mode==='equation')return q.parts!.join(' ');
 return (Array.isArray(q.answer)?q.answer:[q.answer]).map(v=>{const option=q.options.find(o=>String(optionValue(o))===String(v));return option===undefined?String(v):optionText(option);}).join(', ');
}
export function guideInstruction(q:Question,answer:Answer|null):string {
 const filled=Array.isArray(answer)?answer.filter(v=>v!=='').length:0;
 switch(q.mode){
 case 'match':return filled<(q.cards?.length||0)?`Look at card ${filled+1}. Choose its answer. We will check all the cards together.`:'Each card has an answer. Tap Check answer.';
 case 'classify':return filled<(q.claims?.length||0)?`Look at item ${filled+1}: ${q.claims![filled]}. Choose the group it belongs in.`:'Every item is sorted. Tap Check answer.';
 case 'order':case 'equation':return `Choose the next piece for space ${Math.min(filled+1,q.mode==='order'?(q.answer as Answer[]).length:q.parts!.length)}. Use Undo if you want to change a piece.`;
 case 'buildpair':return 'Build group A first. Then build group B. Count each group before you check.';
 case 'build':return 'Tap an empty space to add a counter. Tap a filled space to take one away. Count your counters, then check.';
 case 'tapcount':return 'Touch each object once and say its number. Then choose how many there are.';
 case 'ordinal':return 'Start with the object on the left. Count along and tap the place asked for.';
 case 'multi':return 'Tap every answer that fits. You can tap an answer again to unselect it. Then check.';
 case 'input':return answer===null?'Tap the answer box and type your answer.':'Read your answer once more. Then tap Check answer.';
 default:return answer===null?'Look at the question. Tap one answer in the highlighted space.':'You have chosen an answer. Tap Check answer to see how you did.';
 }
}
export function smartHint(q:Question,mistakes:number):string {
 if(mistakes>=2)return `Let’s try it together. ${q.mode==='match'?'The card answers, in order, are':'The answer is'} ${answerLabel(q)}. Make this answer using the controls, then check.`;
 if(q.audio)return 'Listen again. Say the number out loud, then look for the matching numeral.';
 if(q.mode==='order')return 'Start with the smallest number. Find the next smallest each time. Use Undo to change a piece.';
 if(q.mode==='equation')return 'Count the picture groups. Plus joins them; minus takes away. Put the total after the equals sign.';
 if(q.mode==='match')return 'Take one card at a time. Look carefully at its picture and label before choosing an answer.';
 if(q.mode==='multi'||q.mode==='classify')return 'Check each choice against the rule in the question. Some choices fit and some do not.';
 if(['tapcount','build','buildpair'].includes(q.mode))return 'Touch or count each object once. Say one number for each object. The last number tells how many.';
 if(q.mode==='ordinal')return 'Start on the left and say first, second, third as you move along.';
 return `${q.prompt} Take one choice at a time. ${q.hint}`;
}

// Advance from the stored demonstration position exactly once per activation.
export function advanceDemo(g:GuideState,count:number):GuideState {
 if(g.stage!=='demo')return g;
 const current=Math.max(0,Math.min(g.demoStep,count-1));
 return current+1<count?{...g,demoStep:current+1}:{...g,stage:'practice'};
}
