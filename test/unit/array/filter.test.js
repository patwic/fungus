describe('filter', function() {
  var filter = fungus.filter;

  var identity, truthy;

  beforeEach(function() {
    identity = chai.factory.create('functions.identity');
    truthy = chai.factory.create('functions.truthy');
  });

  it('should be a function', function() {
    expect(filter).to.be.a('function');
  });

  it('should have an arity of 2', function() {
    expect(filter.length).to.equal(2);
  });

  it('should be curried', function() {
    expect(filter).to.be.curried(truthy, [0, 1], 'array');
  });

  it('should return an array', function() {
    expect(filter(identity, [])).to.eql([]);
  });

  it('should return a list excluding elements for which the predicate function returns `false`', function() {
    var elems = ['', NaN, 0];

    expect(filter(truthy, elems)).to.eql([]);
  });

  it('should return a list including elements for which the predicate function returns `true`', function() {
    var elems = [1, 'a', '', { a: 'a' }, NaN];
    var trues = [1, 'a', { a: 'a' }, Object];

    expect(filter(truthy, elems)).to.eql([1, 'a', { a: 'a' }]);
    expect(filter(truthy, trues)).to.eql(trues);
  });

  xit('should work on non-array-like structures', function() {
  });

  it('should throw an error when the provided predicate function is not a function', function() {
    expect(function() { filter('fdsa', []); }).to.throw();
  });
});
