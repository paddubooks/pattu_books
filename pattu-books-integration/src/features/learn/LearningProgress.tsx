export function LearningProgress({label,value,max=100}:{label:string;value:number;max?:number}){return <progress aria-label={label} value={value} max={max}/>;}
