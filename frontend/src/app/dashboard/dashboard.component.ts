import { Component, OnInit } from "@angular/core";
import { first } from "rxjs/operators";

import { User } from "src/app/_models";
import { UserService, AuthenticationService } from "src/app/_services";

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({ templateUrl: "dashboard.component.html" })
export class DashboardComponent implements OnInit {
  currentUser: User;
  users = [];

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.loadAllUsers();
  }

  //   deleteUser(id: number) {
  //     this.userService
  //       .delete(id)
  //       .pipe(first())
  //       .subscribe(() => this.loadAllUsers());
  //   }

  private loadAllUsers() {
    this.userService
      .getAll()
      .pipe(first())
      .subscribe(users => (this.users = users));
  }
  tiles: Tile[] = [
    { text: "Point Status", cols: 3, rows: 1, color: "lightblue" },
    { text: "View Catalog", cols: 1, rows: 2, color: "lightgreen" },
    { text: "View Purchase Status", cols: 1, rows: 1, color: "lightpink" },
    { text: "Cancel/Update Purchase", cols: 2, rows: 1, color: "#DDBDF1" }
  ];
}
