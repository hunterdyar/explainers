
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
    ExpressionStatement(n,s,c){
        c(n.expression,s);
        let nn = s.get(hash(n.expression));
        //nn.decs["shape"] = "rectangle";
        //we're skipping expressionStatement nodes, so it hashes to it's child.
        s.set(hash(n),nn);
    },
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
        //g.push(new GRank(l.id,l.id));
        g.push(new GEdge(me.id,r.id,"right"))
        //g.push(new GRank(l.id,r.id));
        children[me.id] = [l.id, r.id];
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
        children[me.id] = [l.id,r.id]
       // g.push(new GRank(l.id,r.id));
    },
    IfStatement(n,s,c){
        c(n.test, s);

        let test = s.get(hash(n.test));
        test.decs["shape"] = "diamond";
        c(n.consequent, s);

        let ifCluster = new GCluster("if", test.id);
        ifCluster.ignore = true;
        g.push(ifCluster);
        let cons = s.get(hash(n.consequent));
        if(n.alternate){
            c(n.alternate, s);
            let alt = s.get(hash(n.alternate));
            let conEdge = new GEdge(test.id,alt.id,"else");
            conEdge.decs["ltail"] = ifCluster.id;
            g.push(conEdge)
        }
        s.set(hash(n),ifCluster);
        let thenEdge = new GEdge(test.id,cons.id,"then")
        thenEdge.decs["ltail"] = ifCluster.id;
        g.push(thenEdge)
        let mems = getAllChildren(test.id);
        ifCluster.members = ifCluster.members.concat(mems);
    },
    BlockStatement(n,s,c){
        let cluster = new GCluster("Block");
        let me = new GNode("Block");
        children[me.id] = [];
        cluster.members.push(me.id);
        cluster.ignore = false;
        s.set(hash(n),me);

        var childCount = 0;
        n.body.forEach((x)=>{
            childCount++;//lol starting at 1
            c(x,s);
            let xn = s.get(hash(x));
            children[me.id].push(xn.id);
            if(xn) {
                cluster.members.push(xn.id);
                let sequenceEdge = new GEdge(me.id,xn.id,childCount.toString());
                g.push(sequenceEdge);
            }
            let blockChildren = getAllChildren(xn.id);
            cluster.members = cluster.members.concat(blockChildren);
        })
        g.push(cluster)
    },
    ArrayExpression(n,s,c){
        console.log("ArrayExpression not supported yet sorry");
    },
    CallExpression(n,s,c){
        //c(n.callee,s);
        //var ident = s.get(hash(n.callee));
        var me = new GNode(n.callee.name);
        me.decs["shape"] = "pentagon";
        s.set(hash(n),me);
        if(arguments.length > 0) {
            children[me.id] = [];
            let argCount = 0;//just used for labels
            n.arguments.forEach((x) => {
                c(x, s);
                let arg = s.get(hash(x));
                var e = new GEdge(me.id, arg.id, "argument "+argCount);
                g.push(e);
                children[me.id].push(arg.id);
                argCount++;
            })
        }
    },
    UpdateExpression(n,s,c){
        //a++ or a--;
        c(n.argument,s);
        let arg = s.get(hash(n.argument));
        var me = new GNode(n.operator);
        s.set(hash(n),me);
        var edge = new GEdge(me.id,arg.id,"");
        g.push(edge);
        children[me.id] = [arg.id];
    },
    ConditionalExpression(n,s,c){
        //ternery's have the same AST as conditioanls. basically.
        this.IfStatement(n,s,c);
    }
}

function getAllChildren(root){
    let c = {a:[]}
    getChildrenRecursive(root,c);
    return c.a;
}
function getChildrenRecursive(root, current){
    if(children[root]){
        children[root].forEach((x)=>{
            current.a.push(x);
            getChildrenRecursive(x,current);
        })
    }
}
class GNode{
    id
    type
    label
    ignore = false
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
class GCluster {
    id
    type
    label
    members = []
    decs = {}
    constructor(name,...members){
        this.label = name;
        this.id = getID();
        this.type = "cluster";
        this.members = members;
    }
}

let g =[]
let children = {}

function Convert(source){
    g = []
    children = []
    wid = 0;
    ast = {};
    try {
        ast = acorn.parse(source);
    }catch(err) {
        return null;
    }
    let o = "digraph {\ncompound = true;\nsplines=ortho\n"

    let state = new Map();
    acorn.walk.recursive(acorn.parse(source),state,Walks);

    state.forEach(n => {
        if(n.ignore){
            return;
        }
        let d =""

        for (const [key, value] of Object.entries(n.decs)) {
            d+=`${key}=${value}`;
        }
            o += n.id+" [label=\""+n.label+"\" "+d+"]\n";
    })
    for(let i = 0; i < g.length; i++){
        let n = g[i];
         if(n.type === "edge"){
             let d =""
             for (const [key, value] of Object.entries(n.decs)) {
                 d+=`${key}=${value}`;
             }

            o += n.fromID + " -> " + n.toID +" [label=\""+n.label+"\" "+d+"]";
         }else if(n.type === "rank"){
             o += "subgraph { rank = same; "+n.elements.join(" ")+" }";
         }else if(n.type === "cluster"){
             o+= "subgraph "+n.id+" { cluster = true;\n label="+n.label+";\n "+n.members.join("\n")+" }";
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
