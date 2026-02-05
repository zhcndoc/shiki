import{p as V}from"./chunk-TMUBEWPD.Cn_qeXT7.js";import{X as x,O as F,aF as U,g as j,s as X,a as Z,b as q,o as H,p as J,_ as p,l as z,c as K,E as Q,I as Y,a4 as tt,e as et,x as at,F as rt}from"../app.GFxS-W8r.js";import{p as nt}from"./gitGraph-YCYPL57B.BPERnCNs.js";import{d as N}from"./arc.BU0rId-D.js";import{o as it}from"./ordinal.BYWQX77i.js";import"./framework.BBnaJ3BH.js";import"./theme.D2s6Mebr.js";import"./baseUniq.CjsBCXec.js";import"./basePickBy.Cn7J8_zj.js";import"./clone.FRZ7prab.js";import"./init.Gi6I4Gst.js";function st(t,a){return a<t?-1:a>t?1:a>=t?0:NaN}function ot(t){return t}function lt(){var t=ot,a=st,m=null,s=x(0),u=x(F),y=x(0);function i(e){var r,l=(e=U(e)).length,d,A,h=0,c=new Array(l),n=new Array(l),v=+s.apply(this,arguments),w=Math.min(F,Math.max(-F,u.apply(this,arguments)-v)),f,T=Math.min(Math.abs(w)/l,y.apply(this,arguments)),$=T*(w<0?-1:1),g;for(r=0;r<l;++r)(g=n[c[r]=r]=+t(e[r],r,e))>0&&(h+=g);for(a!=null?c.sort(function(S,C){return a(n[S],n[C])}):m!=null&&c.sort(function(S,C){return m(e[S],e[C])}),r=0,A=h?(w-l*$)/h:0;r<l;++r,v=f)d=c[r],g=n[d],f=v+(g>0?g*A:0)+$,n[d]={data:e[d],index:r,value:g,startAngle:v,endAngle:f,padAngle:T};return n}return i.value=function(e){return arguments.length?(t=typeof e=="function"?e:x(+e),i):t},i.sortValues=function(e){return arguments.length?(a=e,m=null,i):a},i.sort=function(e){return arguments.length?(m=e,a=null,i):m},i.startAngle=function(e){return arguments.length?(s=typeof e=="function"?e:x(+e),i):s},i.endAngle=function(e){return arguments.length?(u=typeof e=="function"?e:x(+e),i):u},i.padAngle=function(e){return arguments.length?(y=typeof e=="function"?e:x(+e),i):y},i}var ct=rt.pie,G={sections:new Map,showData:!1},b=G.sections,O=G.showData,pt=structuredClone(ct),ut=p(()=>structuredClone(pt),"getConfig"),dt=p(()=>{b=new Map,O=G.showData,at()},"clear"),gt=p(({label:t,value:a})=>{b.has(t)||(b.set(t,a),z.debug(`added new section: ${t}, with value: ${a}`))},"addSection"),ft=p(()=>b,"getSections"),mt=p(t=>{O=t},"setShowData"),ht=p(()=>O,"getShowData"),P={getConfig:ut,clear:dt,setDiagramTitle:J,getDiagramTitle:H,setAccTitle:q,getAccTitle:Z,setAccDescription:X,getAccDescription:j,addSection:gt,getSections:ft,setShowData:mt,getShowData:ht},vt=p((t,a)=>{V(t,a),a.setShowData(t.showData),t.sections.map(a.addSection)},"populateDb"),St={parse:p(async t=>{const a=await nt("pie",t);z.debug(a),vt(a,P)},"parse")},xt=p(t=>`
  .pieCircle{
    stroke: ${t.pieStrokeColor};
    stroke-width : ${t.pieStrokeWidth};
    opacity : ${t.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${t.pieOuterStrokeColor};
    stroke-width: ${t.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${t.pieTitleTextSize};
    fill: ${t.pieTitleTextColor};
    font-family: ${t.fontFamily};
  }
  .slice {
    font-family: ${t.fontFamily};
    fill: ${t.pieSectionTextColor};
    font-size:${t.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${t.pieLegendTextColor};
    font-family: ${t.fontFamily};
    font-size: ${t.pieLegendTextSize};
  }
`,"getStyles"),yt=xt,At=p(t=>{const a=[...t.entries()].map(s=>({label:s[0],value:s[1]})).sort((s,u)=>u.value-s.value);return lt().value(s=>s.value)(a)},"createPieArcs"),wt=p((t,a,m,s)=>{z.debug(`rendering pie chart
`+t);const u=s.db,y=K(),i=Q(u.getConfig(),y.pie),e=40,r=18,l=4,d=450,A=d,h=Y(a),c=h.append("g");c.attr("transform","translate("+A/2+","+d/2+")");const{themeVariables:n}=y;let[v]=tt(n.pieOuterStrokeWidth);v??=2;const w=i.textPosition,f=Math.min(A,d)/2-e,T=N().innerRadius(0).outerRadius(f),$=N().innerRadius(f*w).outerRadius(f*w);c.append("circle").attr("cx",0).attr("cy",0).attr("r",f+v/2).attr("class","pieOuterCircle");const g=u.getSections(),S=At(g),C=[n.pie1,n.pie2,n.pie3,n.pie4,n.pie5,n.pie6,n.pie7,n.pie8,n.pie9,n.pie10,n.pie11,n.pie12],D=it(C);c.selectAll("mySlices").data(S).enter().append("path").attr("d",T).attr("fill",o=>D(o.data.label)).attr("class","pieCircle");let W=0;g.forEach(o=>{W+=o}),c.selectAll("mySlices").data(S).enter().append("text").text(o=>(o.data.value/W*100).toFixed(0)+"%").attr("transform",o=>"translate("+$.centroid(o)+")").style("text-anchor","middle").attr("class","slice"),c.append("text").text(u.getDiagramTitle()).attr("x",0).attr("y",-400/2).attr("class","pieTitleText");const M=c.selectAll(".legend").data(D.domain()).enter().append("g").attr("class","legend").attr("transform",(o,E)=>{const k=r+l,L=k*D.domain().length/2,_=12*r,B=E*k-L;return"translate("+_+","+B+")"});M.append("rect").attr("width",r).attr("height",r).style("fill",D).style("stroke",D),M.data(S).append("text").attr("x",r+l).attr("y",r-l).text(o=>{const{label:E,value:k}=o.data;return u.getShowData()?`${E} [${k}]`:E});const R=Math.max(...M.selectAll("text").nodes().map(o=>o?.getBoundingClientRect().width??0)),I=A+e+r+l+R;h.attr("viewBox",`0 0 ${I} ${d}`),et(h,d,I,i.useMaxWidth)},"draw"),Ct={draw:wt},Wt={parser:St,db:P,renderer:Ct,styles:yt};export{Wt as diagram};
