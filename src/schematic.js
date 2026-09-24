import { LOGISTICS, LAYOUTS, nameOf } from './data.js';
import { ICONS } from './icons.js';

const fmt = n => new Intl.NumberFormat('zh-TW',{maximumFractionDigits:n && Math.abs(n)<1 ? Math.min(9,Math.max(2,Math.ceil(-Math.log10(Math.abs(n)))+2)) : 2}).format(n);
const esc = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

export function schematicTemplate(block) {
  const mode=block.logistics,logistics=LOGISTICS[mode],layout=block.layout,arrangement=LAYOUTS[layout];
  const inputLanes=block.transport.lanes,outputLanes=block.transport.outputLanes,beltCapacity=block.transport.beltCapacity;
  const largest=Math.max(...[...inputLanes,...outputLanes].map(l=>l.perMachine));
  const requestedRowSize=layout==='row'?12:block.rowSize,beltMachineLimit=Math.max(1,Math.floor(beltCapacity/largest+1e-10));
  const machinesPerRow=Math.min(requestedRowSize,beltMachineLimit);
  const machinesPerCell=arrangement.shared?Math.min(requestedRowSize*3,beltMachineLimit):machinesPerRow*arrangement.rows;
  const materials=[...inputLanes.map(l=>({...l,direction:'in'})),...outputLanes.map(l=>({...l,direction:'out'}))];
  const stationsPerUnit=logistics.stationId?Math.ceil(materials.length/logistics.slots):0;
  const externalSpray=Boolean(block.effect.tier && (!stationsPerUnit || materials.length===stationsPerUnit*logistics.slots));
  if (block.effect.tier) materials.push({item:`proliferator-${block.effect.tier}`,direction:'spray',perMachine:inputLanes.reduce((n,l)=>n+l.perMachine,0)/block.effect.sprays});
  const stationMaterials=materials.filter(m=>m.direction!=='spray'||!externalSpray);
  const stationGroups=Array.from({length:stationsPerUnit},(_,i)=>stationMaterials.slice(i*logistics.slots,(i+1)*logistics.slots));
  const cells=[];
  for (let remaining=block.count,remainingOutput=block.output;remaining>0;) {
    const count=Math.min(machinesPerCell,remaining),output=Math.min(count*block.perMachine,remainingOutput);
    const rowCount=Math.min(arrangement.rows,count),rows=[];
    let left=count;
    for(let i=0;i<rowCount;i++) {const n=Math.ceil(left/(rowCount-i));rows.push({index:i,count:n,output:output*n/count,capacity:n*block.perMachine});left-=n;}
    const branchBeltLoad=Math.max(...rows.map(r=>r.count))*largest/beltCapacity,trunkBeltLoad=arrangement.shared?count*largest/beltCapacity:null;
    cells.push({index:cells.length,count,output,capacity:count*block.perMachine,rows,branchBeltLoad,trunkBeltLoad,maxBeltLoad:trunkBeltLoad??branchBeltLoad});
    remaining-=count;remainingOutput=Math.max(0,remainingOutput-output);
  }
  return {id:'material-schematic-v1',schematic:true,layout,arrangement,mode,logistics,inputLanes,outputLanes,materials,stationGroups,externalSpray,
    slotCount:Math.max(0,...stationGroups.map(g=>g.length)),beltCapacity,sorterRates:block.transport.sorterRates,machinesPerCell,machinesPerRow,requestedRowSize,beltMachineLimit,cells,
    stations:cells.reduce((n,c)=>n+stationsPerUnit*(arrangement.shared?1:c.rows.length),0),sorterCount:block.count*block.transport.cost,
    coaterCount:block.effect.tier?cells.reduce((n,c)=>n+c.rows.length*inputLanes.length,0):0,validation:'flow-only',gameValidated:false};
}

export function schematicGeometry(block,t,index=0) {
  const cell=t.cells[index];
  const belts=cell.rows.flatMap(row=>t.materials.map(m=>({...m,row:row.index,rate:m.perMachine/block.perMachine*row.output,fullRate:m.perMachine*row.count})));
  const links=t.arrangement.shared?t.materials.map(m=>({...m,rate:m.perMachine/block.perMachine*cell.output,fullRate:m.perMachine*cell.count})):[];
  return {...cell,belts,links,machines:Array.from({length:cell.count},(_,id)=>({id})),station:null,
    stations:Array.from({length:t.stationGroups.length*(t.arrangement.shared?1:cell.rows.length)},()=>({item:t.logistics.stationId})),
    splitters:t.arrangement.shared&&cell.rows.length>1?t.materials.map(m=>({item:m.item})):[],coaters:[],sorters:[],towers:[],ports:[],beltCount:0};
}

