let wid = 0;
function getID(){
    wid++;
    return wid;
}
function hash(node){
    return node.start.toString()+":"+node.end.toString();
}
//JS to GraphViz
const Walks = {
    Literal(n,s,c){
        let me = new GNode(n.value);
        s.set(hash(n),me);
    },
    Identifier(n,s,c){
        let me = new GNode(n.name);
        me.decs["shape"] = "note";
        s.set(hash(n),me);
    },
    AssignmentExpression(n,s,c){
        c(n.left, s);
        let l = s.get(hash(n.left));
        c(n.right,s);
        let r = s.get(hash(n.right));
        let me = new GNode("Assign");
        s.set(hash(n),me);
        g.push(new GEdge(me.id,l.id,"left"))
        g.push(new GEdge(me.id,r.id,"right"))
        g.push(new GRank(l.id,r.id));
    }
    ,
    BinaryExpression(n,s,c) {
        c(n.left, s);
        let l = s.get(hash(n.left));
        c(n.right,s);
        let r = s.get(hash(n.right));
        let me = new GNode(n.operator);
        s.set(hash(n),me);
        g.push(new GEdge(me.id,l.id,"left"))
        g.push(new GEdge(me.id,r.id,"right"))
        g.push(new GRank(l.id,r.id));
    }
}

class GNode{
    id
    type
    label
    decs = {}
    constructor(name){
        this.label = name;
        this.id = getID();
        this.type = "node";
    }
}
class GEdge{
    id
    fromID
    toID
    label
    type
    decs = {}
    constructor(f,t,label){
        this.fromID = f;
        this.toID = t;
        this.label = label;
        this.id = getID();
        this.type = "edge";
    }
}
class GRank{
    type = "rank";
    elements;
    constructor(...args) {
        this.elements = args;
    }
}

let g =[]

function Convert(source){
    g = []
    wid = 0;
    let ast = acorn.parse(source);
    let o = "digraph {\n"

    let state = new Map();
    acorn.walk.recursive(acorn.parse(source),state,Walks);

    state.forEach(n => {
        let d =";"
        for (const [key, value] of Object.entries(n.decs)) {
            d+=`${key}=${value}`;
        }
            o += n.id+" [label=\""+n.label+"\" "+d+"]\n";
    })
    for(let i = 0; i < g.length; i++){
        let n = g[i];
         if(n.type === "edge"){
            o += n.fromID + " -> " + n.toID +" [label=\""+n.label+"\"]";
        }else if(n.type === "rank"){
             o += "subgraph { rank = same; "+n.elements.join(" ")+" }";
         }
        o+="\n"
    }

    o+=" }"
    //console.log(o,state,g);
    return o;
}
//digraph {
//
// 1[label="+",id=1]
// 1 ->  2[label="left"]
// 1 ->  3[label="right"]
// subgraph{rank=same;2,3}
// }
