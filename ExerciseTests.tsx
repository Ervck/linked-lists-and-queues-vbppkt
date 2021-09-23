import * as React from 'react';
// import * as Exercises from './exercises';
import LinkedList from './LinkedList';
// import LinkNode from './LinkNode';
import Queue from './Queue';
import copyQueue from './queuecopy';

import Test from './Test';
import TestSuite from './TestSuite';

const generateRandomNumberArray = (size:number) => {
  const arr = [];
  for(let i = 0; i < size; i++) {
    arr.push(Math.trunc(Math.random()*100-50));
  }
  return arr;
}

const runTestQueue = (checkEmpty:boolean=false):{front:string,start:string}|{q: Queue<string>, empty:boolean} => {
  const s = new Queue<string>();
  const arr = [];
  const testArr = ["bar", "foo", "react", "computer", "science", "abc", "42"];
  const times = Math.trunc(Math.random()*100);
  for(let i = 0; i < times; i++) {
    if(arr.length === 0 || Math.random() < .5) {
      const item = testArr[Math.floor(Math.random()*testArr.length)];
      s.enqueue(item);
      arr.push(item);
    } else {
      s.dequeue();
      arr.shift();
    }
  }

  if(!checkEmpty) {
    s.enqueue("top");
    arr.push("top");
    return {front: s.front.toString(), start: arr[0].toString()};
  } else {
    return {q: s, empty: arr.length === 0};
  }
}

const isCopyQueue = (q: Queue<any>, t: Queue<any>):boolean => {
  while(!q.isEmpty() && !t.isEmpty() && q.front === t.front) {
    q.dequeue();
    t.dequeue();
  }

  return q.isEmpty() && t.isEmpty() && q !== t;
}

