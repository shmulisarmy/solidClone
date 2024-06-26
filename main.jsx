function create(cln, variable) {
    return <div className={cln}>{variable}</div>;
}


function createSet(cln) {
    return (variable) => {
        document.querySelectorAll(`.${cln}`).forEach(element => {
            element.textContent = variable;
        });
    };
}





function createForList(cln, list) {
    const newList = [];
    let variable;
    for (let i = 0; i < list.length; i++) {
        variable = list[i];
        // variable = variable.replace(/</g, '&lt;').replace(/>/g, '&gt;');  //make html safe
         newList.push(<span class={`${cln}${i}`}>{variable}</span>);
    }
    return newList;
}

function createSetforList(cln) {
    return (index, variable) => {
        document.querySelectorAll(`.${cln}${index}`).forEach(element => {
            element.textContent = variable;
        });
    };
}



function updateEntireList(cln, list) {
    list.forEach((item, index) => {
        document.querySelectorAll(`.${cln}${index}`).forEach(element => {
            element.textContent = item;
        });

    })
}

function useStateList(initialList) {
    //wrapper function for returning 2 dinimicly created functions and dealing with the lists class name
    const cln = `list${listsUsed}`;
    listsUsed++;
    return [createForList(cln, initialList), createSetforList(cln), () => (updateEntireList(cln, initialList))];
}





function createForObj(cln, obj) {
    const newObj = [];
    let variable;
    Object.keys(obj).forEach(key => {
        variable = obj[key];
        // variable = variable.replace(/</g, '&lt;').replace(/>/g, '&gt;');  //make html safe
        newObj[key] = <span class={`${cln}${key}`}>{variable}</span>;
    });
    return newObj;
}

function createSetforObj(cln) {
    return (key, variable) => {
        document.querySelectorAll(`.${cln}${key}`).forEach(element => {
            element.textContent = variable;
        });
    };
}
function updateEntireObject(cln, obj) {
    Object.keys(obj).forEach((key) => {
        const value = obj[key];
        document.querySelectorAll(`.${cln}${key}`).forEach(element => {
            element.textContent = value;
        });

    })
}

function useStateObj(initialObj) {
    const cln = `obj${objsUsed}`;
    objsUsed++;
    return [createForObj(cln, initialObj), createSetforObj(cln), () => updateEntireObject(cln, initialObj)];
}



function App() {
    

    console.log(placeNames); //display a list of html elements for each item in the list

    return (
        <div>
            <div>
                {placeNames[0]}
            </div>
            {placeNames[1]}
            <button onClick={() => setNames(0, "shmugly")}>click me</button>
            <div class="div">
                testing createForObject - {placePeople["sarah"]}</div>
                <button onClick={() => setPeople("sarah", "wally")}>click</button>
                <button onClick={updateNames}>updateNames</button>
                <button onClick={updatePeople}>updatePeople</button>
                

           
            </div>
    );
}

let listsUsed = 0;
let objsUsed = 0;

const names = ['<div onclick="alert("you have been hacked"))></div>', 'sarah', 'joe']
const [placeNames, setNames, updateNames] = useStateList(names)
const people = {
    'sarah': 'shittins',
    'joe': 'walisons'
}

// const placePeople = createForObject('person', people);
// const setPeople = createSetforObj('person');

const [placePeople, setPeople, updatePeople] = useStateObj(people);



ReactDOM.render(<App />, document.getElementById('root'));
names[0] = "changed";
people["sarah"] = "changed";
