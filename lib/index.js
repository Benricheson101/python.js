                                                                                                const
{inspect} = require('util')
                                                                                                global.
  str_idx_regex = /^(?<c1>:)?(?<n1>-?\d+)(?<c2>:)?(?<n2>-?\d+)?/
                                                                                                /*
# ----- Functions -----
                                                                                                */
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
  return new Proxy(new String(str),                                                             {
    has(target, prop)                                                                           {
      return target.includes(prop)
                                                                                                },
    get(target, prop)                                                                           {
                                                                                                const
      matches = global.str_idx_regex.exec(prop)

      if (!matches)                                                                             {
        throw new SyntaxError()
                                                                                                } const
      g = matches.groups
      Object.keys(matches.groups).forEach(k => g[k] === undefined && delete g[k])
                                                                                                const
      len = Object.keys(g).length

      if (g.n1 && len == 1)                                                                     {
        return target[g.n1]
                                                                                                }
      if (g.n1 && g.c2 && g.n2 && len == 3)                                                     {
        return target.slice(g.n1, g.n2)
                                                                                                }
      if (g.c1 && g.n1 && len == 2)                                                             {
        return target.slice(0, g.n1)
                                                                                                }
      if (g.n1 && g.c2 && len == 2)                                                             {
        return target.slice(g.n1, target.length)
                                                                                                }
      throw new SyntaxError()                                                                  }}
  )
`)
                                                                                                /*
# ----- Array -----
                                                                                                */
Array.prototype.append = Array.prototype.push

def('map', 'fn', 'arr', `
  return arr.map(fn)
`)

def('len', 'arr', `
  return arr.length
`)
                                                                                                /*
# ----- String -----
                                                                                                */
String.prototype.join = function(arr) {
  return arr.join(this)
}

                                                                                                /*
# ----- Boolean -----
                                                                                                */
Boolean.prototype.toString = lambda('this.valueOf() ? "True" : "False"')
                                                                                                global.
True = true
                                                                                                global.
False = false
                                                                                                /*
# ----- Null -----
                                                                                                */
                                                                                                global.
None = null
