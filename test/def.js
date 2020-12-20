require('../lib')
                                                                                                const
assert = require('assert')

def('no_params', `
  return 'this function has no params'
`)

def('one_param', 'a', `
  return 'a is ' + a
`)

def('varargs', '...args', `
  return 'params: ' + len(args)
`)

                                                                                                const
anon = lambda('a', '"anonymous function with param: " + a')

assert(no_params() == 'this function has no params')
assert(one_param(123) == 'a is 123')
assert(varargs(1, [], {}, 'a') == 'params: 4')
assert(anon(1) == 'anonymous function with param: 1')
