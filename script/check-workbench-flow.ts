/** Read-only layout verification against locally generated V3 static data. */
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { layoutSlots, TILE_WIDTH, TILE_HEIGHT, WEAPON_WIDTH } from "../features/modding/workbench-layout";
import { buildSlots } from "../features/modding/build";
import { reconstructedNodes } from "../features/modding/builds/preset-import";
import { selectionsFromNodes } from "../features/modding/builds/tree";
import type { ModdingManifest, WeaponSnapshot } from "../features/modding/types";
async function main() {
  const root = path.resolve("public");
  const data = async <T>(url: string): Promise<T> => {
    const target = path.resolve(root, `.${url}`);
    assert.ok(target.startsWith(root + path.sep));
    return JSON.parse(await readFile(target,"utf8")).data;
  };
  const manifest = await data<ModdingManifest>("/static/modding/v3/index.json");
  let cases = 0;
  for (const id of ["5447a9cd4bdc2dbd208b4567", "6183afd850224f204c1da514"]) {
    const snapshot = await data<WeaponSnapshot>(manifest.weapons[id]);
    const selections: Record<string,string>[] = [{}];
    for (const preset of Object.values(snapshot.presets)) {
      for (const tree of preset.reconstruction?.can_import ? preset.reconstruction.candidate_trees : []) {
        const content = { weapon_item_id:id,title:"",description:"",nodes:reconstructedNodes(preset,tree) };
        selections.push(selectionsFromNodes(content));
      }
    }
    if (process.argv[2]) {
      const fixture: {base:string;mounted:Record<string,string>} = JSON.parse(await readFile(process.argv[2],"utf8"));
      if (fixture.base === id) selections.push(Object.fromEntries(Object.entries(fixture.mounted).map(([path,item])=>[path.replace(/^root/,id),item])));
    }
    for (const selected of selections) {
      const slots = buildSlots(snapshot,selected);
      assert.equal(slots.filter((slot)=>slot.selected).length,Object.keys(selected).length,"Mounted source instance missing");
      const layout = layoutSlots(slots,undefined,snapshot);
      assert.equal(new Set(layout.slots.map((slot)=>`${slot.col},${slot.row}`)).size,slots.length);
      const boxes = [{ x:0,y:0,width:WEAPON_WIDTH,height:TILE_HEIGHT },...layout.slots.map((slot)=>({x:slot.x,y:slot.y,width:TILE_WIDTH,height:TILE_HEIGHT}))];
      for (let a=0;a<boxes.length;a++) for(let b=a+1;b<boxes.length;b++) {
        const p=boxes[a],q=boxes[b];
        assert.ok(p.x+p.width<=q.x||q.x+q.width<=p.x||p.y+p.height<=q.y||q.y+q.height<=p.y,"Overlapping nodes");
      }
      for (const slot of layout.slots) assert.ok(slot.row!==0||slot.area==="axis"||slot.area==="rearAxis");
      cases++;
    }
    console.log(id, selections.length, "source configurations verified");
  }
  console.log(cases,"static configurations: no missing parts, collisions or non-axis nodes on the axis");
}
main().catch((error:unknown)=>{console.error(error);process.exitCode=1;});
