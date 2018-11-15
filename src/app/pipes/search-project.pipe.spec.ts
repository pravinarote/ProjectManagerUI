import { SearchProjectPipe } from './search-project.pipe';

describe('SearchProjectPipe', () => {
  it('create an instance', () => {
    const pipe = new SearchProjectPipe();
    expect(pipe).toBeTruthy();
  });

  it('pass valid project should return result', () => {
    const pipe = new SearchProjectPipe();
    var model = [{ProjectId:1,ProjectName : 'Trafigura',StartDate : null,EndDate:null,Priority:5,ManagerName:'Scott',ManagerId:1,NoOfTasks:1,NoOfCompletedTasks:1,IsDatesEnabled:false,IsSuspended:false}];

    var filterResult = pipe.transform(model,'traf');
    expect(filterResult.length).toBe(1);
  });

  it('pass invalid project should return result', () => {
    const pipe = new SearchProjectPipe();
    var model = [{ProjectId:1,ProjectName : 'Trafigura',StartDate : null,EndDate:null,Priority:5,ManagerName:'Scott',ManagerId:1,NoOfTasks:1,NoOfCompletedTasks:1,IsDatesEnabled:false,IsSuspended:false}];

    var filterResult = pipe.transform(model,'scott');
    expect(filterResult.length).toBe(0);
  });
});
