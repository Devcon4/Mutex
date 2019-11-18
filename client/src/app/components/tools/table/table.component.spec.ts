import { TableComponent } from './table.component';
import { of, BehaviorSubject } from 'rxjs';
import { TableService } from './table.service';
import { ApplicationRef } from '@angular/core';
import { testClassFactory, spyOnClass } from '../spyOnClass';

describe('TableComponent', () => {
	let mockData = () => {
		let mockTableService = spyOnClass(TableService, {} as any);

		return {
			mockTableService,
		};
	};

	let mockComponent = (a: ReturnType<typeof mockData>) => {
		return testClassFactory(TableComponent, a.mockTableService);
	};

	it('should create', () => {
		let c = mockComponent(mockData());
		expect(c).toBeDefined();
	});

	it('should init', () => {
		let c = mockComponent(mockData());
		spyOn(c, 'requestData');
		spyOn(c, 'setColumns');

		c.filterControl = { valueChanges: new BehaviorSubject(0) } as any;
		c.paginator = { page: new BehaviorSubject(0) } as any;
		c.sort = { sortChange: new BehaviorSubject(0) } as any;
		c.filterRef = 'test' as any;

		c.ngOnInit();

		expect(c.requestData).toHaveBeenCalled();
		expect(c.setColumns).toHaveBeenCalled();
		expect(c.filterTemplate).toEqual('test');
	});

	it('should set column names and schema', () => {
		let c = mockComponent(mockData());
		c.schema = {
			test1: { displayExp: x => 'wow', headerName: 'test1', width: '200px' },
			test2: { displayExp: x => 'wow2', headerName: 'test2', width: '250px' },
		};

		c.setColumns();

		let testNames = ['test1', 'test2'];

		expect(testNames.every(col => c.columnNames.some(t => t === col))).toBeTruthy();
	});

	it('should request data', () => {
		let c = mockComponent(mockData());
		spyOn(c, 'setColumns');

		let dataFunc = (filter, index, size, sort) => {
			expect(filter).toEqual(null);
			expect(index).toEqual(0);
			expect(size).toEqual(25);

			return of([]);
		};

		let loadDataFunc = (data, filter, index, size, sort) => {
			expect(data).toEqual(c.dataProvider);
			expect(filter).toEqual(null);
			expect(index).toEqual(0);
			expect(size).toEqual(25);
		};

		c.dataProvider = jasmine.createSpy('data').and.callFake(dataFunc);
		c.paginator = { pageIndex: 0 } as any;
		c.requestData();

		spyOn(c.dataSource, 'loadData').and.callFake(loadDataFunc);
		c.requestData();
	});

	it('should calc template', () => {
		let c = mockComponent(mockData());
		c.defaultRef = 'default' as any;
		c.linkRef = 'link' as any;

		let r;

		r = c.calcTemplate({ headerName: 'test', displayExp: () => 'test' });
		expect(r).toEqual('default');

		r = c.calcTemplate({ headerName: 'test', displayExp: () => 'test', pathExp: () => 'path' });
		expect(r).toEqual('link');

		r = c.calcTemplate({ headerName: 'test', template: 'template' } as any);
		expect(r).toEqual('template');
	});
});
