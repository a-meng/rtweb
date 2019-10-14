import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss']
})
export class FrameComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  onLogout() {
    // this.sessServ.logout().subscribe(res => {
    //     if (res) {
    //         this.router.navigate(['/login']);
    //     }
    // });
}
}
