describe('remainder', function() {
  var remainder = fungus.remainder;

  it('should be a function', function() {
    expect(remainder).to.be.a('function');
  });

  it('should have an arity of 2', function() {
    expect(remainder.length).to.equal(2);
  });

  it('should be curried', function() {
    expect(remainder).to.be.curried(1, 2, 'number');
  });

  it('should do what the native `%` operator does', function() {
    expect(remainder(8, 3)).to.equal(8 % 3);
    expect(remainder(10, 5)).to.equal(10 % 5);
    expect(remainder(-10, 3)).to.equal(-10 % 3);
  });
});
