export type Value = string | number;
export type Answer = Value | Value[];
export type Mode = 'choice'|'multi'|'input'|'build'|'buildpair'|'tapcount'|'order'|'equation'|'ordinal'|'match'|'rounds'|'classify';
export type Option = Value | {label:string;text?:string;accessible?:string;image?:string};
export interface Question {id:string;prompt:string;answer:Answer;options:Option[];mode:Mode;image?:string;imageDescription?:string;audio?:string;itemImage?:string;items?:number;capacity?:number;frame?:boolean;memory?:boolean;parts?:Value[];tokens?:Value[];claims?:string[];cards?:Question[];referenceOptions?:Option[];feedback:string;hint:string}
export interface Activity {id:string;title:string;topic:string;topicCode:string;topicSlug:string;skill:string;objective:string;referenceSkills:string[];extension:boolean;difficulty:1|2|3;subjectId:string;gradeId:string;language:string;ageRange:{min:number;max:number};schemaVersion:1;contentVersion:string;interactionType:Mode;questions:Question[];examples:WorkedExample[]}
export interface WorkedExample {question:Question;steps:string[];answer:string;tryQuestion:Question}
export type ActivitySummary=Omit<Activity,'questions'|'examples'> & {questionCount:number};
export interface Topic {code:string;title:string;slug:string;skillCount:number;assets:string[];assetManifest?:string;activityIds:string[]}
export interface Catalogue {schemaVersion:1;contentVersion:string;subjects:{id:string;slug:string;title:string}[];grades:{id:string;slug:string;title:string;subjectId:string}[];topics:Topic[];activities:ActivitySummary[]}
export interface GuideState {version:1;stage: "welcome"|"demo"|"practice"|"success"|"done"|"skipped";questionIndex:number;demoStep:number;answer:Answer|null;checked:boolean;attempts:number;mistakes:number}
export interface Session {tutorial?:GuideState;version:1;contentVersion:string;step:number;answer:Answer|null;checked:boolean;attempts:number;completed:boolean;updatedAt:number}
export const optionValue=(o:Option):Value=>typeof o==='object'?o.label:o;
export const optionText=(o:Option):string=>typeof o==='object'?(o.accessible||o.text||o.label):String(o);
export function checkAnswer(q:Question,answer:Answer|null):boolean {if(answer===null)return false;const expected=q.mode==='equation'?q.parts!:q.answer;const norm=(v:Value)=>String(v).trim().toLowerCase();if(Array.isArray(expected)){if(!Array.isArray(answer)||expected.length!==answer.length)return false;const a=answer.map(norm),b=expected.map(norm);if(q.mode==='multi'){a.sort();b.sort();}return a.every((x,i)=>x===b[i]);}return !Array.isArray(answer)&&norm(answer)===norm(expected);}
export function flattenQuestions(questions:Question[]):{question:Question;set:number;part:number}[]{return questions.flatMap((q,set)=>{const walk=(node:Question):Question[]=>node.mode==='rounds'?node.cards!.flatMap(walk):[node];return walk(q).map((question,part)=>({question,set,part}));});}
export const gradePath='/learn/subjects/maths/grades/kindergarten';
export const activityPath=(a:Pick<Activity,'id'|'topicSlug'>)=>`${gradePath}/topics/${a.topicSlug}/activities/${a.id}`;
