import { SearchUserPipe } from './search-user.pipe';

describe('SearchUserPipe', () => {
  it('create an instance', () => {
    const pipe = new SearchUserPipe();
    expect(pipe).toBeTruthy();
  });

  it('pass valid lastname should return result', () => {
    const pipe = new SearchUserPipe();
    var model = [{UserId:1,FirstName:'Martin',LastName:'Boylen',EmployeeId:'54333'}];

    var filterResult = pipe.transform(model,'boy');
    expect(filterResult.length).toBe(1);
  });

  it('pass valid firstname should return result', () => {
    const pipe = new SearchUserPipe();
    var model = [{UserId:1,FirstName:'Martin',LastName:'Boylen',EmployeeId:'54333'}];

    var filterResult = pipe.transform(model,'martin');
    expect(filterResult.length).toBe(1);
  });

  it('pass invalid lastname should return result', () => {
    const pipe = new SearchUserPipe();
    var model = [{UserId:1,FirstName:'Martin',LastName:'Boylen',EmployeeId:'54333'}];

    var filterResult = pipe.transform(model,'traf');
    expect(filterResult.length).toBe(0);
  });

  it('pass invalid firstname should return result', () => {
    const pipe = new SearchUserPipe();
    var model = [{UserId:1,FirstName:'Martin',LastName:'Boylen',EmployeeId:'54333'}];

    var filterResult = pipe.transform(model,'scott');
    expect(filterResult.length).toBe(0);
  });


});
