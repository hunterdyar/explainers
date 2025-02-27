class GraphBuilder {
    //running unique ID
    wid = 0;
    //ast nodes to graph node lookup for finding children
    s = new Map();
    //list of graph nodes. Together with the lookup, is all nodes.
    g = []
    //used for clusters.
    childrenLookup = {}
    nodeStack = [];
    clusterStack = [];
    lastPopped;
    lastCluster;
    isProgram = false;
    constructor() {
        this.wid = 0;
    }

    getID(){
        this.wid++;
        return this.wid;
    }

    AddRootNode(node){
        //instantly clears the stack, adds new root node to entire system.
    }
    AddNode(node, name, decs = {}){
        //adds a node and an edge to the last added node.
        let me = new GNode(this.getID(),name);
        //set decorators
        Object.entries(decs).forEach((kv) => {
            me.decs[kv[0]] = kv[1];
        })
        //are we in a cluster?
        me.isProgram = true;
        if(this.clusterPeek()){
            // for (let i=0; i < this.clusterStack.length; i++){
            //     this.clusterStack[i].members.push(me.id);
            // }
            me.isProgram = !this.clusterPeek().isFunctionDec;
           this.clusterPeek().members.push(me.id);
        }
        //are we not a root node?
        if(this.peek()){
            this.g.push(new GEdge(this.getID(),this.peek().id,me.id,""))
            //add self as child lookup to parent.
            if(this.childrenLookup[me.id]){
                this.childrenLookup[this.peek().id].push(me.id);
            }else{
                this.childrenLookup[this.peek().id]= [me.id];
            }
        }
        this.nodeStack.push(me);
        this.s.set(this.hash(node),me);
        this.g.push(me);

    }
    AddEdge(from,to,label="", decs={}){
        let edge = new GEdge(this.getID(),this.s.get(this.hash(from)).id,this.s.get(this.hash(to)).id,label);
        edge.decs = decs;
        this.g.push(edge);

    }
    DoneWithNode(){
        //pops node from stack, so children get added to all nodes.
        this.lastPopped = this.nodeStack.pop();
    }
    StartCluster(name){
        //marks a point for a cluster to be added.
        let c = new GCluster(this.getID(),name);
        if(this.clusterPeek()){
            this.clusterPeek().memberClusters.push(c);
        }
        this.clusterStack.push(c);
        this.g.push(c);
    }
    EndCluster(){
        //makes a point for a cluster to be removed.
        this.lastCluster = this.clusterStack.pop();
    }
    StartFunctionDec(name){
       this.StartCluster(name);
       this.clusterPeek().isFunctionDec = true;
    }
    EndFunctionDec(){
        this.EndCluster();
    }

    AddDecorator(key,value){
        //sets dec[key]=value on top node.
    }
    AddInvisibleNode(node){
        if(this.lastPopped){
            this.s.set(this.hash(node),this.lastPopped)
        }else{
           // console.log("root invisible node?");
            this.s.set(this.hash(node),{});//uh oh
        }
    }
    LabelIncomingEdge(node, label, decs={}){
        let gn = this.s.get(this.hash(node));
        if(!gn){
            console.log("Node isn't a GraphNode or InvisibleNode",node);
        }
        let nodeID = gn.id;
        let edge = this.g.findLast(x=>{
            return x.type === "edge" && x.toID === nodeID;
        })
        if(edge){
            if(label) {
                edge.label = label;
            }
            Object.entries(decs).forEach(x => {
                edge.decs[x[0]] = x[1];
            })
        }else{
            console.log("can't label incoming edge",node,label);
        }
    }
    AddDecsToNode(node,decs){
        Object.entries(decs).forEach((kv) => {
            let n = this.s.get(this.hash(node));
            n.decs[kv[0]] = kv[1];
        })
    }
    peek(){
        return this.nodeStack.at(-1);
    }
    clusterPeek(){
        return this.clusterStack.at(-1);
    }
    ClusterID(){
        if(this.clusterPeek()){
            return this.clusterPeek().id;
        }else{
            //console.log("no cluster for cluster ID")
            return undefined;
        }
    }
    GetGraphNodeFromNode(node){
        return this.s.get(this.hash(node.left));
    }

    Build(){
        let o = "digraph {compound = true;\nnode [style=filled;fillcolor=white];\n";

        let fdecs = []
        let programIDs = [];
        let rootclusters = [];
        for(let i = 0; i < this.g.length; i++){
            let n = this.g[i];
            if(n.ignore){
                continue;
            }
            if(n.alreadyRendered){
                continue;
            }
            if(n.isFunctionDec){
                fdecs.push(n);
                continue;
            }
            if(n.isProgram === true) {
                programIDs.push(n.id);
            }
            if(n.type === "cluster"){
                programIDs.push(n.id);
                rootclusters.push(n);
                continue;
            }
            o += n.Draw();
            o+="\n"
        }


        o+= "\nsubgraph ___program___{\n";
        o+= "cluster=true;label = \"Program\";style=\"filled\"fillcolor=\"aliceblue\"\n";
            o+= programIDs.join("\n");
            o+="\n";
            for(let i = 0; i < rootclusters.length; i++){
                o+= rootclusters[i].Draw()+"\n";
            }
        o+="}\n"

        if(fdecs.length > 0) {
            //Wrapper for Function Declaration Area
            o+= "\nsubgraph ___fundecs___{ cluster=true;label = \"Function Declarations\";style=\"filled\"fillcolor=\"beige\"\n";
            //Now, the function decs at the end.
            for (let i = 0; i < fdecs.length; i++) {
                o += fdecs[i].Draw();
            }
            o+="}"
        }

        o+=" }"
        //console.log(o,state,g);
        return o;
    }

    getAllChildren(root){
        let c = {a:[]}
        this.getChildrenRecursive(root,c);
        return c.a;
    }

    getChildrenRecursive(root, current){
        if(this.childrenLookup[root]){
            this.childrenLookup[root].forEach((x)=>{
                current.a.push(x);
                this.getChildrenRecursive(x,current);
            })
        }
    }

    hash(node){
        return node.start.toString()+":"+node.end.toString();
    }
}
//linear or recursive? we're walking recursively elsewhere, so this can be linear.

