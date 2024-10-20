import * as bloom from "./bloom.min.js";


const db = new bloom.DiagramBuilder(bloom.canvas(400, 400), "abcd", 1);
const { type, predicate, forall, forallWhere, ensure, circle, line } = db;

// Diagramming goes here!
const FOV = type();
const DOF = type();

const Related = predicate();

const fov = FOV();
const dof = DOF();
Related(fov, dof);

const leftPoint = 30;
const pointMargin = 10;

//then style

forall({ p: FOV }, ({ p }) => {
    p.topLine = line({
        start: [leftPoint,250],
        end: [leftPoint+100, 250-10],
        drag: false,
    });
    p.botLine = line({
        start: [leftPoint,250],
        end: [leftPoint+100, 250+10],
        drag: false,
    });
});

forallWhere(
    { fov:FOV, dof: DOF },
    ({ fov, dof }) => Related.test(fov, dof),
    ({ fov, dof }) => {
        // const pq = bloom.ops.vsub(q.icon.center, p.icon.center); // vector from p to q
        // const pqNorm = bloom.ops.vnormalize(pq); // direction from p to q
        // const pStart = bloom.ops.vmul(pointRad + pointMargin, pqNorm); // vector from p to line start
        // const start = bloom.ops.vadd(p.icon.center, pStart); // line start
        // const end = bloom.ops.vsub(q.icon.center, pStart); // line end

        // a.icon = line({
        //     start: start,
        //     end: end,
        //     endArrowhead: "straight",
        // });

        // ensure(
        //     bloom.constraints.greaterThan(
        //         bloom.ops.vdist(p.icon.center, q.icon.center),
        //         2 * (pointRad + pointMargin) + 20,
        //     ),
        // );
    },
);

const diagram = await db.build();

const interactiveElement = diagram.getInteractiveElement();
document.getElementById("diagram-container").appendChild(interactiveElement);


//
