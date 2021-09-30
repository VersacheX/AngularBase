import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BaseComponent } from './base-component.component';

@Component({ })
export class DetailComponent extends BaseComponent implements OnInit {
  constructor(public Route: ActivatedRoute) {
      super();
  }

  public BusinessObject: any;
  public BusinessObjectId: number;

  ngOnInit() {
    let id = +this.Route.snapshot.params['id'];
    this.Route.params.subscribe((params: Params) => {
      id = +params['id'];

      this.BusinessObjectId = id;

      this.Load();
    });
  }

  Load() {
    this.LoadControlsData();

    if (this.BusinessObjectId > 0) {
      this.GetData();
    }
    else {
      this.CreateData();
    }
  }

  public LoadControlsData() {
  }

  public CreateData() {

  }

  public GetData() {

  }

  public LoadDataGridsData() {

  }

  Save() {
    if (this.ValidateSaveData()) {
      this.CorrectSaveData();

      this.SaveData();
    }
  }

  public ValidateSaveData(): boolean {
    return true;
  }

  public CorrectSaveData() {

  }

  public SaveData() {

  }
}
