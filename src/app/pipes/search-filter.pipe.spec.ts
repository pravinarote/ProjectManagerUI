import { SearchFilterPipe } from './search-filter.pipe';

describe('SearchFilterPipe', () => {
  
  it('create an instance', () => {
    const pipe = new SearchFilterPipe();
    expect(pipe).toBeTruthy();
  });

  it('pass filter string from collection should return result', () => {
    const pipe = new SearchFilterPipe();
    var model = [{Name : 'Scott',Id : 1},{Name : 'Martin',Id : 2}];

    var filterResult = pipe.transform(model,'scott');
    expect(filterResult.length).toBe(1);
  });

  it('pass filter string not from collection should return result', () => {
    const pipe = new SearchFilterPipe();
    var model = [{Name : 'Scott',Id : 1},{Name : 'Martin',Id : 2}];

    var filterResult = pipe.transform(model,'test');
    expect(filterResult.length).toBe(0);
  });


});
