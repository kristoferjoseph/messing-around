var test  = require('tape')
,   foo   = require('./../lib/foo')

test('timing test', function (t) {
    t.plan(1)
    t.ok(foo)
    t.end()
})
