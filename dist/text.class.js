var expect=require("./expect.function.js"),aver=require("./aver.function.js");module.exports=class{constructor(){Object.seal(this)}static rightAlign(s,width){expect(s,"String"),expect(width,"Number");var columnLen=width,stringLen=s.length;return stringLen>columnLen?s.substr(0,columnLen-3)+"...":Array(columnLen+1-stringLen).join(" ")+s}static leftAlign(s,width){expect(s,"String"),expect(width,"Number");var columnLen=width,stringLen=s.length;return stringLen>columnLen?s.substr(0,columnLen-3)+"...":s+Array(columnLen+1-stringLen).join(" ")}static ellipsed(s,width){if(""!=s){var ellipsis=s.length>width?"...":"";s=`${s.substr(0,width)}${ellipsis}`}return s}static countOccurences(s,c){var count=0;for(let i=0;i<s.length;i++)s.charAt(i)==c&&count++;return count}static padLeft(s,width){return expect(s,"String"),expect(width,"Number"),s.length>width?s:s+" ".repeat(width-s.length)}static padRight(s,width){return expect(s,"String"),expect(width,"Number"),s.length>width?s:" ".repeat(width-s.length)+s}static format32bits(number){expect(number,"Number"),aver(number<4294967296),aver(number>=-2147483648);for(var result=(number<0?4294967295+number+1:number).toString(2);result.length<32;)result="0"+result;return result}static format16bits(number){expect(number,"Number"),aver(number<65536),aver(number>=-32768);for(var result=(number<0?65535+number+1:number).toString(2);result.length<16;)result="0"+result;return result}static format8bits(number){expect(number,"Number"),aver(number<256),aver(number>=-128);for(var result=(number<0?255+number+1:number).toString(2);result.length<8;)result="0"+result;return result}static format32hex(number){expect(number,"Number"),aver(number<4294967296),aver(number>=-2147483648);for(var result=(number<0?4294967295+number+1:number).toString(16);result.length<8;)result="0"+result;return result}static format16hex(number){expect(number,"Number"),aver(number<65536),aver(number>=-32768);for(var result=(number<0?65535+number+1:number).toString(16);result.length<4;)result="0"+result;return result}static format8hex(number){expect(number,"Number"),aver(number<256),aver(number>=-128);for(var result=(number<0?255+number+1:number).toString(16);result.length<2;)result="0"+result;return result}};