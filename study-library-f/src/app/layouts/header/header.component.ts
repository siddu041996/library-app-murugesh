import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../../shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser: Object = {};
  user: string = ""
  title: string = ""
  fontSize: string = ""

  constructor(@Inject(DOCUMENT) private document: Document,
              public authService: AuthService,
              private actRoute: ActivatedRoute,
              ) {
                let currentuser = localStorage.getItem('current_user');
                this.user = currentuser ? currentuser : ""
                this.title = currentuser == "admin" ? "AdminDashboard" : "usertitle"
                let userfont = "22px"
                this.fontSize = currentuser == "admin" ? "22px" : userfont

                let id = this.actRoute.snapshot.paramMap.get('id');
                this.authService.getUserProfile(id).subscribe((res) => {
                  this.currentUser = res.msg;
              }); }

  ngOnInit(): void {
  }
  sidebarToggle()
  {
    //toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
  }
  logout() {
    this.authService.doLogout()
  }
}
