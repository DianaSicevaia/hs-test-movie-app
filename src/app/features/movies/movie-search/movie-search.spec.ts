import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieSearchComponent } from './movie-search';

describe('MovieSearchComponent', () => {
  let fixture: ComponentFixture<MovieSearchComponent>;
  let input: HTMLInputElement;

  async function type(value: string): Promise<void> {
    input.value = value;
    input.dispatchEvent(new Event('input'));
    await fixture.whenStable();
  }

  async function setInitialQuery(value: string): Promise<void> {
    fixture.componentRef.setInput('initialQuery', value);
    await fixture.whenStable();
  }

  beforeEach(async () => {
    fixture = TestBed.createComponent(MovieSearchComponent);
    await fixture.whenStable();
    input = fixture.nativeElement.querySelector('input');
  });

  it('shows the initial query from the parent', async () => {
    await setInitialQuery('batman');

    expect(input.value).toBe('batman');
  });

  it('keeps a trailing space when the parent sends back the same trimmed query', async () => {
    await type('the ');
    // Parent receives "the" (trimmed) and passes it back as initialQuery
    await setInitialQuery('the');

    expect(input.value).toBe('the ');
  });

  it('resets the field when the parent sends a different query', async () => {
    await type('the ');
    await setInitialQuery('dune');

    expect(input.value).toBe('dune');
  });
});
