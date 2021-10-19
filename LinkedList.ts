import display from './display';
import LinkNode from './LinkNode';

class LinkNode<T> {
  public value:T;
  public next:LinkNode<T>|null;
  constructor(value:T, next:LinkNode<T>|null) {
    this.value = value;
    this.next = next;
  }
}

/**
 * class to represent a Linked List of items of type T
 */
class LinkedList<T> {
  private head: LinkNode<T> | null;
  private tail: LinkNode<T> | null;
  private numOfNodes: number;

  /**
   * Constructs a new empty linked list
   */
  constructor() {
    this.head = null;
    this.tail = null;
    // this.numOfNodes = ____; // fill in initial value
  }

  /**
   * Gets Node (not item) at given index, used as helper function
   * @param index - the index of the Node to get
   * @returns Node at given index
   */
  public nodeAt(index: number): LinkNode<T> {

    const makeTable = (currentIndex: number, currentNode: LinkNode<T>): LinkNode<T> => {

      if (currentIndex !== index) {

       return makeTable(currentIndex + 1, currentNode.next); 

      }

      else {

        return currentNode;

      }

    }

    return makeTable(0, this.head);

  }

  /**
   * Gets item at given index, used as helper function
   * @param index - the index of the Node to get
   * @returns Node at given index
   */
  public itemAt(index: number): T {
    // this should be one line using your nodeAt helper function
    return this.nodeAt(index).value; // remove this line
  }

  /**
   * inserts item at front of list
   * @param item - item to add to front of list
   */
  public insertAtFront(item: T): void {

    let newNode = new LinkNode(item, this.head);

    if (this.head === null) {

      this.tail = newNode;

    }

      this.head = newNode

  }

  /**
   * inserts item at end of list
   * @param item - item to add to end of list
   */
  public insertAtEnd(item: T): void {

    let newNode = new LinkNode(item, null);

    if (this.tail === null) {

      this.insertAtFront(item);

    }

    else {

      this.tail.next = newNode;
      this.tail = newNode;

    }
  }

  /**
   * Prints string version of each Node on its own line
   */
  public printAllNodes(): void {
    const makeTable = (current: LinkNode<T> | null): void => {
      console.log(current.value.toString());
      if (current !== null) {
        // stopping condition?
        console.log(current.value.toString());
        makeTable(current.next); // go to index of next item replaced with?
      }
    };
    makeTable(this.head); // what to replace 0 with?
  }


  
  /**
   * Converts to string by calling .toString() on each item in the list and separating these string representations by commas
   * @returns string representation of linked list
   */
  public toString(): string {

    const makeTable = (current: LinkNode<T> | null, acc: string): string => {

      if (current !== null) {

        return makeTable(current.next, acc + ',' + current.value.toString());
      } else {

        return acc.substring(1);
      }
    };
    
    return makeTable(this.head, '');
    
  }

  /**
   * Finds index of Node where item is located where 0 is the index of the first Node, 1 is the index of the second, etc.
   * @param item - item to find
   * @returns index of first occurrence of item if present or -1 otherwise
   */
  public indexOf(item: T): number {
    // find index of first occurrence of item (assume 0 is first node, 1 is second, etc.)

    for (let i = 0; i < this.length; i++) {
      
      if (this.itemAt(i) === item) {
        
        return i;
     
      }

    }

    return -1;
  }

  /**
   * Removes Node at given index
   * @param index - the index for which to remove the Node
   * @returns the item at the Node being removed
   */
  public pop(index: number): T {
    // Handle four cases (NO use of makeTable):
    // 1. only one node (index must be 0): need to change
    //    this.head and this.tail
    // 2. index is 0 (more than one node): need to change
    //    this.head
    // 3. 0 < index < this.length-1: use private method
    //    nodeAt to get the Node that comes at the previous
    //    index and change its next node
    // 4. index = this.length - 1: use private method
    //    nodeAt to get the Node that comes at the previous
    //    index and change its next Node; ALSO change tail
    
    
    const value = this.nodeAt(index).value;

    if (length == 1) {

      this.head = null;
      this.tail = null;
      
    } 
    
    else if (index === 0) {

      this.head = this.head.next;

    }
    
    else if (index === this.length - 1) {
      let currentNode = this.nodeAt(index - 1);
      this.tail = currentNode;
      currentNode.next = null;

    } 
      
    else {
      let currentNode = this.nodeAt(index - 1);
      currentNode.next = currentNode.next.next;

    }
    
    return value;
    
  }

  public insert(index: number, item: T): void {
    // Handle three cases (NO use of makeTable)
    // 1. index is 0: Call insertAtFront
    // 2. 0 < index < this.length-1: Use private method
    //    nodeAt to get the Node at the previous index and
    //    change its next Node to be a Node with this item
    // 3. index = this.length-1: Call insertAtEnd

    if (index === 0) {

      this.insertAtFront(item);

    }

    else if (index === this.length) {

      this.insertAtEnd(item);

    }

    else {

      let prevNode = this.nodeAt(index - 1);
      let newNode = new LinkNode(item, prevNode.next);
      prevNode.next = newNode;

    }

  }

  /**
   * Remove all occurrences of item from start
   * @param item - the item to remove
   * @param start - the Node to start with
   */
  public removeAll(item: T, start: LinkNode<T>): void {}

  /**
   * Remove all duplicate items in list
   */
  public removeDuplicates(): void {}

  /**
   * number of items in list
   */
  public get length(): number {
    /*
    let nodeLength = 0;

    for ( let currentNode = this.head; currentNode != null; currentNode = currentNode.next ) {

      nodeLength++

    }
  
  return nodeLength;
    */

    const makeTable = ( currentNode:LinkNode<T>, nodeLength:number ):number => {
      
      if ( currentNode !== null ) {

        return makeTable( currentNode.next, nodeLength + 1 );

      }

      else {

        return nodeLength;

      }

    }
    
    return makeTable(this.head, 0);

 }

}

export default LinkedList;