export function schematicSVG(block,t,index) {
  const g=schematicGeometry(block,t,index),height=170+g.rows.length*220;
  const [sx,sy]=ICONS[block.recipe.machine]??[0,0];
  let body=`<rect width="1050" height="${height}" fill="#121a22"/><text x="28" y="32" fill="#e5edf5" font-size="20">${esc(nameOf(block.id))} · 第 ${index+1} 組 · ${g.count} 台${esc(nameOf(block.recipe.machine))}</text><text x="28" y="57" fill="#e5ba79" font-size="13">供需配置示意 · 不按實體格線比例 · 走帶、分揀器位置與供電待施工設計</text><text x="28" y="82" fill="#a5b8cc" font-size="12">${esc(t.arrangement.label)} · ${esc(t.logistics.label)} ${g.stations.length} 座 · ${esc(nameOf(block.equipment.belt))} ${fmt(t.beltCapacity)}/min</text>`;
  for (const row of g.rows) {
    const y=110+row.index*220;
    body+=`<rect x="20" y="${y}" width="1010" height="204" rx="8" fill="#19242e" stroke="#304452"/><text x="34" y="${y+22}" fill="#b9d7cd" font-size="13">第 ${row.index+1} 列 · ${row.count} 台 · 主產品 ${fmt(row.output)}/min</text>`;
    body+=`<rect x="425" y="${y+65}" width="210" height="96" rx="8" fill="#25423b" stroke="#75baa2"/><svg x="445" y="${y+85}" width="45" height="45" viewBox="${sx} ${sy} 64 64"><use href="#layout-sprite"/></svg><text x="502" y="${y+110}" fill="#e1f0e8" font-size="12">${esc(nameOf(block.recipe.machine))}</text><text x="502" y="${y+134}" fill="#a9c9bf" font-size="13">× ${row.count}</text>`;
    const incoming=t.materials.filter(m=>m.direction!=='out'),outgoing=t.materials.filter(m=>m.direction==='out');
    for (const [i,m] of incoming.entries()) {
      const yy=y+46+i*22,flow=m.perMachine/block.perMachine*row.output;
      body+=`<text x="34" y="${yy}" fill="#b5c8da" font-size="12">${esc(nameOf(m.item))} · ${fmt(flow)}/min</text><path d="M285 ${yy-4} L400 ${yy-4} L425 ${y+105}" fill="none" stroke="#a3b9ce" stroke-width="1.5"/>`;
    }
    for (const [i,m] of outgoing.entries()) {
      const yy=y+80+i*28,flow=m.perMachine/block.perMachine*row.output;
      body+=`<path d="M635 ${y+110} L675 ${yy-4} L705 ${yy-4}" fill="none" stroke="#7ad1af" stroke-width="2"/><text x="715" y="${yy}" fill="#9edcc8" font-size="12">${esc(nameOf(m.item))} · ${fmt(flow)}/min →</text>`;
    }
  }
  body+=`<text x="28" y="${height-32}" fill="#e5ba79" font-size="12">${g.splitters.length?`共用分配／合流：${g.splitters.length} 個分流器；主幹上限不因分流增加。`:'各列按圖示供需供料。'} 所有共同產物均需取出，避免停產。</text><text x="28" y="${height-12}" fill="#91a5b7" font-size="11">未估算輸送帶與電力塔；未驗證實體端口、占地、堆疊或遊戲內產能。此圖非遊戲藍圖。</text>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" class="layout-svg" role="img" aria-label="${esc(nameOf(block.id))}供需配置示意" viewBox="0 0 1050 ${height}" font-family="Microsoft JhengHei,sans-serif"><defs><image id="layout-sprite" href="./assets/icons.webp" width="1472" height="1472"/></defs>${body}</svg>`;
}

export function schematicDetails(block,t,g) {
  const materials=t.materials.map(m=>`<tr><td>${esc(nameOf(m.item))}</td><td>${m.direction==='out'?'產出':m.direction==='spray'?'噴塗耗材':'投入'}</td><td>${fmt(m.perMachine/block.perMachine*g.output)}</td></tr>`).join('');
  const groups=t.stationGroups.map((group,i)=>`第 ${i+1} 站（${group.length}/${t.logistics.slots}）：${group.map(m=>`${esc(nameOf(m.item))} ${m.direction==='out'?'供應':'需求'}`).join('、')}`).join('<br>');
  const special=block.recipe.machine==='ray-receiver'?'射線接收站採無透鏡、持續滿供能的光子模式；實際需足夠戴森球功率與持續接收率。':block.recipe.machine==='energy-exchanger'?'充電按資料快照每顆 10 秒，須有足夠電網剩餘功率；蓄電器循環回收未計入。':'';
  return `<p class="status-note">此配方採供需示意，尚無實體格線模板。${block.transport.direct?'設備使用直接輸送帶接口。':'搬運暫按每種物料一個 1 格分揀器通道估算，尚未驗證實際端口及布置。'} 單台名義 ${fmt(block.nominalPerMachine)} → 模板 ${fmt(block.perMachine)}/min。${special}</p>
    <div class="layout-summary"><div>本組排列<strong>${g.rows.map(r=>r.count).join(' + ')} 台</strong>${esc(nameOf(block.recipe.machine))}</div><div>單帶容量<strong>${fmt(t.beltCapacity)}</strong>件／分鐘</div><div>最高帶速占用<strong>${fmt(g.maxBeltLoad*100)}%</strong>${t.arrangement.shared?'含共用主幹':'各列獨立'}</div></div>
    <h4>全部投入與共同產物</h4><table class="materials-table"><thead><tr><th>物品</th><th>用途</th><th>本組 / min</th></tr></thead><tbody>${materials}</tbody></table>
    <p class="status-note">${groups||'全部物料使用外接傳送帶。'}${t.externalSpray?' 增產劑使用獨立外接帶。':''}${!t.arrangement.shared&&g.rows.length>1?' 上述站組每列各一套。':''}</p>
    <p class="materials-subnote">${g.splitters.length} 個分流器，${g.stations.length} 座物流站。分揀器與噴塗機按通道估算；本示意不計輸送帶格數或電力塔，建造清單會標示未估部分。共同產物已在全計畫中抵扣需求，剩餘產物請在建造清單查看並安排出口。</p>`;
}
