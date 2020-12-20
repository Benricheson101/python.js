                                                                                                const
{inspect} = require('util')
// ----- Functions -----
                                                                                                global.
def = (name, ...args) =>                                                                        {
                                                                                                const
  fn = args.pop()
  if (name == 'anon')                                                                           {
    return new Function(...args, fn)
                                                                                                }
  global[name] = new Function(...args, fn)
                                                                                                }
def('lambda', '...args', `
                                                                                                const
  fn = args.pop()
  return 'return' in _(fn)
    ? new Function(...args, fn)
    : new Function(...args, \`return \$\{fn\}\`)
`)

def('print', '...args',`                                                                        const
  {inspect} = global.process.mainModule.constructor._load('util')
                                                                                                const
  out = []

  for (p of args)                                                                               {
    if (p instanceof Object)                                                                    {
      out.append(inspect(p))
      continue
                                                                                                }
    const C = p?.constructor
    if (C)                                                                                      {
      out.append(new C(p))
      continue
                                                                                                }
    out.append(p)
                                                                                                }
  console.log(out.join(' '))
  return undefined
`)

def('_', 'str', `
  return new Proxy(new String(str), {
    has(target, prop) {
      return target.includes(prop)
    }
  })
`)

// ----- Array -----
Array.prototype.append = Array.prototype.push

def('map', 'fn', 'arr', `
  return arr.map(fn)
`)

def('len', 'arr', `
  return arr.length
`)

// ----- Boolean -----
Boolean.prototype.toString = lambda('this.valueOf() ? "True" : "False"')
                                                                                                global.
True = true
                                                                                                global.
False = false
