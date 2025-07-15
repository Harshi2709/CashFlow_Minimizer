let nodes = new vis.DataSet([]);
let edges = new vis.DataSet([]);
let curr_data = { nodes: nodes, edges: edges };

let container, container2, network, network2;
let temptext;

onload = function () {
    container = document.getElementById('mynetwork');
    container2 = document.getElementById('mynetwork2');
    temptext = document.getElementById('temptext');

    const options = {
        edges: {
            arrows: {
                to: true
            },
            labelHighlightBold: true,
            font: {
                size: 20
            }
        },
        nodes: {
            font: '12px arial red',
            scaling: {
                label: true
            },
            shape: 'icon',
            icon: {
                face: 'FontAwesome',
                code: '\uf183',
                size: 50,
                color: '#3b916e',
            }
        }
    };

    network = new vis.Network(container, curr_data, options);
    network2 = new vis.Network(container2, curr_data, options);

    document.getElementById('generate-graph').onclick = function () {
        clearGraph();
    };

    document.getElementById('solve').onclick = function () {
        temptext.style.display = "none";
        container2.style.display = "inline";
        const solved = solveData();
        network2.setData(solved);
    };
};

function clearGraph() {
    nodes.clear();
    edges.clear();
    curr_data = { nodes: nodes, edges: edges };
    network.setData(curr_data);
    temptext.style.display = "inline";
    container2.style.display = "none";
}

function addPerson() {
    const personName = document.getElementById("personName").value.trim();
    if (personName !== "") {
        const newId = nodes.length + 1;
        nodes.add({ id: newId, label: personName });
        document.getElementById("personName").value = "";
    }
}

function deletePerson() {
    const id = parseInt(document.getElementById("personIdToDelete").value);
    if (!isNaN(id)) {
        nodes.remove({ id: id });
        const remainingEdges = edges.get().filter(edge => edge.from !== id && edge.to !== id);
        edges.clear();
        edges.add(remainingEdges);
        document.getElementById("personIdToDelete").value = "";
    }
}

function addTransaction() {
    const from = parseInt(document.getElementById("fromPerson").value);
    const to = parseInt(document.getElementById("toPerson").value);
    const amount = parseInt(document.getElementById("amount").value);

    if (!isNaN(from) && !isNaN(to) && !isNaN(amount) && from !== to) {
        edges.add({ from: from, to: to, label: String(amount) });
        document.getElementById("fromPerson").value = "";
        document.getElementById("toPerson").value = "";
        document.getElementById("amount").value = "";
    }

    curr_data = { nodes: nodes, edges: edges };
    network.setData(curr_data);
}

function solveData() {
    const sz = nodes.length;
    const vals = Array(sz).fill(0);
    const dataEdges = edges.get();

    for (const edge of dataEdges) {
        vals[edge.to - 1] += parseInt(edge.label);
        vals[edge.from - 1] -= parseInt(edge.label);
    }

    const new_edges = [];
    for (let i = 0; i < sz; i++) {
        if (vals[i] > 0) {
            for (let j = 0; j < sz && vals[i] > 0; j++) {
                if (vals[j] < 0) {
                    if (vals[j] + vals[i] >= 0) {
                        new_edges.push({ from: j + 1, to: i + 1, label: String(Math.abs(vals[j])) });
                        vals[i] += vals[j];
                        vals[j] = 0;
                    } else {
                        new_edges.push({ from: j + 1, to: i + 1, label: String(vals[i]) });
                        vals[j] += vals[i];
                        vals[i] = 0;
                    }
                }
            }
        }
    }

    return {
        nodes: nodes,
        edges: new_edges
    };
}
