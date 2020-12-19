                                                                                                const {
  True,False,def,print,map,_,lambda
                                                                                                }
= require('./lib')

                                                                                                const
a = 1

if (a == 1)                                                                                     {
  print('a is 1')                                                                               }
else                                                                                            {
  print('a is not 1')                                                                           }
                                                                                                const
list = [1, 2, 3, 4, 5, 6]

print(map(lambda('a', 'a + 1'), list)) // [2, 3, 4, 5, 6, 7]
print(True) // True
print(False) // False
print('abc' in _`abcdefg`) // True

def('some_fn',`
  return 1 + 1
`);

def('fn_with_params', 'a', 'b', `
  return a + b
`)

print(some_fn()) // 2
print(fn_with_params(10, 20)) // 30
