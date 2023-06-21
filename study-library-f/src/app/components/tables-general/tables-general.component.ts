import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {DataTableDirective} from 'angular-datatables';

@Component({
  selector: 'app-tables-general',
  templateUrl: './tables-general.component.html',
  styleUrls: ['./tables-general.component.css']
})
export class TablesGeneralComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  datatableElement: any = DataTableDirective;

  constructor(private elementRef: ElementRef) { }
  dtOptions: DataTables.Settings = {}; 
  // dtOptions: any = {};

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full',
      // Declare the use of the extension in the dom parameter
      dom: 'Bfrtip',
      // pageLength: 0,
      // lengthMenu: [0, 5, 10, 20, 50, 100, 200, 500],
    }
    
    // var s = document.createElement("script");
    // s.type = "text/javascript";
    // s.src = "../assets/js/main.js";
    // this.elementRef.nativeElement.appendChild(s);
  }

}