class GNode{
    id
    type
    label
    ignore = false
    decs = {}
    constructor(id, name){
        this.label = name;
        this.type = "node";
        this.id = id;
    }
    Draw(){
        let d =""
        for (const [key, value] of Object.entries(this.decs)) {
            d+=`${key}=${value}`+";";
        }
        let o = this.id+" [label=\""+this.label+"\" "+d+"]";
        //console.log(o);
        return o;
    }
}
class GEdge{
    id
    fromID
    toID
    label
    type
    decs = {}
    constructor(id, f,t,label){
        this.fromID = f;
        this.toID = t;
        this.label = label;
        this.id = id;
        this.type = "edge";
    }

    Draw(){
        let d =""
        for (const [key, value] of Object.entries(this.decs)) {
            d+=`${key}=${value}`;
        }
        let o = (this.fromID + " -> " + this.toID +" [label=\""+this.label+"\" "+d+"]");
        return o
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
    memberClusters = []
    decs = {}
    isFunctionDec = false;
    constructor(id, name,...members){
        this.label = name;
        this.id = id;
        this.type = "cluster";
        this.members = members;
        this.memberClusters = [];
    }

    Draw(){
        let o = "";
        o+= "subgraph "+this.id+" { cluster = true;\n label="+this.label+";style=\"filled\";fillcolor=\"white\";\n "+this.members.join("\n");

        this.memberClusters.forEach(c=>{
            o += c.Draw();
            c.alreadyRendered = true;
            o += '\n';
        })

        o+=" }";
        return o;
    }
}
