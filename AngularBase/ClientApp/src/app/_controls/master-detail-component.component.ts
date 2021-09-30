import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BaseComponent } from './base-component.component';

@Component({ })
export class MasterDetailComponent extends BaseComponent implements OnInit {
  constructor(private _route: ActivatedRoute) {
      super();
  }

  public BusinessObject: any;
  public BusinessObjectId: number;

  ngOnInit() {
    let id = +this._route.snapshot.params['id'];
    this._route.params.subscribe((params: Params) => {
      id = +params['id'];

      this.BusinessObjectId = id;

      this.Load();
    });
  }

  Load() {
    this.LoadControlsData();

    if (this.BusinessObjectId > 0) {
      this.GetData();

      this.LoadDataGridsData();
    }
    else {
      this.CreateData();
    }
  }

  LoadControlsData() {
  }

  CreateData() {

  }

  GetData() {

  }

  LoadDataGridsData() {

  }

  Save() {
    if (this.ValidateSaveData()) {
      this.CorrectSaveData();

      this.SaveData();
    }
  }

  ValidateSaveData(): boolean {
    return true;
  }

  CorrectSaveData() {

  }

  SaveData() {

  }
}
