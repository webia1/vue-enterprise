import { expect } from 'chai';
import { Given, When, Then } from 'cucumber';

Given('I have {int} apple', function(int) {
  this.apples = int;
});

When('I add {int} apples', function(int) {
  this.apples = this.apples + int;
});

Then('I will have {int} apples', function(int) {
  expect(this.apples).to.equal(int);
});
