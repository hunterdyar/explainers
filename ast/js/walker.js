

//JS to Builder. (Builder to graphbviz)
const Walks = {
    ExpressionStatement(n,s,c){
        c(n.expression,s);
        //we are our child.
        s.AddInvisibleNode(n);
    },
    Literal(n,s,c){
        s.AddNode(n,n.value);
        s.DoneWithNode();
    },
    Identifier(n,s,c){
        s.AddNode(n,n.name,{"shape":"note"})
        s.DoneWithNode();
    },
    AssignmentExpression(n,s,c){
        s.AddNode(n,"Assign");
        c(n.left, s);
        s.LabelIncomingEdge(n.left,"Left");
        c(n.right,s);
        s.LabelIncomingEdge(n.right,"Right");
        s.DoneWithNode();
    },
    BinaryExpression(n,s,c) {
        s.AddNode(n,n.operator);
        c(n.left, s);
        s.LabelIncomingEdge(n.left,"Left");
        c(n.right,s);
        s.LabelIncomingEdge(n.right,"Right");
        s.DoneWithNode();
    },
    IfStatement(n,s,c){
       s.StartCluster("if")
        c(n.test, s);
        s.AddDecsToLastNode({"shape":"diamond"});
        c(n.consequent,s);

        s.AddEdge(n.test,n.consequent,"then",{"ltail":s.ClusterID()});//
        if(n.alternate){
            c(n.alternate, s);
            s.AddEdge(n.test,n.alternate,"else",{"ltail":s.ClusterID()});//
        }
        s.EndCluster();
    },
    BlockStatement(n,s,c){
        s.StartCluster("Block");
        s.AddNode(n,"Block");
        var childCount = 0;
        n.body.forEach((x)=>{
            childCount++;//lol starting at 1
            c(x,s);
            s.LabelIncomingEdge(x,childCount.toString());
        })
        s.DoneWithNode();
        s.EndCluster();
    },
    ArrayExpression(n,s,c){
        console.log("ArrayExpression not supported yet sorry");
    },
    CallExpression(n,s,c){
        s.AddNode(n.callee,n.callee.name,{"shape":"pentagon"});
        s.AddInvisibleNode(n);

        if(arguments.length > 0) {
            let argCount = 0;//just used for labels
            n.arguments.forEach((x) => {
                c(x, s);
                s.LabelIncomingEdge(x,"argument "+argCount.toString());
                argCount++;
            })
        }
        s.DoneWithNode();
    },
    UpdateExpression(n,s,c){
        //a++ or a--;
        s.AddNode(n,n.operator);
        c(n.argument,s);
        s.DoneWithNode();
    },
    ConditionalExpression(n,s,c){
        this.IfStatement(n,s,c);
    }
}

function Convert(source){
    state = new GraphBuilder();

    try {
        ast = acorn.parse(source);
    }catch(err) {
        return null;
    }
    let o = "digraph {\ncompound = true;\nsplines=ortho\n"
    acorn.walk.recursive(acorn.parse(source),state,Walks);

    return state.Build();

}
