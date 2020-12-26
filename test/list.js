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
joined = '_'.join(doubled)

assert(len(list) == 5)
assert(list.every((e, i) => e === [1, 2, 3, 4, 5][i]))
assert(joined == '1_2_3_4_5')
