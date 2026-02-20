
import { test } from 'node:test';
import assert from 'node:assert';
import { validateLeadForm, type LeadFormData } from './validation.ts';
import { INDUSTRY_SECTORS } from '../constants.ts';

test('validateLeadForm returns isValid: true for valid data', () => {
  const validData: LeadFormData = {
    name: 'John Doe',
    company: 'Acme Corp',
    email: 'john.doe@example.com',
    sector: INDUSTRY_SECTORS[0],
    requirements: 'We need 50 cameras and 1PB storage for our new facility.'
  };

  const result = validateLeadForm(validData);
  assert.strictEqual(result.isValid, true);
  assert.deepStrictEqual(result.errors, {});
});

test('validateLeadForm validates name', () => {
  const data: LeadFormData = {
    name: '',
    company: 'Acme Corp',
    email: 'john@example.com',
    sector: INDUSTRY_SECTORS[0],
    requirements: 'Valid requirements here.'
  };

  // Empty name
  let result = validateLeadForm(data);
  assert.strictEqual(result.isValid, false);
  assert.strictEqual(result.errors.name, 'Contact Name is required.');

  // Short name
  data.name = 'J';
  result = validateLeadForm(data);
  assert.strictEqual(result.isValid, false);
  assert.match(result.errors.name || '', /at least 2 characters/);

  // Invalid characters
  data.name = 'John123';
  result = validateLeadForm(data);
  assert.strictEqual(result.isValid, false);
  assert.match(result.errors.name || '', /only contain letters/);

  // Valid name with allowed special chars
  data.name = "O'Connor-Smith";
  result = validateLeadForm(data);
  assert.strictEqual(result.isValid, true);
});

test('validateLeadForm validates email', () => {
  const data: LeadFormData = {
    name: 'John Doe',
    company: 'Acme Corp',
    email: '',
    sector: INDUSTRY_SECTORS[0],
    requirements: 'Valid requirements here.'
  };

  // Empty email
  let result = validateLeadForm(data);
  assert.strictEqual(result.isValid, false);
  assert.strictEqual(result.errors.email, 'Business Email is required.');

  // Invalid email
  data.email = 'invalid-email';
  result = validateLeadForm(data);
  assert.strictEqual(result.isValid, false);
  assert.strictEqual(result.errors.email, 'Please enter a valid email address.');

  data.email = 'test@';
  result = validateLeadForm(data);
  assert.strictEqual(result.isValid, false);

  // Valid email
  data.email = 'test@example.com';
  result = validateLeadForm(data);
  assert.strictEqual(result.isValid, true);
});

test('validateLeadForm validates sector', () => {
  const data: LeadFormData = {
    name: 'John Doe',
    company: 'Acme Corp',
    email: 'test@example.com',
    sector: '',
    requirements: 'Valid requirements here.'
  };

  // Empty sector
  let result = validateLeadForm(data);
  assert.strictEqual(result.isValid, false);
  assert.strictEqual(result.errors.sector, 'Industry Sector is required.');

  // Invalid sector
  data.sector = 'Invalid Sector';
  result = validateLeadForm(data);
  assert.strictEqual(result.isValid, false);
  assert.strictEqual(result.errors.sector, 'Invalid Industry Sector selected.');
});

test('validateLeadForm validates requirements', () => {
  const data: LeadFormData = {
    name: 'John Doe',
    company: 'Acme Corp',
    email: 'test@example.com',
    sector: INDUSTRY_SECTORS[0],
    requirements: ''
  };

  // Empty requirements
  let result = validateLeadForm(data);
  assert.strictEqual(result.isValid, false);
  assert.strictEqual(result.errors.requirements, 'Project Scope is required.');

  // Short requirements
  data.requirements = 'Short';
  result = validateLeadForm(data);
  assert.strictEqual(result.isValid, false);
  assert.match(result.errors.requirements || '', /at least 10 characters/);

  // Valid requirements
  data.requirements = 'This is a valid project scope description.';
  result = validateLeadForm(data);
  assert.strictEqual(result.isValid, true);
});
