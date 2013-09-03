var test  = require('tape')
,   index = require('./../lib/index')

test('timing test', function (t) {
    t.plan(1)
    t.ok(index)
    t.end()
})