class ExerciseTests extends React.Component<any> {
  public render() {
    const l1 = new LinkedList<number>();
    const l4 = new LinkedList<number>();
    const arr1 = generateRandomNumberArray(7);
    const chosenIndex = Math.trunc(Math.random()*5) + 1;
    arr1.slice().reverse().forEach(x => {
      l1.insertAtFront(x);
      l4.insertAtFront(x);
    });
    const l2 = new LinkedList<string>();
    const arr2 = ["abcd", "some", "foo", "hey there", "foo"];
    const chosenIndex2 = Math.trunc(Math.random()*3) + 1;
    const l3 = new LinkedList<string>();
    arr2.slice().reverse().forEach(x => {
      l2.insertAtFront(x);
      l3.insertAtFront(x);
    });
    const arr3 = arr2.slice();
    l3.insert(0, "add");
    arr3.unshift("add");
    l3.insert(arr3.length, "end");
    arr3.push("end");
    const arr4 = arr1.slice(0,chosenIndex).concat([42]).concat(arr1.slice(chosenIndex));
    l4.insert(chosenIndex, 42);

    // Queue Tests

    const t1 = runTestQueue();
    const t2 = runTestQueue();

    const t3 = runTestQueue(true);
    const t4 = runTestQueue(true);

    const frontTest = new Queue<number>();
    const frontNum = Math.random();
    frontTest.enqueue(frontNum);
    frontTest.enqueue(Math.random());

    const singleNodeLLFront = new LinkedList<number>();
    const frontNumLL = Math.random();
    singleNodeLLFront.insertAtFront(frontNumLL);

    const singleNodeLLEnd = new LinkedList<number>();
    const frontNumLLEnd = Math.random();
    singleNodeLLEnd.insertAtEnd(frontNumLLEnd);

    const singleNodePopTest = new LinkedList<number>();
    const popTestNum = Math.random();
    singleNodePopTest.insertAtEnd(Math.random());
    singleNodePopTest.pop(0);
    singleNodePopTest.insertAtFront(popTestNum);

    const cpQueue = runTestQueue(true);
    if(cpQueue.q.isEmpty()) {
      cpQueue.q.enqueue(Math.random().toString());
    }

    return (
      <div>
        <TestSuite suitename="LinkedList Test">
          <Test testname = "insertAtFront empty" expected = {frontNumLL} actual = {(singleNodeLLFront.nodeAt(0) && singleNodeLLFront.nodeAt(0).value) ? singleNodeLLFront.nodeAt(0).value : "Error: No node"}/>
          <Test testname = "insertAtEnd empty" expected = {frontNumLLEnd} actual = {(singleNodeLLEnd.nodeAt(0) && singleNodeLLEnd.nodeAt(0).value) ? singleNodeLLEnd.nodeAt(0).value : "Error: No node"}/>
          <Test testname = "indexOf test - present - end" expected = {arr1.indexOf(arr1[arr1.length-1])} actual = {l1.indexOf(arr1[arr1.length-1])}/>
          <Test testname = "indexOf test - present - start" expected = {0} actual = {l1.indexOf(arr1[0])}/>
          <Test testname = "indexOf test - present - somewhere" expected = {chosenIndex} actual = {l1.indexOf(arr1[chosenIndex])}/>
          <Test testname = "indexOf test not present" expected = {-1} actual = {l2.indexOf("yo")}/>
          <Test testname = "indexOf test present multi" expected = {2} actual = {l2.indexOf("foo")}/>
          <Test testname = "Empty LinkedList toString Test" expected = "" actual = {new LinkedList<boolean>().toString()}/>
          <Test testname = "number toString" expected = {arr1.toString()} actual = {l1.toString()}/>
          <Test testname = "nodeAt test" expected = {l1.nodeAt(0) ? l1.nodeAt(0).next : "ERROR: null node"} actual = {l1.nodeAt(1)}/>
          <Test testname = "nodeAt test" expected = {l1.nodeAt(0)} actual = {l1.nodeAt(0)}/>
          <Test testname = "nodeAt test" expected = {l1.nodeAt(2)} actual = {l1.nodeAt(1) ? l1.nodeAt(1).next : "ERROR: null node"}/>
          <Test testname = "nodeAt test last" expected = {l1.nodeAt(6)} actual = {l1.nodeAt(5) ? l1.nodeAt(5).next : "ERROR: null node"}/>
          <Test testname = "nodeAt test" expected = {arr1[chosenIndex]} actual = {l1.nodeAt(chosenIndex) ? l1.nodeAt(chosenIndex).value : "ERROR: null Node"}/>
          <Test testname = "nodeAt test" expected = {arr2[chosenIndex2]} actual = {l2.nodeAt(chosenIndex2) ? l2.nodeAt(chosenIndex2).value : "ERROR: null Node"}/>
          <Test testname = "itemAt test" expected = {arr2[chosenIndex2]} actual = {l2.itemAt(chosenIndex2)}/>
          <Test testname = "itemAt test" expected = {arr1[0]} actual = {l1.itemAt(0)}/>
          <Test testname = "itemAt test" expected = {arr1[arr1.length-1]} actual = {l1.itemAt(arr1.length-1)}/>
          <Test testname = "Empty linked list length" expected = {0} actual = {new LinkedList<boolean>().length}/>
          <Test testname = "Linked list length" expected = {7} actual = {l1.length}/>
          <Test testname = "Linked list 1 node pop test" expected = {popTestNum} actual = {singleNodePopTest.pop(0)}/>
          <Test testname = "Linked list pop now empty" expected = {""} actual = {singleNodePopTest.toString()}/>
          <Test testname = "Linked list pop test" expected = {arr2[0]} actual = {l2.pop(0)}/>
          <Test testname = "Linked list pop test" expected = {arr2[1]} actual = {l2.itemAt(0)}/>
          <Test testname = "Linked list pop test" expected = {arr2[arr2.length-1]} actual = {l2.pop(arr2.length-2)}/>
          <Test testname = "Linked list pop test" expected = {arr2.slice(1,arr2.length-1).toString()} actual = {l2.toString()}/>
          <Test testname = "Linked list pop test" expected = {arr1[chosenIndex]} actual = {l1.pop(chosenIndex)}/>
          <Test testname = "Linked list pop test" expected = {arr1.slice(0,chosenIndex).concat(arr1.slice(chosenIndex+1)).toString()} actual = {l1.toString()}/>
          <Test testname = "Linked list insert test" expected = {arr3.toString()} actual = {l3.toString()}/>
          <Test testname = "Linked list insert test" expected = {arr4.toString()} actual = {l4.toString()}/> 
        </TestSuite>
        <br />
        <TestSuite suitename="Queue Test">
          <Test testname = "front" expected = {frontNum} actual = {frontTest.front}/>
          <Test testname = "random dequeue/enqueue" expected = {t1.start} actual = {t1.front}/>
          <Test testname = "random dequeue/enqueue" expected = {t2.start} actual = {t2.front}/>
          <Test testname = "new Queue empty" expected = {true} actual = {new Queue<boolean>().isEmpty()}/>
          <Test testname = "Queue random empty" expected = {t3.empty} actual = {t3.q.isEmpty()}/>
          <Test testname = "Queue random empty" expected = {t4.empty} actual = {t4.q.isEmpty()}/>
        </TestSuite>
        <br />
        <TestSuite suitename="Queue Copy">
          <Test testname = "empty Queue copy" expected = "true" actual = {isCopyQueue(copyQueue(new Queue<boolean>()), new Queue<boolean>()).toString()} />
          <Test testname = "random queue copy from queue" expected = {true} actual = {isCopyQueue(copyQueue(cpQueue.q), cpQueue.q)} />
          <Test testname = "random queue copy from queue" expected = {cpQueue.q.front} actual = {copyQueue(cpQueue.q).front} />
        </TestSuite>
      </div>
    );
  }
}

export default ExerciseTests;