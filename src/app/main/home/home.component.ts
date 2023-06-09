import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public restaurantId?: string;

  ngOnInit(): void {
    this.restaurantId = this.getId();
  }

  private getId(): string {
    const user = localStorage.getItem("loggedUser");
    if (!user || !JSON.parse(user).restaurantId ) return "NA";
    return JSON.parse(user).restaurantId;
  }
}
