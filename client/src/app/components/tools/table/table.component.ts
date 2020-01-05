import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { finalize, debounceTime, tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { DataSource } from '@angular/cdk/table';
import { MatSort, Sort } from '@angular/material/sort';
import { TableService } from './table.service';

export interface ColumnSchemaType<T> {
	headerName: string;
	displayExp?: (c: T) => string;
	pathExp?: (c: T) => string;
	width?: string;
	padding?: string;
	template?: TemplateRef<unknown>;
	isSortable?: boolean;
}

export type TableSchema<T> = {
	[key: string]: ColumnSchemaType<T>;
};

export interface SearchResult<T> {
	data: T[];
	count: number;
}
export type TableDataProviderType<T extends SearchResult<unknown>> = (
	searchTerm: string,
	pageIndex: number,
	pageSize: number,
	sort: Sort
) => Observable<T>;

@Component({
	selector: 'mx-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss'],
})
export class TableComponent<T extends SearchResult<U>, U> implements OnInit {
	public dataSource = new TableDataSource<T, U>();
	public filterControl = new FormControl();

	public columnSchemas = [];
	public columnNames = [];

	public pageSizes = [25, 50, 100];

	@Input()
	public dataProvider: TableDataProviderType<T>;

	@Input()
	public schema: TableSchema<U>;

	@Input()
	public filterTemplate?: TemplateRef<undefined>;

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	@ViewChild('default', { static: true }) defaultRef: TemplateRef<undefined>;
	@ViewChild('link', { static: true }) linkRef: TemplateRef<undefined>;
	@ViewChild('filter', { static: true }) filterRef: TemplateRef<undefined>;

	private sortValue: Sort;

	constructor(private tableService: TableService) { }

	ngOnInit() {
		if (!this.filterTemplate) {
			this.filterTemplate = this.filterRef;
		}

		this.filterControl.valueChanges.pipe(debounceTime(250)).subscribe(f => this.requestData());
		this.paginator.page.asObservable().subscribe(x => this.requestData());
		this.sort.sortChange.asObservable().subscribe(x => {
			this.sortValue = x;
			this.requestData();
		});
		this.setColumns();
		this.tableService.updates.subscribe(() => this.requestData());
	}

	setColumns() {
		for (let [k, v] of Object.entries(this.schema)) {
			if (v.isSortable === undefined) {
				this.schema[k].isSortable = true;
			}
			if (v.width === undefined) {
				this.schema[k].width = '100%';
			}
		}
		this.columnSchemas = Object.values(this.schema);
		this.columnNames = Object.keys(this.schema);
	}

	requestData() {
		this.dataSource.loadData(
			this.dataProvider,
			this.filterControl.value,
			this.paginator.pageIndex,
			this.paginator.pageSize || this.pageSizes[0],
			this.sortValue
		);
	}

	calcTemplate(column: ColumnSchemaType<T>) {
		if (column.template) {
			return column.template;
		} else if (column.pathExp) {
			return this.linkRef;
		}
		return this.defaultRef;
	}
}

class TableDataSource<T extends SearchResult<U>, U> implements DataSource<U> {
	private dataSubject = new BehaviorSubject<U[]>([]);
	public dataLoadingSubject = new BehaviorSubject<boolean>(false);

	public dataCount = 0;

	constructor() { }

	connect(collectionViewer: import('@angular/cdk/collections').CollectionViewer): Observable<U[] | readonly U[]> {
		return this.dataSubject.asObservable();
	}

	disconnect(collectionViewer: import('@angular/cdk/collections').CollectionViewer): void {
		this.dataSubject.complete();
		this.dataLoadingSubject.complete();
	}

	loadData(data: TableDataProviderType<T>, filter = '', pageIndex = 0, pageSize = 25, sort: Sort = null) {
		this.dataLoadingSubject.next(true);
		data(filter, pageIndex, pageSize, sort)
			.pipe(finalize(() => this.dataLoadingSubject.next(false)))
			.subscribe((d: T) => {
				this.dataSubject.next(d.data);
				this.dataLoadingSubject.next(false);
				this.dataCount = d.count;
			});
	}
}
