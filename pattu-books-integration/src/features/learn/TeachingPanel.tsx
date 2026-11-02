import type {ReactNode} from 'react';
export function TeachingPanel({number,title,children,answer=false}:{number:number;title:string;children:ReactNode;answer?:boolean}){return <section className={'teaching-panel'+(answer?' answer-panel':'')}><h2><span className="teaching-number" aria-hidden="true">{number}</span>{title}</h2>{children}</section>;}
