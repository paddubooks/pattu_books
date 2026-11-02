import {useEffect,useRef,useId} from 'react';
interface Props{correct:boolean;onContinue:()=>void;onDismiss:()=>void}
export function AnswerFeedback({correct,onContinue,onDismiss}:Props){
 const dialog=useRef<HTMLDialogElement>(null),action=useRef<HTMLButtonElement>(null),id=useId();
 useEffect(()=>{const element=dialog.current!,previous=document.activeElement as HTMLElement|null;const overflow=document.body.style.overflow;document.body.style.overflow='hidden';element.showModal();action.current?.focus();return()=>{element.close();document.body.style.overflow=overflow;if(previous?.isConnected)previous.focus({preventScroll:true});};},[]);
 return <dialog ref={dialog} className={'answer-dialog '+(correct?'answer-success':'answer-retry')} aria-labelledby={id} aria-modal="true" onKeyDown={e=>{if(e.key!=='Tab')return;const buttons=Array.from(e.currentTarget.querySelectorAll<HTMLButtonElement>('button:not(:disabled)'));const first=buttons[0],last=buttons[buttons.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}}} onCancel={e=>{e.preventDefault();onDismiss();}}>
  <button type="button" className="dialog-close secondary" aria-label="Close feedback" onClick={onDismiss}>×</button>
  <span className="feedback-icon" aria-hidden="true">{correct?'✓':'↻'}</span>
  <h2 id={id}>{correct?'That’s right. Well done for trying!':'Take your time. Look again and try once more.'}</h2>
  <button ref={action} type="button" onClick={onContinue}>{correct?'Next question →':'Retry'}</button>
 </dialog>;
}
