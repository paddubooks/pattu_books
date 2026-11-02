import {AnswerFeedback} from './AnswerFeedback';
import {LearningProgress} from './LearningProgress';
import {progress} from './repositories';
import {useEffect,useRef,useState} from 'react';
import {Link} from 'react-router-dom';
import {QuestionView} from './QuestionView';
import {activityPath,type Activity,type ActivitySummary,type GuideState,type Session} from './model';
import {advanceDemo,advanceGuide,checkedGuide,completeFirstSet,firstQuestions,guideInstruction,newGuide,smartHint} from './guidance';

interface Props {activity:Activity;session:Session;guide:GuideState;save:(patch:Partial<Session>)=>void;back:string;recommendation?:ActivitySummary}
export function GuidedFirstQuestion({activity:a,session,guide:g,save,back,recommendation}:Props){
 const questions=firstQuestions(a),index=Math.min(g.questionIndex,questions.length-1),q=questions[index];
 const demo=a.examples.find(e=>!questions.some(p=>p.id===e.question.id))||a.examples[0];
 const demoStep=Math.min(g.demoStep,demo.steps.length-1);
 const [hint,setHint]=useState(false),[idle,setIdle]=useState(false),[retry,setRetry]=useState(0),[popup,setPopup]=useState<boolean|null>(null);
 const workspace=useRef<HTMLDivElement>(null),heading=useRef<HTMLHeadingElement>(null);
 function change(patch:Partial<GuideState>){save({tutorial:{...g,...patch}});}
 useEffect(()=>{heading.current?.focus({preventScroll:true});setHint(false);setIdle(false);},[g.stage,g.questionIndex]);
 useEffect(()=>{if(g.stage!=='practice'||g.checked)return;const timer=window.setTimeout(()=>setIdle(true),20000);return()=>clearTimeout(timer);},[g.stage,g.questionIndex,g.answer,g.checked]);
 function nextPractice(){const next=advanceGuide(g,questions.length);save(next.stage==='success'?completeFirstSet(session,a,next):{tutorial:next});}
 function retryPractice(){setPopup(null);change({answer:null,checked:false});setRetry(r=>r+1);setHint(false);setIdle(false);requestAnimationFrame(()=>workspace.current?.querySelector<HTMLElement>('input, button:not(:disabled)')?.focus());}
 const stageNumber=g.stage==='welcome'?1:g.stage==='demo'?2:g.stage==='practice'?3:4;
 const percentage=g.stage==='success'?100:g.stage==='welcome'?0:g.stage==='demo'?Math.round(10+25*(demoStep+1)/demo.steps.length):Math.round(35+60*(index+(g.checked?1:0))/questions.length);
 return <>{popup!==null&&<AnswerFeedback correct={popup} onDismiss={()=>setPopup(null)} onContinue={()=>{setPopup(null);if(popup)nextPractice();else retryPractice();}}/>}<div className="activity-heading"><Link to={back}>← Back to activities</Link><span>{a.topic}</span></div><section className="activity-card guided-activity" aria-label="Interactive first-question guide">
  <p className="eyebrow">YOUR LITTLE LEARNING GUIDE · {a.id}</p><h1>{a.title.replace(/ · [A-Z]+\d+$/,'')}</h1>
  <div className="guide-progress"><span>Step {stageNumber} of 4 · {['Welcome','Watch an example','Your turn','You did it'][stageNumber-1]}</span><span>{percentage}%</span></div><LearningProgress label="Guide progress" value={percentage}/>
  <h2 className="guide-heading" ref={heading} tabIndex={-1}>{g.stage==='welcome'?'Let’s try the first question together.':g.stage==='demo'?`Watch how it works. Step ${demoStep+1} of ${demo.steps.length}.`:g.stage==='practice'?'Now it’s your turn.':'You finished your first question!'}</h2>
  <nav className="guide-actions" aria-label="Guide controls"><button className="secondary" disabled={g.stage==='welcome'} onClick={()=>{if(g.stage==='demo')change(demoStep>0?{demoStep:demoStep-1}:{stage:'welcome'});else if(g.stage==='practice')change({stage:'demo',demoStep:demo.steps.length-1});else change({stage:'practice'});}}>Back</button>
  {g.stage!=='success'&&<button type="button" className={g.stage==='practice'&&!g.checked?'secondary':''} disabled={g.stage==='practice'&&!g.checked} onClick={()=>{if(g.stage==='welcome')change({stage:'demo'});else if(g.stage==='demo')change(advanceDemo(g,demo.steps.length));else nextPractice();}}>Next</button>}
  {g.stage!=='success'&&<button className="secondary" onClick={()=>save(g.stage==='practice'&&session.step<=index?{tutorial:{...g,stage:'skipped'},step:index,answer:g.answer,checked:g.checked}:{tutorial:{...g,stage:'skipped'}})}>Skip guide</button>}
  </nav>
  {g.stage==='welcome'&&<><p>We’ll explore <strong>{a.topic.toLowerCase()}</strong>. First, I’ll show you an example. Then you’ll complete the first question with a little help.</p><p>We’ll take one step at a time. You can ask for a hint, try again, or take a break.</p><details><summary>What we’re learning</summary><p>{a.objective}</p></details></>}
  {g.stage==='demo'&&<><div className="guide-coach" role="status"><p className="eyebrow">EXAMPLE · STEP {demoStep+1} OF {demo.steps.length}</p><p key={demoStep}>{demo.steps[demoStep]}</p></div><div className="guide-demonstration"><QuestionView key={demo.question.id} q={demo.question} value={demo.question.mode==='equation'?demo.question.parts!:demo.question.answer} onChange={()=>{}} disabled/></div><div className="answer-reveal"><strong>Completed example</strong><p>{demo.answer}</p></div></>}
  {g.stage==='practice'&&<><div className="guide-coach" id="guide-instruction" role="status"><p className="eyebrow">FIRST QUESTION · PART {index+1} OF {questions.length}</p><p>{g.checked?'Yes! You worked it out. Tap Next when you’re ready.':guideInstruction(q,g.answer)}</p></div><div ref={workspace} className={'guide-workspace '+(!g.checked?'guide-target':'')} aria-describedby="guide-instruction"><QuestionView key={q.id+'-'+retry} q={q} value={g.answer} disabled={g.checked} onChange={answer=>{change({answer,checked:false});setIdle(false);setHint(false);}}/></div>
    {(idle||hint||g.mistakes>0)&&!g.checked&&<aside className="guide-hint" role="status"><strong>{idle&&!hint&&!g.mistakes?'Need a little help?':'Here’s a hint'}</strong><p>{smartHint(q,g.mistakes)}</p></aside>}
    <div className="actions"><button className={!g.checked?'guide-check':'secondary'} disabled={g.checked} onClick={()=>{const checked=checkedGuide(g,q);save({tutorial:checked,attempts:session.attempts+1});setIdle(false);setPopup(checked.checked);}}>Check answer</button><button className="secondary" disabled={g.checked} onClick={()=>setHint(true)}>Give me a hint</button><button className="secondary" onClick={retryPractice}>Try Again</button></div>
  </>}
  {g.stage==='success'&&<div className="guide-success"><p>You used the controls, checked your work, and completed a real question. Your activity progress is saved.</p><button onClick={()=>change({stage:'done'})}>Continue this activity →</button>{recommendation&&<div className="guide-recommendation"><p>Another little discovery to try</p><Link className="button secondary" to={activityPath(recommendation)} onClick={()=>change({stage:'done'})}>{recommendation.title} →</Link></div>}</div>}
<p className="fine" role="status">{progress.warning||'Your place is saved on this device. You can restart this guide from any activity screen.'}</p><button className="guide-restart secondary" onClick={()=>{if(confirm('Restart the guide? Your activity progress will stay saved.'))save({tutorial:newGuide()});}}>Restart guide</button>
 </section></>;
}
