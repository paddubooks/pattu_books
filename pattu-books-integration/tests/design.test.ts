import {test,expect} from 'vitest';
import fs from 'node:fs';
const css=fs.readFileSync('dist/assets/css/pattu-tokens.css','utf8');
const colours=Object.fromEntries([...css.matchAll(/--([a-z-]+):(#[0-9A-Fa-f]{6})/g)].map(m=>[m[1],m[2]]));
const luminance=(hex:string)=>{const rgb=hex.slice(1).match(/../g)!.map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return .2126*rgb[0]+.7152*rgb[1]+.0722*rgb[2];};
const ratio=(a:string,b:string)=>{const x=luminance(a),y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);};
test('semantic text and functional boundaries meet contrast targets',()=>{for(const bg of ['white','cream','yellow','lavender','mint'] as const){for(const fg of ['green','purple','ink','berry','muted'] as const)expect(ratio(colours[fg],colours[bg]),`${fg} on ${bg}`).toBeGreaterThanOrEqual(4.5);expect(ratio(colours.boundary,colours[bg])).toBeGreaterThanOrEqual(3);}expect(ratio(colours.white,colours.green)).toBeGreaterThanOrEqual(4.5);});
