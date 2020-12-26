require('../lib')
                                                                                                const
assert = require('assert')
                                                                                                const
str = _`Why am I like this lmfao`
                                                                                                const
first_word = str[':3']
                                                                                                const
second_word = str['4:6']
                                                                                                const
last_word = str['19:']

assert(first_word == 'Why')
assert(second_word == 'am')
assert(last_word == 'lmfao')
