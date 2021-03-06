dojo.provide("dojox.rails.tests.helpers");

// FIXME: This doesn't really work right after a connect; Even if it did, it doesn't take into account scope+func calls
// The function can be called from within multiple scopes and the count will increase with each call eventhough it
// should only increase with each scope+func pairing.
doh.mock = function(/*Object|null*/ scope, /*String*/func, /*Function?*/ stub){
  scope = scope || dojo.global;
  var hint = (scope.declaredClass || scope) + ": " + func;
  var replaceFunc = stub || dojo.hitch(scope, scope[func]);

  scope[func] = (function(f) {
    return function(){
      if (!scope[func].__mockCalled){ scope[func].__mockCalled = 0 }
      scope[func].__mockCalled++;
      scope[func].__mockArgs = arguments;
      return f.apply(scope, arguments || []);
    }
  })(replaceFunc);

  doh.resetMock(scope[func]);
  scope[func].__mockHint = hint;
}

doh.resetMock = function(mockedFunc){
  mockedFunc.__mockCalled = 0;
  mockedFunc.__mockArgs = null;
  mockedFunc.__mockHint = null;
}

// TODO: Reset mock on assert
doh.assertMock = function(/*Function*/ mockedFunc, /*Number*/ times) {
  var failPrefix = mockedFunc.__mockHint + ": ";
  var called = mockedFunc.__mockCalled;

  if (times == 0){
    if (called != times){
      throw new doh._AssertFailure(failPrefix + "was called " + called + " times but should not have been called");
    }
  }else{
    times = times || 1;
    if (called == null){throw new doh._AssertFailure(failPrefix + "was not called")}
    if (called != times){
      throw new doh._AssertFailure(failPrefix + "expected to be called " + times + " times but was called " + called + " times")
    }
  }

  return true;
}

doh.assertContains = function(/*Object*/ value, /*Array*/ array){
  var found = false;
  for (var i = 0; i < array.length; i++) {
    if (value == array[i]) {
      found = true;
      break;
    }
  }
  if (!found) {
    throw new doh._AssertFailure("[" + array + "] does not contain '" + value + "'")
  }

  return true;
}

doh.assertConnection = function(connects, obj, cbName) {
  var found = false;
  dojo.forEach(connects, function(connect){
    console.debug("CONNECTS", connects);
    if (connect[0] == obj && connect[1] == cbName){ found = true }
  });
  if (!found) throw new doh._AssertFailure("'" + cbName + "' callback was not connected");
}

function deferredMock(t, destroyable, func, times) {
		var d = new doh.Deferred();
		setTimeout(function(){
				destroyable.destroy();
				d.callback(t.assertMock(func, times));
		}, 200);
		return d;
}

function deferredQuery(t, query) {
	var d = new t.Deferred();
	setTimeout(function() {
		d.callback(dojo.query(query).length == 1);
	}, 200);
	return d;
}

function resetSandbox(){
	dojo.byId("sandbox").innerHTML = dojo.byId("generator").innerHTML;
}

function createCommonCallbacks() {
	dojo.global.testSuccess = function(){
			console.debug("testSuccess callback", arguments);
	}

	dojo.global.testFailure = function(){
			console.debug("testFailure callback", arguments);
	}

	dojo.global.testComplete = function(){
			console.debug("testComplete callback", arguments);
	}
	
	dojo.global.testCallback = function(){
			console.debug("testCallback callback", arguments);
	}
}