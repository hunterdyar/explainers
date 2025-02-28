

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
    LogicalExpression(n,s,c) {
        s.AddNode(n,n.operator);
        c(n.left, s);
        s.LabelIncomingEdge(n.left,"Left");
        c(n.right,s);
        s.LabelIncomingEdge(n.right,"Right");
        s.DoneWithNode();
    },
    IfStatement(n,s,c){
        s.AddNode(n,"If");
        c(n.test, s);
        s.AddDecsToNode(n.test,{"shape":"diamond"});
        s.DoneWithNode();

        c(n.consequent,s);

        s.AddEdge(n.test,n.consequent,"then",{"ltail":s.ClusterID()});//
        if(n.alternate){
            c(n.alternate, s);
            s.AddEdge(n.test,n.alternate,"else",{"ltail":s.ClusterID()});//
        }
    },
    BlockStatement(n,s,c){
        s.AddNode(n,"Block");
        var childCount = 0;
        n.body.forEach((x)=>{
            childCount++;//lol starting at 1
            c(x,s);
            s.LabelIncomingEdge(x,childCount.toString());
        })
        s.DoneWithNode();
    },
    ArrayExpression(n,s,c){
        console.log("ArrayExpression not supported yet sorry");
    },
    CallExpression(n,s,c){
        if(n.callee.type ==="MemberExpression"){
            s.AddNode(n,"Function Call ("+n.callee.property.name+")", {"shape": "pentagon", "style": "filled", "fillcolor": "beige"});
            c(n.callee, s);
            s.LabelIncomingEdge(n.callee,"callee");


            if (arguments.length > 0) {
                let argCount = 0;//just used for labels
                n.arguments.forEach((x) => {
                    c(x, s);
                    s.LabelIncomingEdge(x, "argument " + argCount.toString());
                    argCount++;
                })
            }
            s.DoneWithNode();
        }else {//Call on a Literal
            s.AddNode(n.callee, n.callee.name, {"shape": "pentagon", "style": "filled", "fillcolor": "beige"});
            s.AddInvisibleNode(n);

            if (arguments.length > 0) {
                let argCount = 0;//just used for labels
                n.arguments.forEach((x) => {
                    c(x, s);
                    s.LabelIncomingEdge(x, "argument " + argCount.toString());
                    argCount++;
                })
            }
            s.DoneWithNode();
        }
    },
    ObjectExpression(n,s,c){
        s.AddNode(n, "Object Expression", {"shape":"house"});

        n.properties.forEach(p=> {
            c(p,s);
        })

        s.DoneWithNode();
    },
    Property(n,s,c){
        s.AddNode(n,"Property")
        c(n.key,s);
        s.LabelIncomingEdge(n.key,"Key");
        c(n.value,s);
        s.LabelIncomingEdge(n.value,"Value");
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
    },
    FunctionDeclaration(n,s,c){
        s.StartFunctionDec(n.id.name);
        // c(n.id,s);
        // s.AddInvisibleNode(n);
        // s.DoneWithNode();
        //block statement...

        c(n.body,s);
        s.DoneWithNode();
         s.EndFunctionDec();
    },
    MemberExpression(n,s,c){
        s.AddNode(n,"Dot Access");
        c(n.property,s);
        s.LabelIncomingEdge(n.property,"Property");
        c(n.object,s);
        s.LabelIncomingEdge(n.object,"Of");
        s.DoneWithNode()
    },
    VariableDeclaration(n,s,c){
        if(n.declarations.length === 1){
           c(n.declarations[0],s);
           s.AddInvisibleNode(n);
        }else if(n.declarations.length > 1){
            s.AddNode(n,"Variable Declaration ("+n.kind+")");
            n.declarations.forEach((x)=>{
                c(x,s);
            })
            s.DoneWithNode();
        }
        // s.AddInvisibleNode(n);
    },
    VariableDeclarator(n,s,c){
        s.AddNode(n,"Declare "+n.id.name);
        if(n.init) {
            c(n.init, s);
            s.LabelIncomingEdge(n.init,"initial value");
        }
        s.DoneWithNode();
    },
    ReturnStatement(n,s,c){
      s.AddNode(n,"Return");
      if(n.argument){
          c(n.argument,s);
      }
      s.DoneWithNode();
    },
    WhileStatement(n,s,c){
        s.AddNode(n,"While")
        c(n.test, s);
        s.AddDecsToNode(n.test,{"shape":"diamond"});
        s.LabelIncomingEdge(n.test,"test")
        c(n.body,s);
        s.LabelIncomingEdge(n.body,"do")
        s.AddEdge(n.body,n,"repeat");
        s.DoneWithNode();
    },
    ForStatement(n,s,c){
        //todo: this one is tricky
    },
    ArrowFunctionExpression(n,s,c){
        //todo: low priority
    },
    ThrowStatement(n,s,c){
        s.AddNode(n,"Throw");
        c(n.argument,s);
        s.DoneWithNode();
    },
    NewExpression(n,s,c){
        s.AddNode(n,"new");
        s.AddNode(n.callee,n.callee.name,{"shape":"house"});

        if(arguments.length > 0) {
            let argCount = 0;//just used for labels
            n.arguments.forEach((x) => {
                c(x, s);
                s.LabelIncomingEdge(x,"argument "+argCount.toString());
                argCount++;
            })
        }
        s.DoneWithNode();
        s.DoneWithNode();
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
