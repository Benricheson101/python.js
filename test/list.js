require('../lib')
                                                                                                const
assert = require('assert')

                                                                                                const
list = []

list.append(1)
list.append(2)
list.append(3)
list.append(4)
list.append(5)

                                                                                                const
doubled = map(lambda('a', 'a * 2'), list)

assert(len(list) == 5)
assert(doubled == [2, 4, 6, 8, 10])
