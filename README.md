# Observable-Objects

its an implentation of knockout observables using **defineProperty** method

# Basic usage example

```javascript
var obj = require('obsObj');
var firstName = obj.prop('Delta'),
    lastName = obj.prop('Force'),
    fullName = obs.computed(function() {
        return firstName() + lastName();
    }, [firstName, lastName]);

console.log('FullName : ' + fullName());
// 'FullName : DeltaForce'

fullName.subscribe(function(value, old) {
    console.log('FullName is changed to' + value + ' (from: ' + old + ')');
});

lastName("");
// 'FullName is changed to Delta (from: DeltaForce)'
```
