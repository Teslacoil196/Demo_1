import { Status } from './../status';
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/modal/modal.component';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { Candidate } from '../candidate';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { TagsService } from '../tags.service';
import { SearchModalComponent } from '../search-modal/search-modal.component';
import { Search } from '../search';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  c:Candidate=new Candidate();
  data:any[]=[];
  backlog:any [] = [];
  done:any [] = [];
  progress:any [] = [];
  review:any [] = [];
  change:any="";
  filterdata:any;
  choice=[{
    value : "wgsid",
    viewValue : "CandidateId"
  },{
    value : "name",
    viewValue : "CandidateName"
  },{
    value : "skill",
    viewValue : "Skills"
  },{
    value : "location",
    viewValue : "Location"
  },{
    value : "location",
    viewValue : "Location"
  },{
    value : "technology",
    viewValue : "Technology"
  },
  { value : "Tags",
    viewValue : "Tags"
  },{
    viewValue : "1st Quarter",
    value : "quater_1"
  },{
    viewValue : "2nd Quarter",
    value : "quater_2"
  },{
    viewValue : "3rd Quarter",
    value : "quater_3"
  },{
    viewValue : "4th Quarter",
    value : "quater_4"
  }];
  searchText:any="";
  search:any="";
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(private _service_tag:TagsService,private http:HttpClient,public matDialog: MatDialog,private _service:UsersService, private _router : Router){}

  ngOnInit(): void {
    this._service.getdata(this.data).subscribe(
      (response)=>{
        console.log("done")
        this.data=response;
        console.log(response)
        for(let i=0;i<this.data.length;i++)
        {
          if(this.data[i].status=="backlog")
          {
            this.backlog.push(this.data[i]);
          }
          else if(this.data[i].status=="progress")
          {
            this.progress.push(this.data[i]);
          }
          else if(this.data[i].status=="review")
          {
            this.review.push(this.data[i]);
          }
          else if(this.data[i].status=="done")
          {
            this.done.push(this.data[i]);
          }
        }
      },
      (error)=>{
        console.log("error"+error)
      });
  }

  onDrop(event: CdkDragDrop<any[]>) {

    if (event.previousContainer === event.container)
    {
      moveItemInArray(event.container.data,event.previousIndex,event.currentIndex);
    }
     else
    {
      transferArrayItem(event.previousContainer.data,event.container.data,event.previousIndex,event.currentIndex);
      status=event.container.element.nativeElement.id;
      console.log(status);
      console.log(event);

      if(status=="backlog")
      {
      var ind=this.backlog[event.currentIndex].wgsid;
      console.log(ind);
      var cont=new Status("backlog",ind);
      this._service.upStatus(cont).subscribe(
        response=>{
          console.log("done")
        },
        error=>{
          console.log("error"+error)
        }
        );
      }
      else if(status=="progress")
      {
        var ind=this.progress[event.currentIndex].wgsid;
        console.log(ind);
        var cont=new Status("progress",ind);
        this._service.upStatus(cont).subscribe(
          response=>{
            console.log("done")
          },
          error=>{
            console.log("error"+error)
          }
          );
        }
      else if(status=="review")
      {
        var ind=this.review[event.currentIndex].wgsid;
        console.log(ind);
        var cont=new Status("review",ind);
        this._service.upStatus(cont).subscribe(
          response=>{
            console.log("done")
          },
          error=>{
            console.log("error"+error)
          }
          );
        }
      else if(status=="done")
      {
        var ind=this.done[event.currentIndex].wgsid;
        console.log(ind);
        var cont=new Status("done",ind);
        this._service.upStatus(cont).subscribe(
          response=>{
            console.log("done")
          },
          error=>{
            console.log("error"+error)
          }
          );
        }
    }
  }

  open(value:any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = "modal-component";
    const modalDialog = this.matDialog.open(ModalComponent,  {data: {dataKey: value}});
  }

  downloadCSV() {
    var options = {
      title: 'Candidate Details',
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: false,
      noDownload: false,
      showTitle: false,
      useBom: false,
      headers: ["unique_id","Name","Age","Total_experiance","Relevant_experiance","LWD","Location","Technology","Skill","Marital_status","status"]
    };
    const data = new ngxCsv(this.data, "Details", options);
    console.log(data);
  }

  select(value:any) {
    this.filterdata=value.value;
  }

  searchdata(event:any,val:any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = "search-modal-component";
    var searchObj = new Search(event, val);
    this._service.storeObj(searchObj);
    const searchmodalDialog = this.matDialog.open(SearchModalComponent);
  }

  add(event: MatChipInputEvent, iid:string): void {
    const value = (event.value || '').trim();
    console.log("Value:"+value);
    console.log("id:"+iid);
    if (value) {
      this._service_tag.new_tag(value,iid).subscribe(
        data=>{
          console.log("tag added "+data);
          window.location.reload();
        },
        error=>{
          console.log("error "+error)
        }
      );
    }
    event.chipInput!.clear();
  }

  remove(fruit: string): void {
   console.log("id tag :"+fruit);

   this._service_tag.delete_tag(fruit).subscribe(
    data=>{
      console.log("deleaed tag "+data)
      window.location.reload();
    },
    error=>{
      console.log("Eror deleting tag "+error)
    }
   );
 }

 report() {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.id = "search-modal-component";
  const modalDialog = this.matDialog.open(SearchModalComponent);
}

}


