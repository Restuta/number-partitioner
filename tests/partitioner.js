//var test = require('tape')
import test from 'tape'
import partition from '../partitioner'


const testPartitionsFor = (number, expectedPartitions) => {
  test(`Partitions for ${number} should be as expected`, t => {
    let partitions = partition(number);
    t.deepEqual(partitions, expectedPartitions);

    t.end();
  })
}

testPartitionsFor(1, [
    [1],
])


testPartitionsFor(2, [
    [2],
    [1,1],
])

testPartitionsFor(3, [
    [3],
    [2,1,1],
    [1,1,1],
])

testPartitionsFor(4, [
    [4],
    [3,1],
    [2,2],
    [2,1,1],
    [1,1,1,1]
])

testPartitionsFor(5, [
    [5],
    [4,1],
    [3,2],
    [3,1,1],
    [2,1,1,1],
    [1,1,1,1,1],
])

testPartitionsFor(6, [
    [5,1],
    [4,2],
    [4,1,1],
    [3,3],
    [3,2,1,1],
    [3,1,1,1],
    [2,2,2],
    [2,2,1,1],
    [2,1,1,1,1],
    [1,1,1,1,1,1],
])
