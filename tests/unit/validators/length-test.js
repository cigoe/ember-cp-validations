/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import {
  moduleFor, test
}
from 'ember-qunit';

var options, validator, message;
var set = Ember.set;

moduleFor('validator:length', 'Unit | Validator | length', {
  needs: ['validator:messages'],
  setup: function() {
    validator = this.subject();
  }
});

test('no options', function(assert) {
  assert.expect(1);

  message = validator.validate();
  assert.equal(message, true);
});

test('allow blank', function(assert) {
  assert.expect(2);

  options = {
    allowBlank: true,
    min: 5
  };

  set(validator, 'options', options);
  message = validator.validate();
  assert.equal(message, true);

  message = validator.validate('test');
  assert.equal(message, 'This field is too short (minimum is 5 characters)');
});

test('is', function(assert) {
  assert.expect(2);

  options = {
    is: 4
  };

  set(validator, 'options', options);
  message = validator.validate('testing');
  assert.equal(message, 'This field is the wrong length (should be 4 characters)');

  message = validator.validate('test');
  assert.equal(message, true);
});

test('min', function(assert) {
  assert.expect(2);

  options = {
    min: 5
  };

  set(validator, 'options', options);
  message = validator.validate('test');
  assert.equal(message, 'This field is too short (minimum is 5 characters)');

  message = validator.validate('testing');
  assert.equal(message, true);
});

test('max', function(assert) {
  assert.expect(2);

  options = {
    max: 5
  };

  set(validator, 'options', options);
  message = validator.validate('testing');
  assert.equal(message, 'This field is too long (maximum is 5 characters)');

  message = validator.validate('test');
  assert.equal(message, true);
});

test('message function', function(assert) {
  assert.expect(1);

  options = {
    max: 5,
    message: function(type, options, value) {
      return "is too long brosef. It like cant be more than like {count} characters";
    }
  };

  set(validator, 'options', options);
  message = validator.validate('testing');
  assert.equal(message, 'This field is too long brosef. It like cant be more than like 5 characters');

});
